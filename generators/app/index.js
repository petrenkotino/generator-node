'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.option('skip-install', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Skip npm install'
    });
  },

  initializing: function() {
    this.props = {};
  },

  prompting: {
    greetings: function() {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the superb ' + chalk.red('Node') + ' generator!'
      ));
    },

    askForModuleName: function() {
      var done = this.async();

      var prompts = [{
        name: 'name',
        message: 'Module name',
        default: path.basename(process.cwd()),
        filter: _.kebabCase
      }];

      this.prompt(prompts, function(props) {
        this.props = _.extend(this.props, props);

        done();
      }.bind(this));
    },

    askFor: function() {
      var done = this.async();

      var prompts = [{
        name: 'main',
        message: 'Module main js file',
        default: 'server.js'
      }, {
        name: 'license',
        message: 'License',
        default: 'UNLICENSED'
      }, {
        name: 'description',
        message: 'Description'
      }, {
        name: 'author',
        message: 'What is your github username'
      }, {
        name: 'homepage',
        message: 'Project homepage url',
        default: 'https://github.com/' + this.props.name
      }, {
        name: 'githubUrl',
        message: 'GitHub url',
        default: 'git+https://github.com/' + this.props.name
      }, {
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        filter: _.words
      }];

      this.prompt(prompts, function(props) {
        this.props = _.extend(this.props, props);

        done();
      }.bind(this));
    }
  },

  writing: {
    app: function() {
      var package_json;

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          module_name: this.props.name,
          description: this.props.description,
          homepage: this.props.homepage,
          author: this.props.author,
          repository_url: this.props.githubUrl,
          keywords: [this.props.keywords],
          main: this.props.main,
          license: this.props.license
        }
      );

      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('README.md'), {
          module_name: this.props.name
        }
      );
    },

    setupEnv: function() {
      mkdirp('test', function(err) {
        if (err) {
          console.log('FIX THIS');
        }
      });
    },

    main: function() {
      this.fs.copy(
        this.templatePath('_main.js'),
        this.destinationPath(this.props.main)
      );
    }
  },

  default: function() {
    this.composeWith('node:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('node:lint', {}, {
      local: require.resolve('../lint')
    });

    //this.composeWith('node:logger', {}, {
    //  local: require.resolve('../logger')
    //});
  },

  install: function() {
    this.installDependencies({
        bower: false,
        skipInstall: this.options['skip-install']
      }
    );
  }
});
