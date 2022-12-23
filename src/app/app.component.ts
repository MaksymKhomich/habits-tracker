import { Component } from '@angular/core';
import { Habit } from './habbits';
import { FormControl, FormGroup } from '@angular/forms';
import { HabitService } from './habit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Habit tracker';

  
  adding = false;
  editing = false;
  editingIndex!: number;

  habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });
  
  habits!: Habit[];
  
  constructor(
    private habitService: HabitService,
  ){}

  ngOnInit(){
    if(!localStorage['habitList']){
      localStorage.setItem('habitList','[]')
    }
    this.habitService.getHabits().subscribe(data => this.habits = data)
  }

  onSubmit() {
    const habit = this.habitForm.value as Habit;

    if (this.editing) {
      this.habits.splice(this.editingIndex, 1, habit);
    } else {
      this.habits.push(habit);
    }
    
    this.editing = false;
    this.adding = false;
    this.exitForm();
    localStorage.setItem('habitList', JSON.stringify(this.habits));
  }

  setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  onDelete(index: number) {
    this.habits.splice(index, 1);
    localStorage.setItem('habitList', JSON.stringify(this.habits));
  }

  exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }
}
