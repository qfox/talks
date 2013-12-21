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
					banner: '/**\n * Dalee theme for Shower HTML presentation engine: github.com/shower/shower\n * Copyright © 2013–<%= grunt.template.today("yyyy") %> Vadim Makeev, pepelsbey.net\n * Licensed under MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'csso']);

};