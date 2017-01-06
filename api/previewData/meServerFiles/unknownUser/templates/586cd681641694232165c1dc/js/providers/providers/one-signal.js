/**
 * SurfIT OneSignal module
 */
angular.module('srfOneSignal', [])

.run([
	'$ionicPlatform',
	'appConfig',
	'$window',
	function ($ionicPlatform, appConfig, $window) {
		'use strict';

		var notificationOpenedCallback = function() {
			
		};

		function OneSignalInit() {
			if (appConfig.OneSignal.enable && $window.plugins && $window.plugins.OneSignal) {
				$window.plugins.OneSignal.init(appConfig.OneSignal.appId, appConfig.OneSignal.options, notificationOpenedCallback);
			}
		}

		$ionicPlatform.ready(OneSignalInit);
	}
]);
