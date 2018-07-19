var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var mergeStream = require('merge-stream');

gulp.task('update:clay', function() {
	runSequence(
		'clean:clay',
		'copy:clay'
	);
});

gulp.task('clean:clay', function() {
	return del([
		'src/**/**/*',
		'src'
	]);
});

gulp.task('copy:clay', function() {
	var images = gulp.src('../lexicon/src/images/**/*')
		.pipe(gulp.dest('./src/images'));

	var js = gulp.src('../lexicon/src/js/*.js')
		.pipe(gulp.dest('./src/js'));

	var atlas = gulp.src('../lexicon/src/scss/atlas-theme/**/*')
		.pipe(gulp.dest('./src/scss/atlas-theme'));

	var bootstrap = gulp.src('../lexicon/src/scss/bootstrap/**/*')
		.pipe(gulp.dest('./src/scss/bootstrap'));

	var base = gulp.src('../lexicon/src/scss/lexicon-base/**/*')
		.pipe(gulp.dest('./src/scss/lexicon-base'));

	var scss = gulp.src('../lexicon/src/scss/*.scss')
		.pipe(gulp.dest('./src/scss'));

	return mergeStream(images, js, atlas, bootstrap, base, scss);
});