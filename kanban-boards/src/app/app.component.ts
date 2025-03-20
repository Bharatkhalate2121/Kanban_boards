import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProjectDashboardComponent, CardComponent, BoardComponent, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanban-boards';
  showPopup = false;

  openModal() {
    this.showPopup = true;
  }

  closeModal() {
    this.showPopup = false;
  }

}
