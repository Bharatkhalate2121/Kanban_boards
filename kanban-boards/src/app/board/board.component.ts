import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '../SharedService';
import { Project } from '../project-dashboard/project.model';
import { CardElementComponent } from '../card-element/card-element.component';
import { Todo } from '../Todo.model';
import { Task } from '../Task.model';
import { MoveComponent } from '../move/move.component';


@Component({
  selector: 'app-board',
  imports: [CardComponent, CommonModule, CardElementComponent, MoveComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {

  todos: Todo[] = [];
  showComponent = false;
  crnt_id: number = 0;
  project: Project | null = null;

  @Input() heading: string = '';

  selectedTodoId: any;

  constructor(private sharedService: SharedService) { }


  addToDo(heading: string) {
    this.crnt_id = parseInt(localStorage.getItem('crntProjectKey') || '0', 10);
    this.showComponent = !this.showComponent;
    this.sharedService.addTodo(this.crnt_id, heading);
  }

  ngOnInit(): void {
    this.fetchProject();
    this.selectedTodoId = Number(localStorage.getItem('selectedTodoKey')) || null;
  }

  fetchProject() {
    const projectId = Number(localStorage.getItem('crntProjectKey'));
    if (!projectId) {
      console.error("No project ID found in localStorage!");
      return;
    }

    this.sharedService.projects$.subscribe(projects => {
      this.project = projects.find(p => p.id === projectId) || null;

      if (!this.project) {
        console.error(`Project with ID ${projectId} not found!`);
      }
    });
  }

  fetchTodos() {
    const projectId = Number(localStorage.getItem('crntProjectKey'));
    this.sharedService.projects$.subscribe(projects => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        this.todos = project.todoarray || [];
      }
    });
  }


  editToDo(todoId: number) {
    if (this.selectedTodoId === todoId) {
      this.selectedTodoId = null;
      localStorage.removeItem('selectedTodoKey');
    } else {
      this.selectedTodoId = todoId;
      localStorage.setItem('selectedTodoKey', todoId.toString()); // Store todo ID
    }
  }

  addTaskToTodo(tId: number, taskData: { title: string; description: string }) {
    if (!tId || !taskData.title.trim() || !taskData.description.trim()) {
      console.warn("Invalid task data!");
      return;
    }

    const newTask = new Task(taskData.title, taskData.description);

    this.sharedService.addTask(tId, newTask);

  }
  deleteToDo(arg0: number | undefined) {

  }

}
