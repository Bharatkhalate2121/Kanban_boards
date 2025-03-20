import { Component, OnInit } from '@angular/core';
import { SharedService } from '../SharedService';
import { Project } from './project.model';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-project-dashboard',
  imports: [RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent implements OnInit {

  private crntProject = 'crntProjectKey';
  openProject(pId: number) {
    localStorage.setItem(this.crntProject, pId.toString());
    //this.sharedService.addTodo(pId, "trial");
  }
  deleteProject(pId: number) {
    console.log(pId);
    this.sharedService.deleteProject(pId);
  }

  projects: Project[] = [];
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.projects$.subscribe(updatedProjects => {
      this.projects = updatedProjects;
    });
  }

}
