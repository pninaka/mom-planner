import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">💛 מתכנן האמא</div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">🗓️ לוח שנה</a>
        <a routerLink="/recipes" routerLinkActive="active">🍽️ מתכונים</a>
        <a routerLink="/activities" routerLinkActive="active">🎨 תעסוקה</a>
      </div>
      <div class="nav-user">
        <span class="user-name">שלום, {{ auth.getUserName() }} 👋</span>
        <button class="logout-btn" (click)="auth.logout()">יציאה</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; right: 0; left: 0;
      height: 70px;
      background: white;
      border-bottom: 2px solid var(--border);
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      gap: 1.5rem;
      z-index: 100;
      box-shadow: 0 2px 15px rgba(232,116,154,0.1);
    }
    .nav-brand {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--primary-dark);
      white-space: nowrap;
    }
    .nav-links {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      a {
        padding: 0.4rem 0.9rem;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-light);
        transition: all 0.2s;
        white-space: nowrap;
        &:hover, &.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }
      }
    }
    .nav-user {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      white-space: nowrap;
      .user-name { font-size: 0.88rem; color: var(--text-light); }
    }
    .logout-btn {
      background: none;
      border: 1.5px solid var(--border);
      border-radius: 50px;
      padding: 0.3rem 0.9rem;
      font-size: 0.85rem;
      color: var(--text-light);
      cursor: pointer;
      transition: all 0.2s;
      &:hover { border-color: var(--primary); color: var(--primary); }
    }
    @media (max-width: 600px) {
      .user-name { display: none; }
      .nav-brand { font-size: 1rem; }
    }
  `]
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
}
