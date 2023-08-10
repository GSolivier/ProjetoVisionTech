using Microsoft.EntityFrameworkCore;
using VisionTechAPI.Data;
using VisionTechAPI.Repository;
using VisionTechAPI.Repository.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy(name: "MyPolicy", 
    policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    }
    );
});


builder.Services.AddEntityFrameworkSqlServer()
    .AddDbContext<DataContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase"))
    );

    builder.Services.AddScoped<IFuncionario, RepositoryFuncionario>();
    builder.Services.AddScoped<IDepartamento, RepositoryDepartamento>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
