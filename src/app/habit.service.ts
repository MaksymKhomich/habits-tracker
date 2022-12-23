import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habit } from './habbits';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  habits: Habit[] = JSON.parse(localStorage['habitList']);
  constructor() { }

  getHabits(): Observable<Habit[]>{
    return of(this.habits)
  }
}
