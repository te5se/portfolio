using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Math;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Encodings.Web;
using ThirdParty.BouncyCastle.OpenSsl;

namespace PortfolioProject.Controllers
{
    [ApiController]
    [Route("api/tokens")]
    public class TokenController : Controller
    {
              
      
        // тестовые данные вместо использования базы данных
        private List<Person> people = new List<Person>
        {
            new Person {Login="admin@gmail.com", Password="12345", Role = "admin" },
            new Person { Login="qwerty@gmail.com", Password="55555", Role = "user" }
        };

        [HttpGet("1234")]
        [ClaimRequirement("123","123")]
        public async Task<ActionResult<object>> Authorize(long id)
        {
            return "getit";
        }

        [HttpGet("Token")]
        public async Task<ActionResult<object>> GetIngredientsInRecipe(long id)
        {
            try
            {
                RSA rsa = RSA.Create(2048); // Generate a new 2048 bit RSA key
                var key = rsa.ExportRSAPrivateKey();
                var key2 = rsa.ExportRSAPublicKey();
                var bytes = Encoding.UTF8.GetBytes("AC");
                var byte2 = key2[269];
                key2[269] = bytes[0];
                var signature = rsa.SignData(Encoding.ASCII.GetBytes("1234"),HashAlgorithmName.SHA512, RSASignaturePadding.Pkcs1);
                //rsa.ImportRSAPublicKey(key2, out int _);
                var result = rsa.VerifyData(Encoding.ASCII.GetBytes("1234"), signature, HashAlgorithmName.SHA512, RSASignaturePadding.Pkcs1);
                
            }
            catch (Exception e)
            {
                //Catch this exception in case the encryption did
                //not succeed.
                Console.WriteLine("Encryption failed.");
            }
            return "";
        }
        
    }

    public class ClaimRequirementAttribute : TypeFilterAttribute
    {
        public ClaimRequirementAttribute(string claimType, string claimValue) : base(typeof(ClaimRequirementFilter))
        {
            Arguments = new object[] { new Claim(claimType, claimValue) };
        }
    }

    public class ClaimRequirementFilter : IAuthorizationFilter
    {
        readonly Claim _claim;

        public ClaimRequirementFilter(Claim claim)
        {
            _claim = claim;
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.ActionDescriptor.EndpointMetadata.FirstOrDefault(p=>p is AllowAnonymousAttribute) != null)
            {
                return;
            }
            var hasClaim = false;
            if (!hasClaim)
            {
                context.Result = new UnauthorizedResult();
                context.HttpContext.Response.StatusCode =
                              (int)HttpStatusCode.Unauthorized;
            }
        }
    }
    public class MySchemeHandler : IAuthenticationHandler
    {
        private HttpContext _context;
        public Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)
        {
            _context = context;
            return Task.CompletedTask;
        }
        public Task<AuthenticateResult> AuthenticateAsync()
            => Task.FromResult(AuthenticateResult.Fail("123"));

        public Task ChallengeAsync(AuthenticationProperties? properties)
        {
            return Task.FromResult(AuthenticateResult.Fail("234"));
        }

        public Task ForbidAsync(AuthenticationProperties? properties)
        {
            return Task.FromResult(AuthenticateResult.Fail("This user is not authorized for current call."));
        }
    }
    public class MyNinjaAuthSchemeOptions : AuthenticationSchemeOptions
    {
    }
    public class MyNinjaAuthHandler
        : AuthenticationHandler<MyNinjaAuthSchemeOptions>
    {
        public MyNinjaAuthHandler(
            IOptionsMonitor<MyNinjaAuthSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            AuthenticationTicket authenticationTicket = new AuthenticationTicket(ClaimsPrincipal.Current, null ,"asd");

            return AuthenticateResult.Fail("q23");
        }
    }
    public class Person
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
