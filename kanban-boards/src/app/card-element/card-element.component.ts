import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../Task.model';
import { SharedService } from '../SharedService';

@Component({
  selector: 'app-card-element',
  imports: [],
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.css'
})
export class CardElementComponent {

  constructor(private sharedService: SharedService) { }
  @Output() taskAdded = new EventEmitter<{ title: string; description: string }>();
  addTask(title: string, description: string) {
    if (!title.trim() || !description.trim()) {
      console.warn("Task title and description cannot be empty!");
      return;
    }

    // Emit task details
    this.taskAdded.emit({ title, description });
  }

}

// saveTask(task: Task) {
//   this.sharedService.addTask(task);
// }


// deleteTask(index: number) {
//   this.sharedService.deleteTaskByIndex(index);
// }


