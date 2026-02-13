import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../services/book';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.scss'
})
export class BookEdit implements OnInit {

  id!: number;

  editBook = {
    title: '',
    author: '',
    publishedDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Book
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.editBook = {
          title: data.title,
          author: data.author,
          publishedDate: data.publishedDate.substring(0, 10)
        };
      }
    });
  }

  saveEdit() {

    if (!this.editBook.title ||
        !this.editBook.author ||
        !this.editBook.publishedDate) {
      return;
    }

    const updatedBook = {
      title: this.editBook.title.trim(),
      author: this.editBook.author.trim(),
      publishedDate: new Date(this.editBook.publishedDate).toISOString()
    };

    this.bookService.updateBook(this.id, updatedBook).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
