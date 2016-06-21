/**
 * Localization factory
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.factory('localizationFactory', [
		'$window',
		'commonFactory',
		'translations',
		function ($window, common, translations) {
			'use strict';

			var dictionary = translations || {},
				localize = {
					getLocalizedString: function (value) {
						return common.resolveObject(value, dictionary, '');
					}
				};

			return localize;
		}
	]);

})(window.angular);
