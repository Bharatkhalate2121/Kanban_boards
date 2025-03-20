import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project-dashboard/project.model';
import { Task } from './Task.model';
import { Todo } from './Todo.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {


    //for list of projects
    private storageKey = 'projects';
    private projectsSubject: BehaviorSubject<Project[]>;
    public projects$: Observable<Project[]>;

    //for tasks
    private tasksKey = 'taskskey';
    private taskList: BehaviorSubject<Task[]>;
    public tasks$: Observable<Task[]>;


    constructor() {

        //project list
        const savedProjects = localStorage.getItem(this.storageKey);
        const initialProjects: Project[] = savedProjects ? JSON.parse(savedProjects) : [];
        this.projectsSubject = new BehaviorSubject<Project[]>(initialProjects);
        this.projects$ = this.projectsSubject.asObservable();

        //tasklist
        const savedTasks = localStorage.getItem(this.tasksKey);
        const initialTasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];
        this.taskList = new BehaviorSubject<Task[]>(initialTasks);
        this.tasks$ = this.taskList.asObservable();

    }

    addProject(newProject: Project) {
        const currentProjects = this.projectsSubject.getValue();
        const updatedProjects = [...currentProjects, newProject];

        this.projectsSubject.next(updatedProjects);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
    }

    deleteProject(id: number) {
        const currentProjects = this.projectsSubject.getValue();
        const index = currentProjects.findIndex(project => project.id === id);
        currentProjects.splice(index, 1);

        localStorage.setItem(this.storageKey, JSON.stringify(currentProjects));
    }

    // addTask(newTask: Task) {
    //     const projectId = Number(localStorage.getItem('crntProjectKey'));
    //     const todoId = Number(localStorage.getItem('taskskey'));


    //     const currentProjects = this.projectsSubject.getValue();


    //     const projectIndex = currentProjects.findIndex((p: any) => p.id === projectId);
    //     if (projectIndex === -1) {
    //         console.error(`Project with ID ${projectId} not found.`);
    //         return;
    //     }


    //     const todoIndex = currentProjects[projectIndex]?.todoarray?.findIndex((t: any) => t.id === todoId);
    //     if (todoIndex === -1) {
    //         console.error(`Todo with ID ${todoId} not found in Project ${projectId}.`);
    //         return;
    //     }


    //     newTask.id = Math.floor(Math.random() * 1000);


    //     currentProjects[projectIndex].todoarray[todoIndex].tasks = [
    //         ...(currentProjects[projectIndex].todoarray[todoIndex].tasks || []),
    //         newTask
    //     ];


    //     this.projectsSubject.next([...currentProjects]);

    //     localStorage.setItem(this.storageKey, JSON.stringify(currentProjects));
    // }

    addTask(todoId: number, newTask: Task) {
        const projectId = Number(localStorage.getItem('crntProjectKey'));
        const currentProjects = this.projectsSubject.getValue();


        const projectIndex = currentProjects.findIndex((p: any) => p.id === projectId);
        if (projectIndex === -1) {
            console.error(`Project with ID ${projectId} not found.`);
            return;
        }


        const todoIndex = currentProjects[projectIndex]?.todoarray?.findIndex((t: any) => t.id === todoId);
        if (todoIndex === -1) {
            console.error(`Todo with ID ${todoId} not found in Project ${projectId}.`);
            return;
        }


        const targetTodo = currentProjects[projectIndex].todoarray[todoIndex];
        targetTodo.tasks = targetTodo.tasks || [];


        newTask.id = Math.floor(Math.random() * 1000);


        targetTodo.tasks.push(newTask);


        currentProjects[projectIndex].updatedAt = new Date().toLocaleDateString("en-GB");


        this.projectsSubject.next([...currentProjects]);


        localStorage.setItem(this.storageKey, JSON.stringify(currentProjects));
    }



    deleteTaskByIndex(index: number) {
        const currentTasks = this.taskList.getValue();
        currentTasks.splice(index, 1);
        localStorage.setItem(this.tasksKey, JSON.stringify(currentTasks));
    }

    addTodo(pId: number, todoTitle: string) {
        const currentProjects = this.projectsSubject.getValue();
        const index = currentProjects.findIndex(project => project.id === pId);


        if (index !== -1) {
            let id: number = Math.floor(Math.random() * 1000);
            localStorage.setItem(this.tasksKey, JSON.stringify(id));
            const newTodo = new Todo(id, todoTitle, []);
            currentProjects[index].updatedAt = new Date().toLocaleDateString("en-GB");
            (currentProjects[index].todoarray ??= []).push(newTodo);
            this.projectsSubject.next([...currentProjects]);
            localStorage.setItem(this.storageKey, JSON.stringify(currentProjects));
        }

    }

    updateProject(updatedProject: any) {
        localStorage.setItem('projectData', JSON.stringify(updatedProject));
        this.projectsSubject.next(updatedProject);
    }

    getProjectData() {
        return JSON.parse(localStorage.getItem('projectData') || '{}');
    }


}
