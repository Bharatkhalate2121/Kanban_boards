import { AfterViewInit, Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CardElementComponent } from '../card-element/card-element.component';
import { Task } from '../Task.model';
import { CommonModule } from '@angular/common';
import { SharedService } from '../SharedService';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardElementComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {


  constructor(private sharedService: SharedService) { }

  showComponent = false;



  @ViewChild('container', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;

  @ViewChild(CardElementComponent) cardElementComponent!: CardElementComponent;

  tasks: Task[] = [];
  private indexCounter = 0;



  addTask() {
    // if (!this.container) return;
    //const componentRef: ComponentRef<CardElementComponent> = this.container.createComponent(CardElementComponent);
    this.showComponent = !this.showComponent;
  }

  ngOnInit() {
    this.sharedService.tasks$.subscribe(updatedTasks => {
      this.tasks = updatedTasks;
    })
  }

  clearTasks() {
    this.container.clear();
  }

  deleteTask(arg0: number) {
    this.sharedService.deleteTaskByIndex(arg0);
  }

}
