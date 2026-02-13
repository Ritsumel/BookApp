import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  theme: 'light' | 'dark' = 'light';

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.theme = 'dark';
      document.documentElement.classList.add('dark-mode');
    }

    // Auto close navbar on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navbar = this.navbarCollapse?.nativeElement;
        if (navbar?.classList.contains('show')) {
          navbar.classList.remove('show');
        }
      }
    });
  }
  
  toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      this.theme = 'light';
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
}
