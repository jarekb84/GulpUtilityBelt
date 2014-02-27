GulpUtilityBelt
================
Meant to run one off tasks on files not tied to a specific project. 

Put files in the **src** directory, run a task, see output in **dist** directory.

## Install
Enter the following commands in the terminal.

1. `git clone https://github.com/jarekb84/GulpUtilityBelt.git`
2. `cd GulpUtilityBelt`
3. `npm install`
4. `gulp`

## Tasks
- **default**: helper task that runs registeredTasks to show what's available
- **registeredTasks**: lists out all registered task
- **installedPlugins**: lists out all plugins registered by 'gulp-load-plugins'
- **clean**: deletes all files int he dist directory
- **imagemin**: Minify PNG, JPEG and GIF images in src directory
- **minifyCss**: minifies all css files in src directory
- **minifyJs**: runs uglify on all js files in src directory

## Changelog

**v1.0.2 released 2014-02-26**

* Added install instructions.

**v1.0.1 released 2014-02-26**

* Added .gitignore to src/dist directories to force repo to include those directories.

**v1.0.0 released 2014-02-26**

* Initial version with base set of tasks that I commonly use