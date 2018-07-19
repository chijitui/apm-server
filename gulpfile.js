const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('scripts', function () {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./output'));
});