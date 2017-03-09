/**
 * i18n filter
 */	
(function(angular, undefined) {
angular
	.module('invisionApp')

	.filter('i18n', [
		'localizationFactory',
		function (localize) {
			'use strict';
			
			function translate(text) {
				var translated;

				translated = localize.getLocalizedString(text);

				return translated
			}

			return function (text) {
				return translate(text);
			};
		}
	]);
})(window.angular);
