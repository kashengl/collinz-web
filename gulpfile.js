var gulp = require('gulp');
var less = require('gulp-less'); 
var minifyCss = require('gulp-minify-css');
var minifyJs = require('gulp-uglify');
var rename = require('gulp-rename');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
 
 
/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./src/new-main.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./css'));
}); 

gulp.task('minify-js', function () {
    gulp.src('./js/main.js') // path to your files
    .pipe(minifyJs())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./js'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./src/new-main.less' , ['compile-less']);
});
 
gulp.task('watch-js', function() {  
  gulp.watch('./js/main.js' , ['minify-js']);
});
 

gulp.task('serve', function () {
 
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); 
    gulp.watch("./src/new-main.less").on("change", reload);
    gulp.watch("./*.html").on("change", reload);
});
 
/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'watch-js','serve']);
// gulp.task('default', ['watch-less']);

//compile old css
gulp.task('compile-css', function() {  
  gulp.src('./css/main.css')
    .pipe(minifyCss())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./css'));
}); 