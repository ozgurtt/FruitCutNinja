var gulp = require('gulp'),
	open = require('gulp-open'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),

	lr = require('tiny-lr'),
	path = require('path'),
	http = require('http'),
	server = lr(),
	connect = require('connect'),
	livereload = require('gulp-livereload');


gulp.task('jshint', function() {
	gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(livereload(server));
});


gulp.task('open', function() {
	gulp.src('./index.html').pipe(open('', {
		url: "http://localhost:9000",
	}));
});

gulp.task('sass', function() {
	gulp.src('./sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(livereload(server));
});

gulp.task('server', function() {

	var app = connect()
				.use(connect.static(path.resolve('.')))
				.use(connect.directory(path.resolve('.')));

	http.createServer(app).listen(9000);

	server.listen(35729, function(err) {
		if(err) return console.log(err);
	});

	gulp.watch('./*.html', function() {
		gulp.src('./*.html')
			.pipe(livereload(server));
	});

	gulp.watch('./js/*.js', function() {
		gulp.run('jshint');
	});	gulp.watch('./sass/*.scss', function() {
		gulp.run('sass');
	});

	gulp.watch('./sass/*.scss', function() {
		gulp.run('sass');
	});

	gulp.run('jshint', 'sass');
});