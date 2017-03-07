module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
    'clean:dev',
    'html2js:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
