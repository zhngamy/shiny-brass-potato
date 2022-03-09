'use strict';

import { Panels } from '@vscode/webview-ui-toolkit';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Uri, workspace, WorkspaceFolder } from 'vscode';
import scrapeFile from './crawler/fileScraperNodeStream';
import { ToDoResult } from './crawler/toDoResult';
import { NodeDependenciesProvider } from './crawler/TreeDataProvider';
import { HelloWorldPanel } from './crawler/HelloWorldPanel';

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

		HelloWorldPanel.render(context.extensionUri, results);


		const panel = vscode.window.createWebviewPanel(
			'helloworld',
			'ToDo List',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);

		
		panel.webview.html = getWebviewContent(results);
		// vscode.window.showInformationMessage(`${results.length} file scraped.`);
	}));



	// if(vscode.workspace.workspaceFolders !== undefined) {
	// 	let wf = vscode.workspace.workspaceFolders[0].uri.path;

	// 	// const nodeDependenciesProvider = new NodeDependenciesProvider(wf);

	// 	// vscode.window.registerTreeDataProvider(
	// 	// 	'nodeDependencies',
	// 	// 	new NodeDependenciesProvider(wf)
	// 	// );

	// 	// vscode.commands.registerCommand(
	// 	// 	'nodeDependencies.refreshEntry', 
	// 	// 	() =>
	// 	//   	nodeDependenciesProvider.refresh()
	// 	// );

	// 	// vscode.window.createTreeView('nodeDependencies', {
	// 	// 	treeDataProvider: new NodeDependenciesProvider(wf)
	// 	// });
	// }
	// else {
	// 	var message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;
	
	// 	vscode.window.showErrorMessage(message);
	// }

	

	 
	// let path: string;
        // if (!vscode.workspace.workspaceFolders) {
        //     var path = vscode.workspace.workspaceFolders[0].uri;
        // } else {
        //     let root: vscode.WorkspaceFolder;
        //     if (vscode.workspace.workspaceFolders.length === 1) {
        //         root = vscode.workspace.workspaceFolders[0];
        //     } else {
        //         root = vscode.workspace.getWorkspaceFolder(resource);
        //     }

        //     path = root.uri.fsPath;
        // }

	// disposable.forEach(function (val){
	// 	context.subscriptions.push(val);
	// });
}




// this method is called when your extension is deactivated
export function deactivate() {}




function getWebviewContent (results: ToDoResult[]): string {

	return `<!DOCTYPE html>
		  <html lang="en">
			  <head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>Todo Task Manager</title>
			  </head>
			  <body>
				  <h1>${results.length} file scraped.</h1>
				  ${results.map(x => 
				`<input type="checkbox" checked required name="${x.toDoId}" value="${x.toDoId}"/> Checked + Required
				<label for="${x.toDoId}"> ${x.filename} </label>`
				)}
			
				<vscode-checkbox> vscode checkbox </vscode-checkbox>
			  </body>
		  </html>`;
  }

//   `<input type="checkbox" name="${x.toDoId}" value="${x.toDoId}"> 
//   <label for="${x.toDoId}"> ${x.filename} </label>`)}