/**
 * SurfIT AdMob module
 */
angular.module('srfAdMob', [])

.run([
	'$ionicPlatform',
	'appConfig',
	'$window',
	'$rootScope',
	'events',
	function ($ionicPlatform, appConfig, $window, $rootScope, events) {
		'use strict';

		function createBanner() {
			try {
				AdMob.createBanner();
			} catch(e) {};
		}

		function createFullScreenAd() {
			try {
				AdMob.showInterstitial();
			} catch(e) {};
		}

		function AdMobInit() {
			if (appConfig.AdMob.enable && $window.AdMob) {

				var AdMob = $window.AdMob,
					platform = ionic.Platform.isAndroid() ? 'Android' : 'IOS',
					AdMobOptions = {
						bannerId: appConfig.AdMob[platform].banner,
						interstitialId: appConfig.AdMob[platform].interstitial,
						adSize: appConfig.AdMob.adSize,
						position: AdMob.AD_POSITION.BOTTOM_CENTER,
						offsetTopBar: appConfig.AdMob.offsetTopBar,
						bgColor: appConfig.AdMob.bgColor,
						isTesting: appConfig.AdMob.isTesting,
						autoShow: appConfig.AdMob.autoShow
					};

				AdMob.setOptions(AdMobOptions);

				createBanner();
			}
		}

		$ionicPlatform.ready(AdMobInit);
		$rootScope.$on(events.createBanner, createBanner());
		$rootScope.$on(events.createFullScreenAd, createFullScreenAd);
	}
]);
