'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function () {
    this.fs.copy(
      this.templatePath('_eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copy(
      this.templatePath('_eslintrc'),
      this.destinationPath('.eslintrc')
    );
  }
});
