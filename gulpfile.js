'use strict';

const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffers = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();

sass.compiler = require('node-sass');

const src_dir = 'src/';
const dist_dir = 'dist/';

function css() {
  return src(src_dir + './sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(dist_dir + 'css'));
}

function copy() {
  src([
    src_dir + '*.php',
    src_dir + 'favicons/*'])
    .pipe(dest(dist_dir));
    src(src_dir + 'texts/*.php')
      .pipe(dest(dist_dir + 'texts'));
    src(src_dir + 'audio/*')
      .pipe(dest(dist_dir + 'audio'));
    src(src_dir + 'keyboards/*')
      .pipe(dest(dist_dir + 'keyboards'));
  return
}

function brows() {
  return browserify(src_dir + 'js/main.js')
    .bundle()
    .pipe(source('typesta.js'))
    .pipe(buffers())
    .pipe($.uglify())
    .pipe(dest(dist_dir + 'js'));
}

function img() {
  src(src_dir + 'img/**/*.{png,jpg,gif,svg}')
  .pipe(dest(dist_dir + 'img'));
  return
}

exports.default = parallel(css, copy, brows, img);
