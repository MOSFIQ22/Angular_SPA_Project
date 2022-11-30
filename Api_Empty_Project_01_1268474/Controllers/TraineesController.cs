using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api_Empty_Project_01_1268474.ViewModels;
using Api_Empty_Project_01_1268474.ViewModels.Input;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_Project_1268474.Models;
using WebApi_Project_1268474.Repositories.Interfaces;

namespace Api_Empty_Project_01_1268474.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TraineesController : ControllerBase
    {

        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepository<Trainee> repo;
        public TraineesController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Trainee>();
            this.env = env;
        }

        // GET: api/Trainee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trainee>>> GetTrainees()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TraineeViewModels>>> GetTraineeViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(o => o.ExamResults).Include(o => o.Course));
            return data.ToList().Select(o => new TraineeViewModels
            {
                TraineeID = o.TraineeID,
                CourseID = o.CourseID,
                Picture = o.Picture,
                TraineeName = o.TraineeName,
                TraineeAddress = o.TraineeAddress,
                Email = o.Email,
                BirthDate = o.BirthDate,
                IsRunning = o.IsRunning,
                CourseName = o.Course.CourseName,
                CanDelete = !o.ExamResults.Any(),

            })
            .ToList();
        }
        // GET: api/trainee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trainee>> GetTrainee(int id)
        {
            var trainee = await this.repo.GetAsync(x => x.TraineeID == id);

            if (trainee == null)
            {
                return NotFound();
            }

            return trainee;
        }

        // PUT: api/Trainees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainee(int id, Trainee trainee)
        {
            if (id != trainee.TraineeID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(trainee);

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
        [HttpPut("{id}/VM")]
        public async Task<IActionResult> PutTraineeViewModels(int id, TraineeInputModels trainee)
        {
            if (id != trainee.TraineeID)
            {
                return BadRequest();
            }

            var existing = await this.repo.GetAsync(p => p.TraineeID == id);
            if (existing != null)
            {
                existing.TraineeName = trainee.TraineeName;
                existing.TraineeAddress = trainee.TraineeAddress;
                existing.BirthDate = trainee.BirthDate;
                existing.Email = trainee.Email;
                existing.IsRunning = trainee.IsRunning;
                await this.repo.UpdateAsync(existing);
            }

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

        // POST: api/Trainees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Trainee>> PostTrainee(Trainee trainee)
        {
            await this.repo.AddAsync(trainee);
            await this.unitOfWork.CompleteAsync();

            return trainee;
        }
        /// <summary>
        // to insert trainee without image
        ///
        [HttpPost("VM")]
        public async Task<ActionResult<Trainee>> PostTraineeInput(TraineeInputModels trainee)
        {
            var newTrainee = new Trainee
            {
                CourseID = trainee.CourseID,
                TraineeName = trainee.TraineeName,
                TraineeAddress = trainee.TraineeAddress,
                Email = trainee.Email,
                BirthDate = trainee.BirthDate,
                IsRunning = trainee.IsRunning,
                Picture = "no-product-image-400x400.png"
            };
            await this.repo.AddAsync(newTrainee);
            await this.unitOfWork.CompleteAsync();

            return newTrainee;
        }
        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var trainee = await this.repo.GetAsync(p => p.TraineeID == id);
            var ext = Path.GetExtension(picture.FileName);
            string fileName = Guid.NewGuid() + ext;
            string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
            FileStream fs = new FileStream(savePath, FileMode.Create);
            picture.CopyTo(fs);
            fs.Close();
            trainee.Picture = fileName;
            await this.repo.UpdateAsync(trainee);
            await this.unitOfWork.CompleteAsync();
            return new ImagePathResponse { PictureName = fileName };
        }
        // DELETE: api/Trainees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainee(int id)
        {
            var trainee = await this.repo.GetAsync(o => o.TraineeID == id);
            if (trainee == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(trainee);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }


    }
}
