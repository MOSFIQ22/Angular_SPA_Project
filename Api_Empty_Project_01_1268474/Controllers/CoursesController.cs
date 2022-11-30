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
    public class CoursesController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepository<Course> repo;
        public CoursesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Course>();
        }

        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<CourseViewModels>>> GetCourseViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.Trainees));
            return data.Select(c => new CourseViewModels
            {
                CourseID = c.CourseID,
                BatchName = c.BatchName,
                CourseName = c.CourseName,
                CourseDesc = c.CourseDesc,
                CourseDuration = c.CourseDuration,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                Available = c.Available,
                CanDelete = c.Trainees.Count == 0
            }).ToList();
        }
        /// <summary>
        /// to get all course with trainees entries
        /////////////////////////////////////////////
        [HttpGet("WithTrainees")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourseWithTrainees()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.Trainees));
            return data.ToList();
        }
        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await this.repo.GetAsync(c => c.CourseID == id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }
        /// <summary>
        /// to get single course with single trainees entris
        /////////////////////////////////////////////
        [HttpGet("{id}/WithTrainees")]
        public async Task<ActionResult<Course>> GetCourseWithTrainees(int id)
        {
            var course = await this.repo.GetAsync(c => c.CourseID == id, x => x.Include(c => c.Trainees));

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }
        // PUT: api//Course/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.CourseID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(course);

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

        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            await this.repo.AddAsync(course);
            await unitOfWork.CompleteAsync();

            return course;
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await repo.GetAsync(c => c.CourseID == id);
            if (course == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(course);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
