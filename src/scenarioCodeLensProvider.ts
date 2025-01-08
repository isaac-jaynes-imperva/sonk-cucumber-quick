import * as vscode from 'vscode';

export class ScenarioCodeLensProvider implements vscode.CodeLensProvider {

    onDidChangeCodeLenses?: vscode.Event<void> | undefined;

    provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] {
        const codeLenses: vscode.CodeLens[] = [];
        const regex = /^\s*Scenario:\s*(.*)/;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const matches = regex.exec(line.text);

            if (matches) {
                const range = new vscode.Range(line.range.start, line.range.end);
                codeLenses.push(
                    new vscode.CodeLens(range, {
                        title: '▶️ Run Scenario',
                        command: 'execute.scenario',
                        arguments: [matches[1]]
                    })
                );
            }
        }

        return codeLenses;
    }
}