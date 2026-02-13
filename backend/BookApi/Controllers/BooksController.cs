using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace BookApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // Preloaded book list (temp database)
        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "Clean Code", Author = "Robert C. Martin", PublishedDate = new DateTime(2008, 8, 1) },
            new Book { Id = 2, Title = "The Pragmatic Programmer", Author = "Andrew Hunt", PublishedDate = new DateTime(1999, 10, 20) },
            new Book { Id = 3, Title = "Atomic Habits", Author = "James Clear", PublishedDate = new DateTime(2018, 10, 16) },
            new Book { Id = 4, Title = "Deep Work", Author = "Cal Newport", PublishedDate = new DateTime(2016, 1, 5) },
            new Book { Id = 5, Title = "You Don't Know JS", Author = "Kyle Simpson", PublishedDate = new DateTime(2015, 12, 27) },
            new Book { Id = 6, Title = "Refactoring", Author = "Martin Fowler", PublishedDate = new DateTime(1999, 7, 8) },
            new Book { Id = 7, Title = "Design Patterns", Author = "Erich Gamma", PublishedDate = new DateTime(1994, 10, 31) },
            new Book { Id = 8, Title = "The Clean Coder", Author = "Robert C. Martin", PublishedDate = new DateTime(2011, 5, 13) }
        };

        // GET
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_books);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            return Ok(book);
        }

        // POST
        [HttpPost]
        public IActionResult Create(Book book)
        {
            book.Title = book.Title?.Trim() ?? string.Empty;
            book.Author = book.Author?.Trim() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(book.Title) ||
                string.IsNullOrWhiteSpace(book.Author))
            {
                return BadRequest("Du måste ange titel och författare");
            }

            book.Id = _books.Any() ? _books.Max(b => b.Id) + 1 : 1;
            _books.Add(book);

            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        // PUT
        [HttpPut("{id}")]
        public IActionResult Update(int id, Book updatedBook)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            updatedBook.Title = updatedBook.Title?.Trim() ?? string.Empty;
            updatedBook.Author = updatedBook.Author?.Trim() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(updatedBook.Title) ||
                string.IsNullOrWhiteSpace(updatedBook.Author))
            {
                return BadRequest("Du måste ange titel och författare");
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.PublishedDate = updatedBook.PublishedDate;

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            _books.Remove(book);

            return NoContent();
        }
    }
}
