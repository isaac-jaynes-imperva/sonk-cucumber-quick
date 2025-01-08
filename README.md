# Sonk Cucumber Quick

Sonk-Cucumber-Quick helps you to run cucumber scenario and features directly from vscode editor. You can simply right click on any feature file and choose the option from the context menu to run a specific scenario or the whole feature file.

## Setup Run Configuration

The extension needs to understand where the cucumber test-runner script specific to your test execution. Follow the steps below:

1. create settings.json file under .vscode folder (ignore if already created)
2. create sonk-cucumber-quick option for the specific script you are using. The configuration structure is shown below:

Keep in mind, when running a feature, the path to the feature will be appended to the end of the script, and when running a specific
scenario, --name="scenario name" will be appended to the end as well.

```ts
// .vscode > settings.json

{
  "sonk-cucumber-quick": {
		"script": "node relative-path/to/cucumber-runner-script.js"
	}
}


```

## Run Scenarios and Features

- Navigate to a specific .feature file
- Right click on any scenario name/ scenario outline name
- You can choose two options from the context menu - _Run Cucumber Scenario_ and _Run Cucumber Feature_
- If _Run Scenario_ is selected, only that specific scenario will be executed
- If _Run Feature_ is selected, the complete feature file will be executed
- The test execution will be performed in debug mode, so if can debug certain codes using breakpoints as well.

## Log Issues

Log your issues and feature request [here](https://github.com/isaac-jaynes-imperva/sonk-cucumber-quick/issues)

#### Thank you

If this plugin was helpful for you, you can give it a ★ Star on [GitHub](https://github.com/isaac-jaynes-imperva/sonk-cucumber-quick)

_Copyright &copy; 2025- [Isaac Jaynes](https://www.linkedin.com/in/isaac-m-jaynes/)_

_Copyright &copy; 2020- [Abhinaba Ghosh](https://www.linkedin.com/in/abhinaba-ghosh-9a2ab8a0/)_
