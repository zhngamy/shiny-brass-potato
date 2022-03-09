
import * as vscode from 'vscode';
import * as fs from 'fs';
import { ToDoResult } from './toDoResult';
import { resourceLimits } from 'worker_threads';

const readline = require('readline');
const stream = require('stream');

async function scrapeFile() : Promise<ToDoResult[]> {
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
        var url = file.fsPath;
        var filename = url.substring(url.lastIndexOf('/')+1);
        searchStream("test"+counter, "todo").then(stream => {
            for(let res in stream){
                var result = new ToDoResult(counter++, filename, 2, res);
                resultArr.push(result);
            }
        });
    }
    return resultArr;
}

const searchStream = (filename:string, text:string):Promise<string[]> => { 
    return new Promise((resolve) => {
        const inStream = fs.createReadStream('file/' + filename + ".txt");
        const outStream = new stream;
        const rl = readline.createInterface(inStream, outStream);
        var result:string[];
        const regEx = new RegExp(text, "i");
        rl.on('line', function (line:string) {
            if (line && line.search(regEx) >= 0) {
                result.push(line);
            }
        });
        rl.on('close', function () {
            console.log('finished search', filename);
            resolve(result);
        });
    });

    //     const inStream = fs.createReadStream('file/' + filename + ".txt");
    //     const outStream = new stream;
    //     const rl = readline.createInterface(inStream, outStream);
    //     var result:string[];
    //     const regEx = new RegExp(text, "i");
    //     rl.on('line', function (line:string) {
    //         if (line && line.search(regEx) >= 0) {
    //             result.push(line);
    //         }
    //     });
    //     rl.on('close', function () {
    //         console.log('finished search', filename);
    //         return result;
    //     });

        
};

/*

    return new Promise((resolve) => {
        const inStream = fs.createReadStream('file/' + filename + ".txt");
        const outStream = new stream;
        const rl = readline.createInterface(inStream, outStream);
        var result:string[];
        const regEx = new RegExp(text, "i");
        rl.on('line', function (line:string) {
            if (line && line.search(regEx) >= 0) {
                result.push(line);
            }
        });
        rl.on('close', function () {
            console.log('finished search', filename);
            resolve(result);
        });
    });
    */

export default scrapeFile;