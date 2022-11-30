using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using WebApi_Project_1268474.Models;

namespace Api_Empty_Project_01_1268474.ViewModels
{
    public class ExamResultViewModel
    {
        public int ExamID { get; set; }
        [Required, StringLength(50), Display(Name = "Exam Name")]
        public string ExamName { get; set; } = default!;

        [Required, Column(TypeName = "money")]
        public decimal ExamFee { get; set; }
        public string TraineeName { get; set; } = default!;
        public Result Result { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
