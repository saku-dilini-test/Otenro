/**
 * Translations
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.constant('translations', (function () {
		'use strict';

		var translations = {
			modal: {},
			slideshow: {},
			comments: {}
		};

		translations.modal.modal_window = "Modal Window";
		translations.modal.close = "Close";
		translations.modal.item01 = "Item 01";
		translations.modal.item02 = "Item 02";
		translations.modal.item03 = "Item 03";
		translations.modal.item04 = "Item 04";
		translations.modal.item05 = "Item 05";

		translations.slideshow.skip_intro = "Skip Intro";
		translations.slideshow.one_of_three = "1 of 3";
		translations.slideshow.two_of_three = "2 of 3";
		translations.slideshow.three_of_three = "3 of 3";

		translations.comments.no_comments = "No coments on this article yet.";


		return translations;
	})());

})(window.angular);
