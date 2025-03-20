import { Todo } from "../Todo.model";
export class Project {

    constructor(public id?: number,
        public name?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public todoarray: Todo[] = []
    ) { }

}