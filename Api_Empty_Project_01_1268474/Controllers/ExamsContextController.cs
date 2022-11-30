using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_Project_1268474.Models;

namespace Api_Empty_Project_01_1268474.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsContextController : ControllerBase
    {
        private readonly CourseDbContext _context;

        public ExamsContextController(CourseDbContext context)
        {
            _context = context;
        }

        // GET: api/ExamsContext
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
            return await _context.Exams.ToListAsync();
        }

        // GET: api/ExamContext/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }

        // PUT: api/ExamsContext/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExam(int id, Exam exam)
        {
            if (id != exam.ExamID)
            {
                return BadRequest();
            }

            _context.Entry(exam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPut("VM/{id}")]
        public async Task<IActionResult> PutExamWithExamResult (int id, Exam exam)
        {
            if (id != exam.ExamID)
            {
                return BadRequest();
            }
            var existing = await _context.Exams.Include(x => x.ExamResults).FirstAsync(o => o.ExamID == id);
            _context.ExamResults.RemoveRange(existing.ExamResults);
            foreach (var item in exam.ExamResults)
            {
                _context.ExamResults.Add(new ExamResult { ExamID = exam.ExamID, TraineeID = item.TraineeID, Result = item.Result });
            }
            _context.Entry(existing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex.InnerException;

            }

            return NoContent();
        }
        // POST: api/ExamsContext
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exam>> PostExam(Exam exam)
        {
            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = exam.ExamID }, exam);
        }

        // DELETE: api/ExamsContext/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamExists(int id)
        {
            return _context.Exams.Any(e => e.ExamID == id);
        }
    }
}

