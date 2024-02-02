import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';

const sassCompiler = gulpSass(sass);

gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.jsx', gulp.series('scripts'));
    gulp.watch('src/**/*.scss', gulp.series('styles'));
    gulp.watch('src/**/*.html', gulp.series('html'));
});

gulp.task('default', gulp.parallel('html', 'styles', 'scripts', 'watch'));