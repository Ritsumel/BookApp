import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Quote } from '../../services/quote';

@Component({
  selector: 'app-quote-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-create.html',
  styleUrl: './quote-create.scss'
})
export class QuoteCreate {

  newQuote = {
    content: '',
    author: ''
  };

  constructor(
    private quoteService: Quote,
    private router: Router
  ) {}

  addQuote() {

    if (!this.newQuote.content || !this.newQuote.author) {
      return;
    }

    const quoteToSend = {
      content: this.newQuote.content.trim(),
      author: this.newQuote.author.trim()
    };

    this.quoteService.createQuote(quoteToSend).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/quotes']);
  }
}
