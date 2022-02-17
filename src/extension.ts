// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import scrapeFile from './crawler/fileScraper';
import { ToDoResult } from './crawler/toDoResult';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	var disposable= new Array();
	disposable.push(vscode.commands.registerCommand('helloworld.helloWorld', async () => {
		var results = await scrapeFile();

		vscode.window.showInformationMessage(`${results.length} file scraped.`);
	}));

	disposable.forEach(function (val){
		context.subscriptions.push(val);
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}




