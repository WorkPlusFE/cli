#workplus cli

> A simple CLI for scaffolding WorkPlus projects.

### Installation

```bash
[sudo] npm install -g workplus-cli
```

### Usage

#### 1.Create a new project

```bash
$ workplus start <template-name> <project-name>
```

Example:

```bash
$ workplus start webpack-framework7 my-project
```

The above command pulls the template from [workplus-templates/webpack-framework7](https://github.com/workplus-templates/webpack-framework7), prompts for some information, and generates the project at ./my-project/.

#### 2.Search templates

```bash
$ workplus list
```

All official project templates are repos in the [workplus-templates organization](https://github.com/workplus-templates). When a new template is added to the organization, you will be able to run workplus start <template-name> <project-name> to use that template. You can also run workplus list to see all available official templates.

Current available templates include:

* [demo7](https://github.com/workplus-templates/demo7) A starter project for using Framework7 with Webpack via Babel!
* [webpack-framework7](https://github.com/workplus-templates/webpack-framework7) 一个快速制作demo的framework7项目
* [webpack-vue](https://github.com/workplus-templates/webpack-vue) Webpack VueJs template.
* [gulp-angular](https://github.com/workplus-templates/gulp-angular) Angular starter project using gulp.


#### 3.Start a 'http-server' local static server

```bash
$ workplus server
```

workplus server base on 'http-server', [http-server](https://github.com/indexzero/http-server) is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

Available Options:

* -p Port to use (defaults to 8080)
* -a Address to use (defaults to 0.0.0.0)
* -P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com

### Template

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

### License

MIT
