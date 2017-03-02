const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const del = require('del');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

gulp.task('del-build', () => del('build/*'));

gulp.task('build-es7', ['del-build'], () => gulp.src('src/**/*.js').pipe(gulpBabel({ presets: ['env']})).pipe(gulp.dest('build')));

gulp.task('test-all', ['build-es7-with-source-maps'], () =>
    gulp.src('build/test/**/*.js', {read: false})
        .pipe(mocha({
            require : ['source-map-support/register']
        }))

);

gulp.task('build-es7-with-source-maps', ['del-build'], () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(gulpBabel({ presets: ['env']}))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src')}))
        .pipe(gulp.dest('build'))
);