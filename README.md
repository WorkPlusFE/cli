#workplus cli

> A simple CLI for scaffolding WorkPlus projects.

### Installation

```bash
[sudo] npm install -g workplus-cli
```

### Usage

#### Create a new project:

```bash
$ workplus start <template-name> <project-name>
```

Example:

```bash
$ workplus start demo7 my-project
```

The above command pulls the template from workplus-templates/demo7, prompts for some information, and generates the project at ./my-project/.

#### Search available official templates:

```bash
$ workplus list
```

#### Start a 'http-server' local static server:

```bash
$ workplus server
```

### License

MIT
