'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('node:lint', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/lint'))
      .on('end', done);
  });

  it('creates .eslintignore', function () {
    assert.file('.eslintignore');
  });

  it('creates .eslintrc', function () {
    assert.file('.eslintrc');
  });

});
