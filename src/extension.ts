'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import scrapeFile from './crawler/fileScraperNodeStream';
import { ToDoResult } from './shared/ToDoResult';
import { HelloWorldPanel } from './crawler/HelloWorldPanel';
import path = require('path');
import webview from './presentation/webview';

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
		const cssDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'css', 'styles.css'));
		const cssUri = panel.webview.asWebviewUri(cssDiskPath);

		const jsDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'js', 'app.js'));
		const jsUri = panel.webview.asWebviewUri(jsDiskPath);

		// And get the special URI to use with the webview
		panel.webview.html = webview(cssUri, jsUri, results);
		console.log(panel.webview.html);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

//   `<input type="checkbox" name="${x.toDoId}" value="${x.toDoId}"> 
//   <label for="${x.toDoId}"> ${x.filename} </label>`)}