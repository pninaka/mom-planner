import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ChildDto } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card">
        <div class="auth-header">
          <div class="logo">🌸</div>
          <h1>הרשמה</h1>
          <p>יצירת חשבון חדש</p>
        </div>

        <form (ngSubmit)="onRegister()" #f="ngForm">
          <div class="form-group">
            <label>שם מלא</label>
            <input type="text" [(ngModel)]="name" name="name" required placeholder="השם שלך" />
          </div>
          <div class="form-group">
            <label>אימייל</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="האימייל שלך" />
          </div>
          <div class="form-group">
            <label>סיסמה</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="לפחות 6 תווים" />
          </div>

          <div class="children-section">
            <div class="children-header">
              <h3>הילדים שלי 👶</h3>
              <button type="button" class="btn btn-outline btn-sm" (click)="addChild()">+ הוסיפי ילד/ה</button>
            </div>
            <p class="hint">הוסיפי את פרטי הילדים כדי שנוכל להתאים את התוכן</p>

            <div class="child-row" *ngFor="let child of children; let i = index">
              <input type="text" [(ngModel)]="child.name" [name]="'childName'+i" placeholder="שם הילד/ה" required />
              <input type="date" [(ngModel)]="child.birthDate" [name]="'childBirth'+i" required />
              <button type="button" class="remove-btn" (click)="removeChild(i)">✕</button>
            </div>
          </div>

          <p class="error" *ngIf="error">{{ error }}</p>

          <button type="submit" class="btn btn-primary full-width" [disabled]="loading">
            {{ loading ? 'נרשמת...' : 'הירשמי' }}
          </button>
        </form>

        <p class="switch-link">
          כבר רשומה? <a routerLink="/login">כניסה</a>
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
    .auth-card { width: 100%; max-width: 480px; }
    .auth-header { text-align: center; margin-bottom: 1.5rem;
      .logo { font-size: 3rem; }
      h1 { font-size: 1.8rem; color: var(--primary-dark); }
      p { color: var(--text-light); }
    }
    .children-section {
      background: #fef5f9;
      border-radius: var(--radius-sm);
      padding: 1rem;
      margin-bottom: 1.2rem;
      border: 1px dashed var(--primary-light);
    }
    .children-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;
      h3 { font-size: 1rem; }
    }
    .btn-sm { padding: 0.3rem 0.8rem; font-size: 0.85rem; }
    .hint { font-size: 0.82rem; color: var(--text-light); margin-bottom: 0.8rem; }
    .child-row {
      display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;
      input { flex: 1; padding: 0.5rem 0.8rem; border: 1.5px solid var(--border); border-radius: 8px; font-size: 0.9rem; }
      .remove-btn { background: none; border: none; color: #e74c3c; font-size: 1.1rem; cursor: pointer; padding: 0 0.3rem; }
    }
    .full-width { width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; }
    .error { color: #e74c3c; font-size: 0.9rem; margin-bottom: 1rem; text-align: center; }
    .switch-link { text-align: center; margin-top: 1.2rem; color: var(--text-light); font-size: 0.9rem;
      a { color: var(--primary); font-weight: 600; }
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  children: ChildDto[] = [{ name: '', birthDate: '' }];
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  addChild() { this.children.push({ name: '', birthDate: '' }); }
  removeChild(i: number) { this.children.splice(i, 1); }

  onRegister() {
    this.loading = true;
    this.error = '';
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      children: this.children.filter(c => c.name && c.birthDate)
    };
    this.auth.register(payload).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (e) => {
        this.error = e?.error ?? 'שגיאה בהרשמה, נסי שוב';
        this.loading = false;
      }
    });
  }
}
