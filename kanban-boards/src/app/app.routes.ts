import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AppComponent } from './app.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';

export const routes: Routes = [
    { path: '', component: ProjectDashboardComponent },
    { path: 'board', component: BoardComponent },


];
