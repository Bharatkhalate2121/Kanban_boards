import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterLink, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(private dialog: MatDialog) {

  }

  OpenPopup() {
    this.dialog.open(CreateProjectComponent, {
      width: '400px',
      height: '170px'
    })
  }
}
