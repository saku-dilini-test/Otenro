/**
 * Events
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.constant('events', (function () {
		'use strict';

		var events = {};

		// AdMob
		events.createBanner = 'CreateBanner';
		events.createFullScreenAd = 'CreateFullScreenAd';

		return events;
	})());

})(window.angular);
