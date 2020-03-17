# w6s cli [![npm version](https://badge.fury.io/js/%40w6s%2Fcli.svg)](https://badge.fury.io/js/%40w6s%2Fcli)

> A CLI for scaffolding starter projects.

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x preferred) and npm.

```bash
[sudo] npm install -g @w6s/cli
```

### Usage

#### 1. Create a new project

```bash
$ w6s clone <template-name> <project-name>
```

Example:

```bash
$ w6s clone webpack-framework7 my-project
```

The above command pulls the template from [workplus-templates/webpack-framework7](https://github.com/workplus-templates/webpack-framework7), prompts for some information, and generates the project at ./my-project/.

#### 2. Templates list

```bash
$ w6s list
```

All official project templates are repos in the [workplus-templates organization](https://github.com/workplus-templates). When a new template is added to the organization, you will be able to run `w6s clone  <template-name> <project-name>` to use that template. You can also run `w6s list` to see all available official templates.

Current available templates include:

* [f7-vue](https://github.com/workplus-templates/f7-vue) Framework7 Vue Webpack starter app template.
* [rollup-starter](https://github.com/workplus-templates/rollup-starter) Sample project for packages built using rollup.!
* [single-page](https://github.com/workplus-templates/single-page) Single-page starter project, include webpack, less, babel.
* [multiple-pages](https://github.com/workplus-templates/multiple-pages) Multiple pages starter project.


#### 3. Start a 'http-server' local static server

```bash
$ w6s server
```

w6s server base on 'http-server', [http-server](https://github.com/indexzero/http-server) is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

Available Options:

* -p Port to use (defaults to 8080)
* -a Address to use (defaults to 0.0.0.0)
* -P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com

### Writing Custom Template

A template repo must have a `template` directory that holds the template files, and may have a metadata file for the template which can be a `template.json` file.

```json
{
    "name": "webpack-framework7",
    "description": "A starter project for using Framework7 with Webpack via Babel!",
    "bash": ["npm install", "npm run dev"],
    "readme": "https://github.com/workplus-template/webpack-framework7#readme"
}
```

* name: default value of the project name. It use for prompt process.
* description: default value of the project description. It use for prompt process.
* bash: log starter message after project generated.
* readme: log documentation link after project generated.

All files inside `template` will be rendered using `underscore`, with the prompt results as the data.

Example:

```html
<title><%= name %></title>
```
### Development

```bash
npm install
bin/w6s clone <template-name> [project-name]
bin/w6s list
bin/w6s server
```

### License

MIT
