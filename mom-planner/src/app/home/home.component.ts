import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

interface DayEvent {
  id?: number;
  title: string;
  date: string;
  time?: string;
  description?: string;
  type?: string; // 'user' | 'shopping' | 'birthday' | 'rosh_hodesh'
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="home">
      <div class="page-header">
        <h1>ברוכה הבאה, {{ auth.getUserName() }} 💛</h1>
        <p>לוח השבוע שלך</p>
      </div>

      <!-- ניווט שבוע -->
      <div class="week-nav">
        <button class="nav-btn" (click)="changeWeek(-1)">→ שבוע קודם</button>
        <span class="week-label">{{ weekLabel }}</span>
        <button class="nav-btn" (click)="changeWeek(1)">שבוע הבא ←</button>
      </div>

      <!-- ימי השבוע -->
      <div class="week-grid">
        <div class="day-card card" *ngFor="let day of weekDays" [class.today]="isToday(day.date)">
          <div class="day-header">
            <span class="day-name">{{ day.label }}</span>
            <span class="day-date">{{ day.date | date:'d/M' }}</span>
            <button class="add-btn" (click)="openAddEvent(day.date)" title="הוסיפי אירוע">+</button>
          </div>

          <!-- תזכורות אוטומטיות -->
          <div class="reminder" *ngFor="let r of getRemindersForDay(day.date)" [class]="'reminder-' + r.type">
            {{ r.title }}
          </div>

          <!-- אירועים -->
          <div class="event-item" *ngFor="let ev of getEventsForDay(day.date)">
            <span class="event-time" *ngIf="ev.time">{{ ev.time }}</span>
            <span class="event-title">{{ ev.title }}</span>
            <button class="delete-event" (click)="deleteEvent(ev.id!)">✕</button>
          </div>
        </div>
      </div>

      <!-- Modal הוספת אירוע -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal($event)">
        <div class="modal">
          <h3>הוסיפי אירוע ✨</h3>
          <div class="form-group">
            <label>כותרת</label>
            <input type="text" [(ngModel)]="newEvent.title" placeholder="מה יש היום?" />
          </div>
          <div class="form-group">
            <label>תאריך</label>
            <input type="date" [(ngModel)]="newEvent.date" />
          </div>
          <div class="form-group">
            <label>שעה (אופציונלי)</label>
            <input type="time" [(ngModel)]="newEvent.time" />
          </div>
          <div class="form-group">
            <label>פרטים (אופציונלי)</label>
            <textarea [(ngModel)]="newEvent.description" rows="2" placeholder="פרטים נוספים..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" (click)="showModal = false">ביטול</button>
            <button class="btn btn-primary" (click)="saveEvent()">שמירה</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home { max-width: 1100px; margin: 0 auto; padding: 1rem; }

    .week-nav {
      display: flex; align-items: center; justify-content: center; gap: 1.5rem;
      margin-bottom: 1.5rem;
      .nav-btn {
        background: white; border: 2px solid var(--border); border-radius: 50px;
        padding: 0.5rem 1.2rem; font-size: 0.9rem; font-weight: 600; color: var(--primary);
        transition: all 0.2s; cursor: pointer;
        &:hover { background: var(--primary); color: white; border-color: var(--primary); }
      }
      .week-label { font-weight: 700; font-size: 1.1rem; color: var(--text); }
    }

    .week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.7rem;
      @media (max-width: 900px) { grid-template-columns: repeat(4, 1fr); }
      @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
    }

    .day-card {
      padding: 0.8rem;
      min-height: 120px;
      border: 2px solid var(--border);

      &.today {
        border-color: var(--primary);
        background: linear-gradient(135deg, #fff5f9, #fff);
        .day-name { color: var(--primary-dark); }
      }
    }

    .day-header {
      display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.6rem;
      .day-name { font-weight: 700; font-size: 0.9rem; flex: 1; }
      .day-date { font-size: 0.78rem; color: var(--text-light); }
      .add-btn {
        width: 22px; height: 22px; border-radius: 50%;
        background: var(--primary-light); border: none; color: white;
        font-size: 1rem; line-height: 1; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        &:hover { background: var(--primary); }
      }
    }

    .reminder {
      font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 6px; margin-bottom: 0.3rem;
    }
    .reminder-shopping { background: #e8f5e9; color: #2e7d32; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 6px; margin-bottom: 0.3rem; }
    .reminder-birthday { background: #fff3e0; color: #e65100; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 6px; margin-bottom: 0.3rem; }
    .reminder-rosh_hodesh { background: #e3f2fd; color: #1565c0; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 6px; margin-bottom: 0.3rem; }

    .event-item {
      display: flex; align-items: center; gap: 0.3rem;
      font-size: 0.8rem; padding: 0.2rem 0; border-bottom: 1px solid var(--border);
      &:last-child { border: none; }
      .event-time { color: var(--text-light); white-space: nowrap; }
      .event-title { flex: 1; }
      .delete-event {
        background: none; border: none; color: #ccc; cursor: pointer; font-size: 0.8rem;
        &:hover { color: #e74c3c; }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private api = environment.apiUrl;
  weekDays: { label: string; date: Date }[] = [];
  allEvents: DayEvent[] = [];
  reminders: DayEvent[] = [];
  weekStart = new Date();
  showModal = false;
  newEvent: DayEvent = { title: '', date: '', time: '' };

  readonly dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.setWeekStart(new Date());
  }

  setWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day); // ראשון
    d.setHours(0, 0, 0, 0);
    this.weekStart = d;
    this.buildWeekDays();
    this.loadWeekData();
  }

  buildWeekDays() {
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(this.weekStart);
      d.setDate(d.getDate() + i);
      return { label: this.dayNames[i], date: d };
    });
  }

  get weekLabel() {
    const end = new Date(this.weekStart);
    end.setDate(end.getDate() + 6);
    const fmt = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
    return `${fmt(this.weekStart)} – ${fmt(end)}`;
  }

  changeWeek(dir: number) {
    const d = new Date(this.weekStart);
    d.setDate(d.getDate() + dir * 7);
    this.setWeekStart(d);
  }

  loadWeekData() {
    const iso = this.weekStart.toISOString();
    this.http.get<any>(`${this.api}/events/week?weekStart=${iso}`).subscribe(data => {
      this.allEvents = data.events;
      this.reminders = data.reminders;
    });
  }

  getEventsForDay(date: Date): DayEvent[] {
    const key = this.dateKey(date);
    return this.allEvents.filter(e => e.date.startsWith(key));
  }

  getRemindersForDay(date: Date): DayEvent[] {
    const key = this.dateKey(date);
    return this.reminders.filter((r: any) => r.date === key);
  }

  dateKey(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  isToday(date: Date) {
    return this.dateKey(date) === this.dateKey(new Date());
  }

  openAddEvent(date: Date) {
    this.newEvent = { title: '', date: this.dateKey(date), time: '' };
    this.showModal = true;
  }

  closeModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showModal = false;
  }

  saveEvent() {
    if (!this.newEvent.title || !this.newEvent.date) return;
    this.http.post<DayEvent>(`${this.api}/events`, {
      title: this.newEvent.title,
      date: new Date(this.newEvent.date).toISOString(),
      time: this.newEvent.time || null,
      description: this.newEvent.description || null
    }).subscribe(ev => {
      this.allEvents.push(ev);
      this.showModal = false;
    });
  }

  deleteEvent(id: number) {
    this.http.delete(`${this.api}/events/${id}`).subscribe(() => {
      this.allEvents = this.allEvents.filter(e => e.id !== id);
    });
  }
}
