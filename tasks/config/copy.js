/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {
	var versionDate = new Date();
	var timestamp = versionDate.getTime();
	grunt.config.set('copy', {
		dev: {
			files: [
        {
          expand: true,
          cwd: './bower_components',
          src: ['**/**/*.less'],
          dest: 'assets/vendor'
        },
        {
          expand: true,
          cwd: './bower_components',
          src: ['*/fonts/*'],
          dest: 'assets/vendor/fonts'
        },
        {
          expand: true,
          cwd: './bower_components/font-awesome',
          src: ['fonts/*'],
          dest: 'assets/vendor'
        },
        {
          expand: true,
          cwd: './bower_components/font-awesome/css',
          src: ['font-awesome.css'],
          dest: 'assets/vendor/font-awesome'
        },
        {
		  expand: true,
		  cwd: './assets',
		  src: ['**/*.!(coffee|less)'],
		  dest: '.tmp/public'
		},
		{
		 expand: true,
		 cwd: './bower_components/angular-ui-grid',
		 src: ['ui-grid.woff','ui-grid.ttf','ui-grid.svg','ui-grid.eot'],
		 dest: '.tmp/public/min'
		},
		{
		 expand: true,
		 cwd: './node_modules/',
		 src: ['@angular/**/bundles/*.js','zone.js/dist/*.js','typescript/**/*.js',
		 		'systemjs/dist/*.js','rxjs/**/*.js','core-js/client/*.js',
				 'angular-in-memory-web-api/bundles/*.js'],
		 dest: 'assets/components/js'
		}
      ]
		},
		rename: {
			files: [
				{
					expand: true,
					flatten: true,
					cwd: '.tmp/public/min',
					src: ['production.*.*'],
					dest: '.tmp/public/min/',
					rename: function(dest, src) {
					return dest + src.replace('production','production.v'+timestamp);
				}
				}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
