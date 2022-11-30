using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using WebApi_Project_1268474.Models;

namespace Api_Empty_Project_01_1268474.ViewModels.Input
{
    public class TraineeInputModels
    {
        public int TraineeID { get; set; }
        [Required, StringLength(50), Display(Name = "Trainee Name")]
        public string TraineeName { get; set; } = default!;
        [Required, StringLength(70), Display(Name = "Trainee Address")]
        public string TraineeAddress { get; set; } = default!;
        [Required, StringLength(50), DataType(DataType.EmailAddress)]
        public string Email { get; set; } = default!;
        public bool IsRunning { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [ForeignKey("Course")]
        public int CourseID { get; set; }
        public virtual ICollection<ExamResult> ExamResults { get; set; } = new List<ExamResult>();
    }
}
