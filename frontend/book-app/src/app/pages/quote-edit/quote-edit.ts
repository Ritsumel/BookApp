import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from '../../services/quote';

@Component({
  selector: 'app-quote-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-edit.html',
  styleUrl: './quote-edit.scss'
})
export class QuoteEdit implements OnInit {

  id!: number;

  editQuote = {
    content: '',
    author: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: Quote
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.quoteService.getQuoteById(this.id).subscribe({
      next: (data) => {
        this.editQuote = {
          content: data.content,
          author: data.author
        };
      }
    });
  }

  saveEdit() {

    if (!this.editQuote.content || !this.editQuote.author) {
      return;
    }

    const updatedQuote = {
      content: this.editQuote.content.trim(),
      author: this.editQuote.author.trim()
    };

    this.quoteService.updateQuote(this.id, updatedQuote).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/quotes']);
  }
}
