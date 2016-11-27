/*jshint node: true */

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				banner: "",
			},
			dist: {
				src: [
					'lib/start.frag',
					'lib/Smileystore.js',
					'lib/Parser.js',
					'lib/main.js',
					'lib/end.frag'
				],
				dest: 'dist/jquery.emojicomplete.js'
			}
		},

		uglify: {
			options: {
				banner:
					'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
				sourceMap: 'dist/jquery.textcomplete.min.map'
			},
			all: {
				files: {
					'dist/jquery.textcomplete.min.js': [
						'dist/jquery.textcomplete.js'
					]
				}
			}
		},

		watch: {
			all: {
				files: ['src/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('build', ['concat']);
};
