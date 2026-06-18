import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card">
        <div class="auth-header">
          <div class="logo">💛</div>
          <h1>ברוכה הבאה!</h1>
          <p>כנסי לחשבון שלך</p>
        </div>

        <form (ngSubmit)="onLogin()" #f="ngForm">
          <div class="form-group">
            <label>אימייל</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="הכניסי את האימייל שלך" />
          </div>
          <div class="form-group">
            <label>סיסמה</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="הכניסי את הסיסמה שלך" />
          </div>

          <p class="error" *ngIf="error">{{ error }}</p>

          <button type="submit" class="btn btn-primary full-width" [disabled]="loading">
            {{ loading ? 'מתחברת...' : 'כניסה' }}
          </button>
        </form>

        <p class="switch-link">
          עדיין לא רשומה? <a routerLink="/register">הירשמי עכשיו</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #fef0f6 0%, #f3e8ff 100%);
      padding: 1rem;
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
      .logo { font-size: 3rem; }
      h1 { font-size: 1.8rem; color: var(--primary-dark); }
      p { color: var(--text-light); }
    }
    .full-width { width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; }
    .error { color: #e74c3c; font-size: 0.9rem; margin-bottom: 1rem; text-align: center; }
    .switch-link { text-align: center; margin-top: 1.2rem; color: var(--text-light); font-size: 0.9rem;
      a { color: var(--primary); font-weight: 600; }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => { this.error = 'אימייל או סיסמה שגויים'; this.loading = false; }
    });
  }
}
