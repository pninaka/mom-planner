import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Activity {
  id: number;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  userId?: number;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="activities-page">
      <div class="page-header">
        <h1>🎨 רעיונות לתעסוקה</h1>
        <p>פעילויות מותאמות לגיל הילדים שלך</p>
      </div>

      <div class="toolbar">
        <p class="age-note" *ngIf="activities.length">מציג רעיונות המתאימים לגילאי הילדים שלך ✨</p>
        <button class="btn btn-primary" (click)="showModal = true">+ הוסיפי רעיון</button>
      </div>

      <div class="activities-grid">
        <div class="activity-card card" *ngFor="let a of activities">
          <div class="activity-header">
            <span class="age-badge">גיל {{ a.minAge }}–{{ a.maxAge }}</span>
            <button *ngIf="a.userId" class="delete-btn" (click)="deleteActivity(a.id)">🗑️</button>
          </div>
          <h3>{{ a.title }}</h3>
          <p class="description">{{ a.description }}</p>
        </div>
      </div>

      <div class="empty" *ngIf="activities.length === 0">
        <p>😊 לא נמצאו רעיונות. הוסיפי ילדים לפרופיל שלך כדי לראות רעיונות מותאמים.</p>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal($event)">
        <div class="modal">
          <h3>הוסיפי רעיון לתעסוקה 💡</h3>
          <div class="form-group">
            <label>שם הפעילות</label>
            <input [(ngModel)]="newActivity.title" placeholder="למשל: ציור באצבעות" />
          </div>
          <div class="form-group">
            <label>תיאור</label>
            <textarea [(ngModel)]="newActivity.description" rows="3" placeholder="מה עושים? למה זה כיף?"></textarea>
          </div>
          <div class="form-group age-range">
            <div>
              <label>גיל מינימלי</label>
              <input type="number" [(ngModel)]="newActivity.minAge" min="0" max="18" />
            </div>
            <div>
              <label>גיל מקסימלי</label>
              <input type="number" [(ngModel)]="newActivity.maxAge" min="0" max="18" />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" (click)="showModal = false">ביטול</button>
            <button class="btn btn-primary" (click)="addActivity()">שמירה</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .activities-page { max-width: 1000px; margin: 0 auto; padding: 1rem; }

    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.5rem;
      .age-note { color: var(--text-light); font-size: 0.9rem; }
    }

    .activities-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;
    }

    .activity-card {
      border-right: 4px solid var(--primary-light);
      &:nth-child(3n+1) { border-right-color: var(--primary); }
      &:nth-child(3n+2) { border-right-color: var(--secondary-light); }
      &:nth-child(3n+3) { border-right-color: var(--accent); }
    }

    .activity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; }

    .age-badge {
      font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 50px;
      background: #f0e8ff; color: var(--secondary);
    }

    .delete-btn { background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.6;
      &:hover { opacity: 1; }
    }

    h3 { font-size: 1rem; margin-bottom: 0.5rem; }

    .description { font-size: 0.88rem; color: var(--text-light); line-height: 1.5; }

    .empty { text-align: center; padding: 3rem; color: var(--text-light); font-size: 1rem; }

    .age-range { flex-direction: row !important; gap: 1rem;
      div { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
      label { font-size: 0.9rem; font-weight: 600; color: var(--text-light); }
      input { padding: 0.75rem 1rem; border: 2px solid var(--border); border-radius: 10px; font-size: 1rem; }
    }
  `]
})
export class ActivitiesComponent implements OnInit {
  private api = environment.apiUrl;
  activities: Activity[] = [];
  showModal = false;
  newActivity = { title: '', description: '', minAge: 0, maxAge: 12 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Activity[]>(`${this.api}/activities`).subscribe(a => this.activities = a);
  }

  addActivity() {
    this.http.post<Activity>(`${this.api}/activities`, this.newActivity).subscribe(a => {
      this.activities.push(a);
      this.showModal = false;
      this.newActivity = { title: '', description: '', minAge: 0, maxAge: 12 };
    });
  }

  deleteActivity(id: number) {
    this.http.delete(`${this.api}/activities/${id}`).subscribe(() => {
      this.activities = this.activities.filter(a => a.id !== id);
    });
  }

  closeModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showModal = false;
  }
}
