import { Component } from '@angular/core';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../SharedService';
import { Project } from '../project-dashboard/project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  projectname: string = "";

  newProject: Project = new Project();
  constructor(
    private dialogRef: MatDialogRef<CreateProjectComponent>,
    private sharedService: SharedService
  ) { }

  closePopup() {
    this.dialogRef.close();
  }

  createProject(projectname: String) {
    this.newProject.id = Math.floor(Math.random() * 1000),
      this.newProject.name = this.projectname;
    this.newProject.createdAt = new Date().toLocaleDateString("en-GB");
    this.newProject.updatedAt = this.newProject.createdAt;
    this.sharedService.addProject(this.newProject);
    this.dialogRef.close();
  }

}
