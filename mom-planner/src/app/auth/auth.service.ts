import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse { token: string; name: string; userId: number; }
export interface ChildDto { name: string; birthDate: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { name: string; email: string; password: string; children: ChildDto[] }) {
    return this.http.post<AuthResponse>(`${this.api}/auth/register`, data)
      .pipe(tap(r => this.saveSession(r)));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password })
      .pipe(tap(r => this.saveSession(r)));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return !!localStorage.getItem('token'); }
  getToken() { return localStorage.getItem('token'); }
  getUserName() { return localStorage.getItem('userName') ?? ''; }

  private saveSession(r: AuthResponse) {
    localStorage.setItem('token', r.token);
    localStorage.setItem('userName', r.name);
    localStorage.setItem('userId', r.userId.toString());
  }
}
