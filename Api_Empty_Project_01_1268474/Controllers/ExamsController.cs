using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api_Empty_Project_01_1268474.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_Project_1268474.Models;
using WebApi_Project_1268474.Repositories.Interfaces;

namespace Api_Empty_Project_01_1268474.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepository<Exam> repo;
        public ExamsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Exam>();
        }

        // GET: api/exams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<ExamViewModels>>> GetExamViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.ExamResults).ThenInclude(oi => oi.Trainee));
            return data.Select(c => new ExamViewModels
            {
                ExamID = c.ExamID,
                ExamName = c.ExamName,
                ExamFee = c.ExamFee,
                CanDelete = c.GetHashCode() == 0,

            }).ToList();
        }
        /// <summary>
        /// to get all course with trainees entries
        /////////////////////////////////////////////
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await this.repo.GetAsync(o => o.ExamID == id);

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }
        [HttpGet("{id}/OI")]
        public async Task<ActionResult<Exam>> GetExamsWithExamResults(int id)
        {
            var exam = await this.repo.GetAsync(o => o.ExamID == id, x => x.Include(o => o.ExamResults).ThenInclude(oi => oi.Trainee));

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }
        // PUT: api/exam/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExam(int id, Exam exam)
        {
            if (id != exam.ExamID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(exam);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }

        // POST: api/Exam
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exam>> PostExam(Exam exam)
        {
            await this.repo.AddAsync(exam);
            await this.unitOfWork.CompleteAsync();

            return exam;
        }

        // DELETE: api/Exams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await this.repo.GetAsync(o => o.ExamID == id);
            if (exam == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(exam);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }


    }
}

