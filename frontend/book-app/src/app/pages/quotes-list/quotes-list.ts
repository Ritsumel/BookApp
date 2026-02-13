import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Quote } from '../../services/quote';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quotes-list.html',
  styleUrl: './quotes-list.scss'
})
export class QuotesList implements OnInit {

  quotes: any[] = [];

  constructor(
    private quoteService: Quote,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.cdr.detectChanges();
      }
    });
  }

  deleteQuote(id: number) {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.loadQuotes();
      }
    });
  }

  goToCreate() {
    this.router.navigate(['/quotes/new']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/quotes', id, 'edit']);
  }
}
