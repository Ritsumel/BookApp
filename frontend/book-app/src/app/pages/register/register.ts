import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {

  username = '';
  password = '';
  error = '';
  message = '';

  constructor(
    private auth: Auth, 
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/books']);
    }
  }

  register() {
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.error = '';
        this.message = 'Registreringen lyckades! Omdirigerar...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        if (typeof err.error === 'string') {
          this.error = err.error;
        } else if (err.error?.title) {
          this.error = err.error.title;
        } else {
          this.error = 'Registreringen misslyckades';
        }
      }
    });
  }
}
