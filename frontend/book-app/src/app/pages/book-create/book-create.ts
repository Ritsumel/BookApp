import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../services/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-create.html',
  styleUrl: './book-create.scss'
})
export class BookCreate {

  newBook = {
    title: '',
    author: '',
    publishedDate: ''
  };

  constructor(
    private bookService: Book,
    private router: Router
  ) {}

  error = '';
  message = '';

  addBook() {

    if (!this.newBook.title ||
        !this.newBook.author ||
        !this.newBook.publishedDate) {
      return;
    }

    const bookToSend = {
      title: this.newBook.title.trim(),
      author: this.newBook.author.trim(),
      publishedDate: new Date(this.newBook.publishedDate).toISOString()
    };

    this.bookService.createBook(bookToSend).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.error = err.error || 'Ett fel uppstod';
      }
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
