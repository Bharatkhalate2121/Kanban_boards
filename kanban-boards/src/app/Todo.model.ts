import { Task } from "./Task.model";

export class Todo {
    public id?: number;
    public title?: string;
    public tasks?: Task[];

    constructor(id: number, title: string, tasks: Task[]) {
        this.id = id,
            this.title = title;
        this.tasks = tasks;
    }
}