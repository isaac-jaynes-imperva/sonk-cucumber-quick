import * as vscode from 'vscode';
import {
	getSonkCucumberQuickObject,
	createCommandToExecuteFeature,
	executeCucumberQuickCommand,
	createCommandToExecuteScenario,
	getScenarioName,
	getSonkCucumberQuickScript,
} from './utils';
import { killActiveProcess } from './executeCommand';
import { ScenarioCodeLensProvider } from './scenarioCodeLensProvider';
import { FeatureCodeLensProvider } from './featureCodeLensProvider';

export let commandOutput: vscode.OutputChannel | null = null;

export function activate(context: vscode.ExtensionContext) {
	commandOutput = vscode.window.createOutputChannel('CucumberQuickRunnerLog');
	context.subscriptions.push(commandOutput);
	context.subscriptions.push(runScenarioDisposable);
	context.subscriptions.push(runFeatureDisposable);
	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider(
			{ language: 'feature', scheme: 'file', pattern: '**/*.feature' },
			new ScenarioCodeLensProvider()
		)
	);
	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider(
			{ language: 'feature', scheme: 'file', pattern: '**/*.feature' },
			new FeatureCodeLensProvider()
		)
	);
}

const runScenarioDisposable = vscode.commands.registerCommand('execute.scenario', () => {
	const sonkCucumberQuickObject = getSonkCucumberQuickObject();
	const sonkCucumberQuickScript: string = getSonkCucumberQuickScript(sonkCucumberQuickObject);
	const currentScenarioName: string = getScenarioName();
	const featureCommand: string = createCommandToExecuteFeature();
	const scenarioCommand: string = createCommandToExecuteScenario(currentScenarioName);
	if (commandOutput) {
		executeCucumberQuickCommand(sonkCucumberQuickScript, featureCommand + " " + scenarioCommand);
	} else {
		logErrorIfOutputNotDefined();
	}
});

const runFeatureDisposable = vscode.commands.registerCommand('execute.feature', () => {
	const sonkCucumberQuickObject = getSonkCucumberQuickObject();
	const sonkCucumberQuickScript: string = getSonkCucumberQuickScript(sonkCucumberQuickObject);
	const featureCommand: string = createCommandToExecuteFeature();
	if (commandOutput) {
		executeCucumberQuickCommand(sonkCucumberQuickScript, featureCommand);
	} else {
		logErrorIfOutputNotDefined();
	}
});

const logErrorIfOutputNotDefined = () => {
	vscode.window.showErrorMessage(
		`vs code output terminal not defined. Please ensure all required configuration. If npt solved, raise an issue here: https://github.com/isaac-jaynes-imperva/sonk-cucumber-quick/issues`
	);
	throw new Error('vs code output terminal not defined. Please ensure all required configuration.');
};
// This method is called when the extension is deactivated
export function deactivate() {
	if (commandOutput) {
		killActiveProcess(commandOutput);
	}
}
