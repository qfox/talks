module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			compile: {
				files: {
					'styles/screen.css': 'styles/screen.scss'
				}
			}
		},
		autoprefixer: {
			prefix: {
				src: 'styles/screen.css'
			}
		},
		csso: {
			minify: {
				files: {
					'styles/screen.css' : 'styles/screen.css'
				},
				options: {
					banner: '/**\n * Dalee theme for Shower HTML presentation engine: github.com/shower/shower\n * Copyright © 2013–<%= grunt.template.today("yyyy") %> Alexej Yaroshevich, dalee.ru\n * Licensed under MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'csso']);

	grunt.registerTask('update-font', 'Reload and regenerate fonts', function () {
		var exec = require('child_process').exec;
		var done = this.async();

		exec('svn export https://github.com/tonsky/FiraCode/trunk/FiraCode-Regular.otf ./fonts/FiraCode-Regular.otf', function (error, stdout, stderr) {
			if (error) {
				console.error(stdout, stderr);
				return done(error);
			}
			exec('svn export https://github.com/tonsky/FiraCode/trunk/FiraCode-Regular.ttf ./fonts/FiraCode-Regular.ttf', function (error, stdout, stderr) {
				if (error) {
					console.error(stdout, stderr);
					return done(error);
				}
				exec('ttf2woff ./fonts/FiraCode-Regular.ttf ./fonts/FiraCode-Regular.woff', function (error, stdout, stderr) {
					if (error) {
						console.error(stdout, stderr);
						return done(error);
					}

					done();
				});
			});
		});
	});

};