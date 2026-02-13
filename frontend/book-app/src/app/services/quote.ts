import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Quote {

  private apiUrl = 'https://localhost:7173/api/quotes';

  constructor(private http: HttpClient) {}

  getQuotes() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getQuoteById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createQuote(quote: any) {
    return this.http.post(this.apiUrl, quote);
  }

  updateQuote(id: number, quote: any) {
    return this.http.put(`${this.apiUrl}/${id}`, quote);
  }

  deleteQuote(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
