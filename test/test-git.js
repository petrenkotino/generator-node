'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('node:git', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .on('end', done);
  });

  it('creates .gitignore', function () {
    assert.file('.gitignore');
  });

});
