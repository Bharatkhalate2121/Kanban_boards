import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../SharedService';
@Component({
  selector: 'app-move',
  imports: [FormsModule],
  templateUrl: './move.component.html',
  styleUrl: './move.component.css'
})
export class MoveComponent {
  fromTodoId: string = '';
  toTodoId: string = '';
  taskId: string = '';

  constructor(private sharedService: SharedService) { }

  @Output() taskMoved = new EventEmitter<{ fromTodoId: string, toTodoId: string, taskId: string }>();

  moveTask() {
    let allProjectsData = localStorage.getItem("projects");
    let projectIdString = localStorage.getItem("crntProjectKey");

    if (!allProjectsData || !projectIdString) {
      console.error("No projects or project ID found in localStorage");
      return;
    }

    let allProjects = JSON.parse(allProjectsData);
    let projectId = Number(projectIdString); // Ensure it matches the type in projects

    console.log("Retrieved projectId:", projectId);
    console.log("All projects:", allProjects);

    let project = allProjects.find((proj: any) => proj.id === projectId);
    if (!project) {
      console.error("Project not found!");
      return;
    }

    console.log("Found Project:", project);
    let fromTodoIdNum = Number(this.fromTodoId);
    let toTodoIdNum = Number(this.toTodoId);

    const fromTodo = project.todoarray.find((todo: any) => todo.id === fromTodoIdNum);
    const toTodo = project.todoarray.find((todo: any) => todo.id === toTodoIdNum);

    console.log("From Todo:", fromTodo);
    console.log("To Todo:", toTodo);

    if (!fromTodo || !toTodo) {
      console.error("Invalid Todo IDs:", this.fromTodoId, this.toTodoId);
      return;
    }

    let tsk = Number(this.taskId);
    const taskIndex = fromTodo.tasks.findIndex((task: any) => task.id === tsk);
    if (taskIndex === -1) {
      console.error("Task not found in fromTodo");
      return;
    }

    const task = fromTodo.tasks.splice(taskIndex, 1)[0];
    toTodo.tasks.push(task);

    localStorage.setItem("projects", JSON.stringify(allProjects));
    console.log("Task moved successfully!");

  }
}