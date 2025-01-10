import * as vscode from 'vscode';
import * as fs from 'fs';
import { startProcess } from './executeCommand';

const workspaceFolder: vscode.Uri | any = vscode.window.activeTextEditor?.document.uri;

interface SonkCucumberQuickConfiguration {
	script: string;
}

/**
 * Collect cucumber-quick configuration object from .vscode/settings.json
 */
export const getSonkCucumberQuickObject = (): SonkCucumberQuickConfiguration => {
	let quickConfiguration: SonkCucumberQuickConfiguration;
	try {
		quickConfiguration = JSON.parse(
			fs.readFileSync(
				`${vscode.workspace.getWorkspaceFolder(workspaceFolder)?.uri.fsPath}/.vscode/settings.json`,
				'utf8'
			)
		)['sonk-cucumber-quick'];
	} catch (err) {
		vscode.window.showErrorMessage('unable to read sonk-cucumber-quick configuration '+ (err as any).message);
		throw new Error(err as any);
	}

	if (quickConfiguration) {
		return quickConfiguration;
	} else {
		vscode.window.showErrorMessage('sonk-cucumber-quick configuration not found in .vscode/settings.json');
		throw new Error('sonk-cucumber-quick configuration not found in .vscode/settings.json');
	}
};

/**
 * get script information from configuration
 * @param sonkCucumberQuickConfig
 */
export const getSonkCucumberQuickScript = (sonkCucumberQuickConfig: SonkCucumberQuickConfiguration): string =>
	sonkCucumberQuickConfig.script;

/**
 * execute the command in the active vscode terminal
 * @param script
 * @param command
 */
export const executeCucumberQuickCommand = (script: string, command: string) => {
	const executableCommand: string = `${script} ${command}`;

	startProcess(executableCommand);
};

/**
 * create active terminal if not exists
 */
const getActiveTerminal = () => {
	return vscode.window.activeTerminal ? vscode.window.activeTerminal : vscode.window.createTerminal('cucumber-quick');
};

/**
 * This method helps to determine if the selected text is a valid scenario name
 * This method will throw error if user selects any line except Scenario or Scenario outline
 */
export const getScenarioName = (codeLensLine?: number) => {
	const selectedLine: string | undefined = vscode.window.activeTextEditor?.document.lineAt(
		codeLensLine ? codeLensLine : vscode.window.activeTextEditor.selection.active.line
	).text;

	if (selectedLine?.includes('Scenario')) {
		return selectedLine
			.replace(/(Scenario:|Scenario Outline:)/, '')
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '');
	} else if (selectedLine?.includes('@')) {
		return selectedLine.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	} else {
		vscode.window.showErrorMessage(
			`Incorrect line selected: ${selectedLine}.\n Please select Scenario or Scenario Outline`
		);
		throw new Error('Scenario Name incorrect. Please select scenario');
	}
};

/**
 * create command needed for specific scenario execution
 * @param scenarioName
 */
export const createCommandToExecuteScenario = (scenarioName: string): string => {
	return `"${scenarioName}"`;
};

/**
 * create command needed for specific feature execution
 */
export const createCommandToExecuteFeature = (): string => {
	const currentFeatureFilePath: string | undefined = vscode.window.activeTextEditor?.document.uri.fsPath;

	return currentFeatureFilePath || "";
};
