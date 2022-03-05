
export class ToDoResult {
    toDoId: number;
    filename: string;
    linenumber: number;
    todostatement: string;
    
    constructor(
        toDoId: number,
        filename: string, 
        linenumber: number, 
        todostatement: string) {

        this.toDoId = toDoId;
        this.filename = filename;
        this.linenumber = linenumber;
        this.todostatement = todostatement;
    }
}


