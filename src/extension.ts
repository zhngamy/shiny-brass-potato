'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import scrapeFile from './crawler/fileScraperNodeStream';
import { ToDoResult } from './shared/ToDoResult';
import { HelloWorldPanel } from './crawler/HelloWorldPanel';
import path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ToDo List" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	var disposable= new Array();
	disposable.push(vscode.commands.registerCommand('SBP.TodoList', async () => {
		var results = await scrapeFile();

		const panel = vscode.window.createWebviewPanel(
			'todoList',
			'ToDo List',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);
		
		// Get path to resource on disk
		const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'css', 'styles.css'));
		const cssUri = panel.webview.asWebviewUri(onDiskPath);
		// And get the special URI to use with the webview
		panel.webview.html = getWebviewContent(cssUri, results);
		console.log(panel.webview.html);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent (uri: vscode.Uri, results: ToDoResult[]): string {
	return `<!DOCTYPE html>
		  <html lang="en">
			  <head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <link rel='stylesheet' href='`+ uri + `' />
				  <title>Todo Task Manager</title>
			  </head>
			  <body>
				  <h1>${results.length} file scraped.</h1>
				  ${results.map(x => 
				`<div class="list-element">
					<div>
						<input type="checkbox" required name="${x.toDoId}" value="${x.toDoId}"/>
						<label for="${x.toDoId}"> ${x.todostatement} </label>
					</div>
					<div><span>${x.linenumber}</span></div>
					<div><span>${x.filename}</span></div>
				 </div>`
				)}
			  </body>
		  </html>`;
  }

//   `<input type="checkbox" name="${x.toDoId}" value="${x.toDoId}"> 
//   <label for="${x.toDoId}"> ${x.filename} </label>`)}