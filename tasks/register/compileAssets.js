module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'bower:install',
		'clean:dev',
    'html2js:dev',
    'copy:dev',
    'less:dev',
		'coffee:dev'
	]);
};
