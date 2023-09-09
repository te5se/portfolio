using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using PortfolioProject.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddAuthentication(
//    options => options.DefaultScheme = "authScheme")
//    .AddScheme<MyNinjaAuthSchemeOptions, MyNinjaAuthHandler>(
//        "authScheme", options => { });
builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = "scheme name";

    // you can also skip this to make the challenge scheme handle the forbid as well
    options.DefaultForbidScheme = "scheme name";

    // of course you also need to register that scheme, e.g. using
    options.AddScheme<MySchemeHandler>("scheme name", "scheme display name");
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
