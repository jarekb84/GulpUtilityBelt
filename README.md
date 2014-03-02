GulpUtilityBelt
================
Meant to run one off tasks on files not tied to a specific project. 

Put files in the **src** directory, run a task, see output in **dist** 
directory.

<!-- MarkdownTOC depth=2 -->

- Install
- Tasks
- Changelog

<!-- /MarkdownTOC -->


## Install
Enter the following commands in the terminal.

1. `git clone https://github.com/jarekb84/GulpUtilityBelt.git`
2. `cd GulpUtilityBelt`
3. `npm install`
4. `gulp`

## Tasks
`gulp` Lists out tasks supported (default task)   
`gulp imagemin` Minify PNG, JPEG, and GIF images in src directory   
`gulp minifyCss` Minifies all css files in src directory 'gulp'   
`gulp minifyJs` Runs uglify on all js files in src directory   

## Changelog

**v1.0.4 rleased 2014-03-02**

* Cleanup of commented out code
* Reordred code to put utility tasks up top and dev tasks at bottom of file
* Reformatting/cleanup of readme
* Hid internally used tasks when running `gulp` command. Mostly tasks that help me with development of this tool, that don't need to be exposed when using it.
    - registeredTasks, installedPlugins, clean, bump removed
* added dev task that bumps package.json and creates a git tag

**v1.0.3 released 2014-02-26**

* Added bump to increment version numbers, nomnom and gulp-if to pass in cmd agruments to bump.

**v1.0.2 released 2014-02-26**

* Added install instructions.

**v1.0.1 released 2014-02-26**

* Added .gitignore to src/dist directories to force repo to include those directories.

**v1.0.0 released 2014-02-26**

* Initial version with base set of tasks that I commonly use