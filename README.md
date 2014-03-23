[![devDependency Status](https://david-dm.org/jarekb84/gulputilitybelt/dev-status.png)](https://david-dm.org/jarekb84/gulputilitybelt#info=devDependencies) [![Code Climate](https://codeclimate.com/github/jarekb84/GulpUtilityBelt.png)](https://codeclimate.com/github/jarekb84/GulpUtilityBelt)

GulpUtilityBelt
================
Meant to run one off tasks on files not tied to a specific project. 

Put files in the **src** directory, run a task, see output in **dist** 
directory.

## Install
Enter the following commands in the terminal.

1. `git clone https://github.com/jarekb84/GulpUtilityBelt.git`
2. `cd GulpUtilityBelt`
3. `npm install`
4. `gulp`

## Tasks
- `gulp` Lists out tasks supported (default task)   
- `gulp imagemin` Minify PNG, JPEG, and GIF images in src directory   
- `gulp processCss` Runs css files through autoprefixer, minifies, and adds .min to filename
    - add `--skipAutoPrefixer` to only minify code  
- `gulp processJs` Runs js files through uglify, jshint, and adds .min to filename
    - jsHint rules can be modified in .jshinttrc file ([options](http://www.jshint.com/docs/options)).

## Changelog
**v1.1.2 released 2014-03-23**

* Turned on optimizations on imagemin task to use lossless conversion to progressive for jpeg's and interlace gif's for progressive rendering.

**v1.1.1 released 2014-03-12**

* Added david-dm and codeclimate badges.
* Updated dependencies
* Added msg argument to be used in bump task to set git tag 

**v1.1.0 released 2014-03-12**

* Changed name of minifyCss and minifyJs tasks to processCss and processJs since they are now doing more then just minifying the contents.
* The processCss and processJs tasks now output files with .min
* ProcessCss task now runs css through autoprefixer
* ProcessJs task now runs js through jshint and outputs any errors found

**v1.0.4 released 2014-03-02**

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