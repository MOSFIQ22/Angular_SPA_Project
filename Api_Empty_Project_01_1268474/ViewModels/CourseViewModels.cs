using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Api_Empty_Project_01_1268474.ViewModels
{
    public class CourseViewModels
    {
        public int CourseID { get; set; }
        [Required, StringLength(35), Display(Name = "Batch Name")]
        public string BatchName { get; set; } = default!;
        [Required, StringLength(45), Display(Name = "Course Name")]
        public string CourseName { get; set; } = default!;
        [Required, StringLength(90), Display(Name = "Course Desc")]
        public string CourseDesc { get; set; } = default!;
        [Required, StringLength(100), Display(Name = "Course Duration")]
        public string CourseDuration { get; set; } = default!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool Available { get; set; }
        public bool CanDelete { get; set; }
    }
}
