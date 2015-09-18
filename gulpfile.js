var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = $.sass;
var postcss = $.postcss;
var autoprefixer = require("autoprefixer-core");
var sourcemaps = $.sourcemaps;
var csso = $.csso;
var jshint = $.jshint;
var concat = $.concat;
var uglify = $.uglify;
var imagemin = $.imagemin;
var plumber = $.plumber;
var notify = $.notify;
var rename = require("gulp-rename");
var uncss = require('gulp-uncss-task');

var AUTOPREFIXER_BROWSERS = [
  'last 2 versions',
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', function () {
	gulp.src('source/sass/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sourcemaps.init())
    	.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer({browsers: AUTOPREFIXER_BROWSERS}) ]))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(csso())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css/min'))
});

// Doesnt' work
gulp.task('clean', function () {
	return gulp.src('css/svea_jp.css')
        .pipe(uncss({
            html: ['test.html']
        }))
		.pipe(gulp.dest('./css/clean'))
});

gulp.task('js', function () {
	gulp.src('source/js_src/*.js')
		.pipe(plumber(plumberErrorHandler))
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
	gulp.src(['source/js_src/vendor/bootstrap/*.js','source/js_src/vendor/*.js','source/js_src/*.js'])
		.pipe(concat('svea.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('img', function() {
	gulp.src('source/img_src/*.{png,jpg,gif}')
		.pipe(plumber(plumberErrorHandler))
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
	gulp.watch('source/sass/**/*.scss', ['sass']);
	gulp.watch('source/js_src/**/*.js', ['js']);
	gulp.watch('source/img_src/*.{png,jpg,gif}', ['img']);
});

var plumberErrorHandler = { errorHandler: notify.onError({
	title: 'Gulp',
    message: 'Error: <%= error.message %>'
	})
};

gulp.task('default', ['sass', 'js', 'watch']);