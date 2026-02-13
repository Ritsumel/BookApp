using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // In-memory users list (fake database)
        private static List<User> _users = new List<User>();

        // Register endpoint
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            // Trim input
            user.Username = user.Username?.Trim() ?? string.Empty;
            user.Password = user.Password?.Trim() ?? string.Empty;

            // Required check
            if (string.IsNullOrWhiteSpace(user.Username) ||
                string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Du måste ange användarnamn och lösenord");
            }

            // Minimum length check
            if (user.Username.Length < 3)
                return BadRequest("Användarnamnet måste vara minst 3 tecken långt");

            if (user.Password.Length < 6)
                return BadRequest("Lösenordet måste vara minst 6 tecken långt");

            // Case-insensitive username check
            if (_users.Any(u =>
                u.Username.Equals(user.Username, StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest("Användarnamnet finns redan");
            }

            user.Id = _users.Count + 1;
            _users.Add(user);

            return Ok(new { message = "Registreringen lyckades" });
        }


        // Login endpoint
        [HttpPost("login")]
        public IActionResult Login(User loginUser)
        {
            // Trim input
            loginUser.Username = loginUser.Username?.Trim() ?? string.Empty;
            loginUser.Password = loginUser.Password?.Trim() ?? string.Empty;

            // Required check
            if (string.IsNullOrWhiteSpace(loginUser.Username) ||
                string.IsNullOrWhiteSpace(loginUser.Password))
            {
                return BadRequest("Du måste ange användarnamn och lösenord");
            }

            var user = _users.FirstOrDefault(u =>
                u.Username.Equals(loginUser.Username, StringComparison.OrdinalIgnoreCase) &&
                u.Password == loginUser.Password);

            if (user == null)
                return Unauthorized("Felaktiga inloggningsuppgifter");

            var jwtSettings = HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()
                .GetSection("Jwt");

            var keyString = jwtSettings["Key"];

            if (string.IsNullOrEmpty(keyString))
                throw new Exception("JWT Key is not configured properly.");

            var key = Encoding.ASCII.GetBytes(keyString);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, user.Username)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}
