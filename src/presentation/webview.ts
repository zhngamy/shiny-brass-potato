import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

import { ToDoResult } from '../shared/ToDoResult';

const webview = (cssUri: vscode.Uri, results :ToDoResult[]) => {
	return `<!DOCTYPE html>
		  <html lang="en">
			  <head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>Todo Task Manager</title>
				  <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
    			  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
				  <link rel='stylesheet' href='`+ cssUri + `' />
				  <h1>${results.length} file scraped.</h1>
			  </head>
			  <body>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="table-wrap">
								<table class="table">
									<thead class="thead-primary">
										<tr>
											<th>&nbsp;</th>
											<th>Task Name</th>
											<th>File Name</th>
											<th>Line Number</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
									${results.map(x => 
									`
									<tr class="alert">
										<td>
											<label class="checkbox-wrap checkbox-primary">
												<input type="checkbox">
												<span class="checkmark"></span>
											</label>
										</td>
										<td>
											<div> ${x.todostatement} </div>
										</td>
										<td>
											<span> ${x.filename} </span>
										</td>
										<td>
											<span> ${x.linenumber} </span>
										</td>
										<td>
											<button type="button">
												<span>
													<i class="fa fa-close"></i>
												</span>
											</button>
										</td>
									</tr>`
									).join('')}
									</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
			  </body>
		  </html>`;
  };

  export default webview;