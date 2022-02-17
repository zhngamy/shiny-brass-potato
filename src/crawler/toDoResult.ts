
export class ToDoResult {
    filename: string;
    linenumber: number;
    todostatement: string;
    
    constructor(
        filename: string, 
        linenumber: number, 
        todostatement: string) {

        this.filename = filename;
        this.linenumber = linenumber;
        this.todostatement = todostatement;
    }
}


