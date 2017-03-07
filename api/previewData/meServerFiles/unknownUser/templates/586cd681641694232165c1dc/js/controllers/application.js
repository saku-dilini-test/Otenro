/**
 * Application controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('ApplicationController', [
		'$scope',
		'$ionicModal',
		function ($scope, $ionicModal) {
			'use strict';

			var vm = this;

			// Triggered in the intro modal to open it
			vm.openModal = openModal;

			// Triggered in the intro modal to close it
			vm.closeModal = closeModal

			// Set initial showMenu flag
			vm.showMenu = true;

			function onStateChangeStart() {
				vm.showMenu = true;
			}

			function onHideMenu() {
				vm.showMenu = false;
			}

			function showModal(modal) {
				$scope.modal = modal;
				// Open the intro modal
				$scope.modal.show();
			}

			function openModal() {
				// Create the intro modal that we will use later
				$ionicModal.fromTemplateUrl('templates/modal.html', {
					scope: $scope
				}).then(showModal);
			}

			function closeModal() {
				$scope.modal.hide();
			}

			$scope.$on('hideMenu', onHideMenu);
			$scope.$on('$stateChangeStart', onStateChangeStart);
		}
	]);

})(window.angular);
