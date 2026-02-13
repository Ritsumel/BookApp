import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { BooksList } from './pages/books-list/books-list';
import { BookCreate } from './pages/book-create/book-create';
import { BookEdit } from './pages/book-edit/book-edit';
import { QuotesList } from './pages/quotes-list/quotes-list';
import { QuoteCreate } from './pages/quote-create/quote-create';
import { QuoteEdit } from './pages/quote-edit/quote-edit';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'books', component: BooksList, canActivate: [authGuard] },
  { path: 'books/new', component: BookCreate, canActivate: [authGuard] },
  { path: 'books/:id/edit', component: BookEdit, canActivate: [authGuard] },

  { path: 'quotes', component: QuotesList, canActivate: [authGuard] },
  { path: 'quotes/new', component: QuoteCreate, canActivate: [authGuard] },
  { path: 'quotes/:id/edit', component: QuoteEdit, canActivate: [authGuard] },
];
