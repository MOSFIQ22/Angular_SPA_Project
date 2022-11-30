using WebApi_Project_1268474.Models;

namespace WebApi_Project_1268474.HostedService
{
    public class DbSeederHostedService : IHostedService
    {

        IServiceProvider serviceProvider;
        public DbSeederHostedService(
            IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;

        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (IServiceScope scope = serviceProvider.CreateScope())
            {

                var db = scope.ServiceProvider.GetRequiredService<CourseDbContext>();

                await SeedDbAsync(db);

            }
        }
        public async Task SeedDbAsync(CourseDbContext db)
        {
            await db.Database.EnsureCreatedAsync();
            if (!db.Courses.Any())
            {
                var c = new Course { BatchName = "CS/ACSL/R-50", CourseName = "CS", CourseDesc = "Full IT Related Course", CourseDuration = "1 year", StartDate = new DateTime(2022, 01, 08), EndDate = new DateTime(2023, 02, 06), Available = true };
                var c1 = new Course { BatchName = "DDD/ACSL/R-50", CourseName = "DDD", CourseDesc = "Full IT Related Course", CourseDuration = "1 year", StartDate = new DateTime(2022, 02, 05), EndDate = new DateTime(2023, 03, 09), Available = true };

                var m = new Module { ModuleName = "MSSQL Server", ModuleDesc = "All Sql Server Related things", ModuleNumber = "One" };
                var m1 = new Module { ModuleName = "MS Visual C#", ModuleDesc = "All MS Visual Related things", ModuleNumber = "Two" };

                var e = new Exam { ExamName = "Monthly", ExamFee = 1100.00M };
                var e1 = new Exam { ExamName = "Mid Monthly", ExamFee = 650.00M };

                var t = new Trainee { TraineeName = " Nur Sakib", TraineeAddress = "Mirpur-10", Email = "nursakib47@gmail.com", IsRunning = true, BirthDate = new DateTime(1997, 01, 03), Picture = "P1.jpg" };
                var t1 = new Trainee { TraineeName = " Maruf Billah", TraineeAddress = "Mirpur-1", Email = "marufbillah78@gmail.com", IsRunning = true, BirthDate = new DateTime(1996, 03, 09), Picture = "P2.jpg" };
                c.Trainees.Add(t);
                c1.Trainees.Add(t1);

                var cm = new CourseModule { Course = c, Module = m };
                var cm1 = new CourseModule { Course = c1, Module = m1 };

                var ex = new ExamResult { Result = Result.pass, Exam = e, Trainee = t };
                var ex1 = new ExamResult { Result = Result.fail, Exam = e1, Trainee = t1 };

                await db.Courses.AddAsync(c);
                await db.Courses.AddAsync(c1);

                await db.Modules.AddAsync(m);
                await db.Modules.AddAsync(m1);

                await db.Exams.AddAsync(e);
                await db.Exams.AddAsync(e1);

                await db.CourseModules.AddAsync(cm);
                await db.CourseModules.AddAsync(cm1);

                await db.ExamResults.AddAsync(ex);
                await db.ExamResults.AddAsync(ex1);

                await db.SaveChangesAsync();
            }

        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
