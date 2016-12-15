/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

	grunt.config.set('clean', {
		options: { force: true },
		dev: ['.tmp/public/**'],
		build: ['www'],
		rename: {
				src: [".tmp/public/min/production.min.js",".tmp/public/min/production.min.css"]
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};
