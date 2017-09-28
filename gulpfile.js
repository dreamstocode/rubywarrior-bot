var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');

gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('build/js'));
});

gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(plumber())
        .pipe(mocha({ reporter: 'nyan' }))
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['test', 'build']);
    gulp.watch('test/**/*.js', ['test']);
});

gulp.task('default', ['test', 'build', 'watch']);