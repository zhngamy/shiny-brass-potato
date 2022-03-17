import * as vscode from "vscode";
import { ToDoResult } from "../shared/ToDoResult";

export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;

    this._panel.onDidDispose(this.dispose, null, this._disposables);

    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
  }

  public _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri,  ) {
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Todo Task Manager Extension</title>
        </head>
        <body>
				   wut even iz this
			  </body>
      </html>
    `;
  }

  public static render(extensionUri: vscode.Uri, results: ToDoResult[]) {
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "helloworld", 
        "Hello World", 
        vscode.ViewColumn.Two, {
        // Empty for now
          enableScripts: true
      });


      panel.webview.html = _getWebviewContent(results);
      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
      
    }
  }

  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}

function _getWebviewContent(results: ToDoResult[]): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Todo Task Manager Extension</title>
        </head>
        <body>
				    <h1>${results.length} file scraped.</h1>
				    ${results.map(x => 
				      `<vscode-checkbox checked required>Checked + Required</vscode-checkbox>`)}
			  </body>
      </html>
    `;
}
