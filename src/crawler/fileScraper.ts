import * as vscode from 'vscode';
import { ToDoResult } from './toDoResult';

async function scrapeFile() {
    var resultArr: ToDoResult[] = [];


    const files = await vscode.workspace.findFiles('**/*.html', '**/node_modules/**');

    if (files.length === 0){
        vscode.window.showWarningMessage('No file with the particular file formats were found'); 
    }

    vscode.window.showInformationMessage('# of files', files.length.toString());

    //get all files in workspace
    //read all files and look for certain keyword
    for (let file of files){
        
        //todo: parse out filename from file url
        vscode.workspace.fs.readFile((vscode.Uri.file(file.fsPath.toString())));

        var result = new ToDoResult(file.fsPath.toString(), 2, "todostatement");
        resultArr.push(result);

        // find todo keyword in file
    }	

    return resultArr;
}

export default scrapeFile;