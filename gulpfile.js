var gulp              = require('gulp');
var concat            = require("gulp-concat");
var uglify            = require('gulp-uglify');
var sass              = require('gulp-sass');
var ngHtml2Js         = require("gulp-ng-html2js");
var nodemon           = require("gulp-nodemon");

var postcss           = require('gulp-postcss');
var cssnano           = require('cssnano');
var postcssimport     = require('postcss-easy-import');

var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var processors = [];

var EXPRESS_PORT      = 4000;
var EXPRESS_ROOT      = __dirname;

/*
function startExpress() 
{
  var express = require('express');
  var app = express();
  app.use(express.static(EXPRESS_ROOT));

  app.use('/api', require('./api/routes/api'));
 
  app.listen(EXPRESS_PORT);
}
*/

gulp.task('browsersync', ['nodemon'], function() {
    
    browserSync.init({
      proxy: "http://localhost:8080",
      port: 7000,
    });

});

gulp.task('js', function () 
{
  gulp.src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function () 
{
    gulp.src("./src/**/*.html")
      .pipe(ngHtml2Js({
          moduleName: "templates",
      }))
      .pipe(concat("templates.js"))
      .pipe(gulp.dest('./public/js'));
});

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon({
    script: './server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });

});

gulp.task('js-vendor', function () 
{
  gulp.src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/lodash/lodash.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-jwt/dist/angular-jwt.js',
      './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('css-vendor', function () 
{
  gulp.src('./src/scss/vendor.scss')
    .pipe(sass({}))
    .pipe(postcss([postcssimport,cssnano]))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('vendor', ['js-vendor','css-vendor']);

// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', ['browsersync'],function () {

  //startExpress();
  gulp.watch(['./public/index.html']).on('change', reload);
  gulp.watch(['./src/**/*.html'], ['templates']).on('change', reload);
  gulp.watch(['./src/**/*.js'], ['js']).on('change', reload);

});