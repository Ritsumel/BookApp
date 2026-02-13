using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookApi.Models;
using System.Linq;

namespace BookApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        // Preloaded quote list (temp database)
        private static List<Quote> _quotes = new List<Quote>
        {
            new Quote { Id = 1, Content = "Stay hungry, stay foolish.", Author = "Steve Jobs" },
            new Quote { Id = 2, Content = "Simplicity is the ultimate sophistication.", Author = "Leonardo da Vinci" },
            new Quote { Id = 3, Content = "Code is like humor. When you have to explain it, it’s bad.", Author = "Cory House" },
            new Quote { Id = 4, Content = "First, solve the problem. Then, write the code.", Author = "John Johnson" },
            new Quote { Id = 5, Content = "Programs must be written for people to read.", Author = "Harold Abelson" }
        };

        // GET
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_quotes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var quote = _quotes.FirstOrDefault(q => q.Id == id);

            if (quote == null)
                return NotFound();

            return Ok(quote);
        }

        // POST
        [HttpPost]
        public IActionResult Create(Quote quote)
        {
            quote.Content = quote.Content?.Trim() ?? string.Empty;
            quote.Author = quote.Author?.Trim() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(quote.Content) ||
                string.IsNullOrWhiteSpace(quote.Author))
            {
                return BadRequest("Du måste ange citat och författare");
            }

            quote.Id = _quotes.Any() ? _quotes.Max(q => q.Id) + 1 : 1;
            _quotes.Add(quote);

            return CreatedAtAction(nameof(GetById), new { id = quote.Id }, quote);
        }

        // PUT
        [HttpPut("{id}")]
        public IActionResult Update(int id, Quote updatedQuote)
        {
            var quote = _quotes.FirstOrDefault(q => q.Id == id);

            if (quote == null)
                return NotFound();

            updatedQuote.Content = updatedQuote.Content?.Trim() ?? string.Empty;
            updatedQuote.Author = updatedQuote.Author?.Trim() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(updatedQuote.Content) ||
                string.IsNullOrWhiteSpace(updatedQuote.Author))
            {
                return BadRequest("Du måste ange citat och författare");
            }

            quote.Content = updatedQuote.Content;
            quote.Author = updatedQuote.Author;

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var quote = _quotes.FirstOrDefault(q => q.Id == id);

            if (quote == null)
                return NotFound();

            _quotes.Remove(quote);

            return NoContent();
        }
    }
}
