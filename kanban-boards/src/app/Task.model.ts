export class Task {
    public id?: number;
    public title?: string;
    public description?: string;

    constructor(title: string, description: string) {
        this.id = Math.floor(Math.random() * 1000),
            this.title = title;
        this.description = description
    }
}