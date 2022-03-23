
import * as vscode from 'vscode';
import * as fs from 'fs';
import { ToDoResult } from '../shared/ToDoResult';
import { ScrapedLineResult } from './ScrapedLineResult';

const readline = require('readline');
const stream = require('stream');

async function scrapeFile() : Promise<ToDoResult[]> {
    var resultArr: ToDoResult[] = [];


    const files = await vscode.workspace.findFiles(GetIncludedProperties(), GetExcludeProperties());

    if (files.length === 0){
        vscode.window.showWarningMessage('No file with the particular file formats were found'); 
    }

    vscode.window.showInformationMessage('# of files', files.length.toString());

    //get all files in workspace
    //read all files and look for certain keyword
    for (let file of files){
        
        const currentFilePath = vscode.workspace.asRelativePath(
            vscode.Uri.file(file.fsPath.toString())
        );

        //todo: parse out filename from file url
        var url = file.fsPath;
        var filename = url.substring(url.lastIndexOf('/')+1);
        var result = await searchFile(url, "todo");
        
        for(var i = 0; i < result.length; i++) {
            var todo = new ToDoResult(i + 1, filename, result[i].lineNumber, result[i].lineValue);
            resultArr.push(todo);
        }
        
    }
    return resultArr;
}

async function searchFile(infilename:string, text:string):Promise<ScrapedLineResult[]> { 
    const inStream = fs.createReadStream(infilename);
    const outStream = new stream;
    const rl = readline.createInterface({ input: inStream, crlfDelay: Infinity });
    var result:ScrapedLineResult[] = [];
    const regEx = new RegExp(text, "i");
    var i = 1;
    for await (const line of rl) {
        if (line && line.search(regEx) >= 0) {
            var cleansed = line.replace(/[|&;$%@"<>()+,]/g, "");
            result.push(new ScrapedLineResult(i, cleansed.trim()));
        }
        i++;
    }

    return result;
}

const GetIncludedProperties = (): string => {
    return '{**/*.js*,**/*.html*,**/*.ts*}';
};

const GetExcludeProperties = (): string => {
    return '{**/node_modules/**,*.json,**/.*/**}';
};

    //     const inStream = fs.createReadStream('file/' + filename + ".txt");
    //     const outStream = new stream;
    //     const rl = readline.createInterface(inStream, outStream);
    //     var result:string[];
    //     const regEx = new RegExp(text, "i");
    //     rl.on('lipzne', function (line:string) {
    //         if (line && line.search(regEx) >= 0) {
    //             result.push(line);
    //         }
    //     });
    //     rl.on('close', function () {
    //         console.log('finished search', filename);
    //         return result;
    //     });

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