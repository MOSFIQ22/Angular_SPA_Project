using Microsoft.EntityFrameworkCore;
using WebApi_Project_1268474.HostedService;
using WebApi_Project_1268474.Repositories.Interfaces;
using WebApi_Project_1268474.Repositories;
using WebApi_Project_1268474.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CourseDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("db")));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddHostedService<DbSeederHostedService>();
builder.Services.AddCors(p => p.AddPolicy("EnableCors", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddControllers()
     .AddNewtonsoftJson(option =>
     {
         option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
         option.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
     });
var app = builder.Build();

app.UseRouting();
app.UseAuthorization();
app.UseStaticFiles();
app.UseCors("EnableCors");

app.MapControllers();

app.Run();
