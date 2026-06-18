import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Recipe {
  id: number;
  title: string;
  category: string;
  ingredients: string;
  instructions: string;
  imageUrl?: string;
  userId?: number;
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="recipes-page">
      <div class="page-header">
        <h1>🍽️ מתכונים</h1>
        <p>רעיונות לארוחות טעימות לכל המשפחה</p>
      </div>

      <!-- סינון ופעולות -->
      <div class="toolbar">
        <div class="filter-tabs">
          <button [class.active]="filter === ''" (click)="setFilter('')">הכל</button>
          <button [class.active]="filter === 'צהריים'" (click)="setFilter('צהריים')">🌞 ארוחת צהריים</button>
          <button [class.active]="filter === 'ערב'" (click)="setFilter('ערב')">🌙 ארוחת ערב</button>
        </div>
        <button class="btn btn-primary" (click)="showModal = true">+ הוסיפי מתכון</button>
      </div>

      <!-- רשימת מתכונים -->
      <div class="recipes-grid">
        <div class="recipe-card card" *ngFor="let r of filtered" (click)="selected = r" [class.open]="selected?.id === r.id">
          <div class="recipe-header">
            <span class="category-badge" [class.lunch]="r.category === 'צהריים'" [class.dinner]="r.category === 'ערב'">
              {{ r.category === 'צהריים' ? '🌞 צהריים' : '🌙 ערב' }}
            </span>
            <button *ngIf="r.userId" class="delete-btn" (click)="deleteRecipe($event, r.id)">🗑️</button>
          </div>
          <h3 class="recipe-title">{{ r.title }}</h3>

          <!-- פרסום מלא -->
          <div class="recipe-details" *ngIf="selected?.id === r.id">
            <div class="detail-section">
              <h4>🧂 מרכיבים</h4>
              <p>{{ r.ingredients }}</p>
            </div>
            <div class="detail-section">
              <h4>👩‍🍳 הוראות הכנה</h4>
              <p>{{ r.instructions }}</p>
            </div>
            <button class="btn btn-outline btn-sm" (click)="selected = null; $event.stopPropagation()">סגור</button>
          </div>
          <p class="tap-hint" *ngIf="selected?.id !== r.id">לחצי לצפייה במתכון</p>
        </div>
      </div>

      <!-- Modal הוספת מתכון -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal($event)">
        <div class="modal">
          <h3>הוסיפי מתכון 🍴</h3>
          <div class="form-group">
            <label>שם המתכון</label>
            <input [(ngModel)]="newRecipe.title" placeholder="למשל: פסטה ברוטב עגבניות" />
          </div>
          <div class="form-group">
            <label>קטגוריה</label>
            <select [(ngModel)]="newRecipe.category">
              <option value="צהריים">ארוחת צהריים</option>
              <option value="ערב">ארוחת ערב</option>
            </select>
          </div>
          <div class="form-group">
            <label>מרכיבים</label>
            <textarea [(ngModel)]="newRecipe.ingredients" rows="2" placeholder="מרכיבים, מופרדים בפסיקים..."></textarea>
          </div>
          <div class="form-group">
            <label>הוראות הכנה</label>
            <textarea [(ngModel)]="newRecipe.instructions" rows="3" placeholder="שלב אחר שלב..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" (click)="showModal = false">ביטול</button>
            <button class="btn btn-primary" (click)="addRecipe()">שמירה</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipes-page { max-width: 1000px; margin: 0 auto; padding: 1rem; }

    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;
    }

    .filter-tabs {
      display: flex; gap: 0.5rem;
      button {
        padding: 0.5rem 1rem; border-radius: 50px; border: 2px solid var(--border);
        background: white; font-size: 0.9rem; font-weight: 600; cursor: pointer;
        color: var(--text-light); transition: all 0.2s;
        &.active, &:hover { background: var(--primary); color: white; border-color: var(--primary); }
      }
    }

    .recipes-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;
    }

    .recipe-card {
      cursor: pointer; transition: all 0.2s;
      &.open { border-color: var(--primary); }
    }

    .recipe-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; }

    .category-badge {
      font-size: 0.78rem; font-weight: 700; padding: 0.25rem 0.7rem; border-radius: 50px;
      &.lunch { background: #fff9e6; color: #b7770d; }
      &.dinner { background: #f0e8ff; color: var(--secondary); }
    }

    .delete-btn { background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.6;
      &:hover { opacity: 1; }
    }

    .recipe-title { font-size: 1.05rem; margin-bottom: 0.4rem; }

    .tap-hint { font-size: 0.78rem; color: var(--text-light); margin-top: 0.5rem; }

    .recipe-details {
      margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 1rem;
      .detail-section { margin-bottom: 0.8rem;
        h4 { font-size: 0.9rem; margin-bottom: 0.3rem; color: var(--primary-dark); }
        p { font-size: 0.9rem; color: var(--text-light); line-height: 1.5; }
      }
    }
    .btn-sm { padding: 0.3rem 0.8rem; font-size: 0.85rem; }
  `]
})
export class RecipesComponent implements OnInit {
  private api = environment.apiUrl;
  recipes: Recipe[] = [];
  filter = '';
  selected: Recipe | null = null;
  showModal = false;
  newRecipe = { title: '', category: 'צהריים', ingredients: '', instructions: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    const q = this.filter ? `?category=${this.filter}` : '';
    this.http.get<Recipe[]>(`${this.api}/recipes${q}`).subscribe(r => this.recipes = r);
  }

  get filtered() { return this.recipes; }

  setFilter(f: string) {
    this.filter = f;
    this.load();
  }

  addRecipe() {
    this.http.post<Recipe>(`${this.api}/recipes`, this.newRecipe).subscribe(r => {
      this.recipes.push(r);
      this.showModal = false;
      this.newRecipe = { title: '', category: 'צהריים', ingredients: '', instructions: '' };
    });
  }

  deleteRecipe(e: Event, id: number) {
    e.stopPropagation();
    this.http.delete(`${this.api}/recipes/${id}`).subscribe(() => {
      this.recipes = this.recipes.filter(r => r.id !== id);
    });
  }

  closeModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showModal = false;
  }
}
