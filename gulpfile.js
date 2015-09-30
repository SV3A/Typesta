var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffers = require('vinyl-buffer');

var src = 'src/';
var dist = 'dist/';
var localSite = 'http://svea.dev/typesta/dist/';

var autoprefixBrowsers = [
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

gulp.task('browser-sync', ['sass'], function() {
	browserSync.init({
		proxy: localSite
	});
	//gulp.watch("src/*.php").on('change', browserSync.reload);
});

gulp.task('browserify-js', function() {
	return browserify(src + 'js/main.js')
		.bundle()
		.pipe(source('typesta.js'))
		.pipe(buffers())
		.pipe($.uglify())
		.pipe(gulp.dest(dist + 'js'));
});

gulp.task('sass', function() {
	return gulp.src(src + 'sass/*.scss')
		.pipe($.plumber(plumberErrorHandler))
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([autoprefixer({
			browsers: autoprefixBrowsers
		})]))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(dist + 'css'))
		.pipe(browserSync.stream());
});

gulp.task('css-min', function() {
	return gulp.src(dist + 'css/typesta.css')
		.pipe($.uncss({
			html: [localSite, localSite + 'test.php']
		}))
		.pipe($.csso())
		.pipe($.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist + 'css'));
});

gulp.task('copy', function() {
	gulp.src([
			src + '*.php',
			src + 'favicons/*'
		])
		.pipe(gulp.dest(dist));
	gulp.src(src + 'texts/*.php')
		.pipe(gulp.dest(dist + 'texts'));
	gulp.src(src + 'audio/*')
		.pipe(gulp.dest(dist + 'audio'));
	gulp.src(src + 'keyboards/*')
		.pipe(gulp.dest(dist + 'keyboards'));
});

gulp.task('img', function() {
	gulp.src(src + 'img/**/*.{png,jpg,gif,svg}')
		.pipe($.plumber(plumberErrorHandler))
		.pipe($.imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe(gulp.dest(dist + 'img'));
});

gulp.task('watch', function() {
	gulp.watch(src + 'sass/**/*.scss', ['sass']);
	gulp.watch(src + 'img/**/*.{jpg,png,gif,svg}', ['img', browserSync.reload]);
	gulp.watch(src + '**/*.php', ['copy', browserSync.reload]);
	gulp.watch(src + '**/*.html', ['copy', browserSync.reload]);
	gulp.watch(src + 'js/**/*.js', ['browserify-js', browserSync.reload]);
});

var plumberErrorHandler = {
	errorHandler: $.notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

gulp.task('default', ['watch', 'sass', 'browserify-js', 'copy', 'browser-sync']);