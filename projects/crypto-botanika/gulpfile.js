'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const watch = require('gulp-watch');

const config = {
  appFolder: 'app/',
  distFolder: 'dist/',
  port: 8000
};

gulp.task('styles', function ( ) {
  return gulp.src(config.appFolder + 'styles/main.scss')
    .pipe(sass({
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(gulp.dest(config.distFolder + 'css'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['build'], function( ) {
  browserSync({
    notify: false,
    port: config.port,
    open: false,
    server: {
      baseDir: [config.distFolder, config.appFolder],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch([
    config.appFolder + '*.html',
  ]).on('change', reload);

  gulp.watch([config.appFolder + 'styles/**/*.scss'], ['styles']);
});

gulp.task('clean', require('del').bind(null, [config.distFolder]));

gulp.task('build', ['styles']);

gulp.task('default', ['serve']);
