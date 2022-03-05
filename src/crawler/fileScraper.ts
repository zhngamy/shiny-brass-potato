import { countReset } from 'console';
import * as vscode from 'vscode';
import { ToDoResult } from './toDoResult';

async function scrapeFile() {
    var resultArr: ToDoResult[] = [];


    const files = await vscode.workspace.findFiles('**/*.html', '**/node_modules/**');

    if (files.length === 0){
        vscode.window.showWarningMessage('No file with the particular file formats were found'); 
    }

    vscode.window.showInformationMessage('# of files', files.length.toString());

    var counter = 0;
    //get all files in workspace
    //read all files and look for certain keyword
    for (let file of files){
        
        const currentFilePath = vscode.workspace.asRelativePath(
            vscode.Uri.file(file.fsPath.toString())
        );

        //todo: parse out filename from file url
        vscode.workspace.fs.readFile((vscode.Uri.file(file.fsPath.toString())));

        await vscode.commands.executeCommand("workbench.action.findInFiles", {
            // find todo comment to query
            query: "todo",
            filesToInclude: currentFilePath
        });


        var result = new ToDoResult(counter++, file.fsPath.toString(), 2, "todostatement");
        resultArr.push(result);

        // find todo keyword in file
    }	

    return resultArr;
}

export default scrapeFile;