/**
 * Created by udeshikaperera on 14/08/2015.
 */
(function(){
    angular.module('oblFrameWork').controller('OblFrameworkCtrl',
        ['$scope', '$rootScope','$window', '$timeout', '$state',
            OblFrameworkCtrl]);

    function OblFrameworkCtrl($scope,$rootScope,$window, $timeout, $state){

        $scope.isMenuVisible= true;
        $scope.isMenuButtonVisible = true;

        $scope.$on('obl-menu-item-selected-event', function(evt, data){
            $state.go(data.route);
            checkWidth();
            broadcastMenuState();
        });

        $($window).on('resize.oblFramework', function(){
           $scope.$apply(function(){
              checkWidth();
               broadcastMenuState();
           });
        });

        $scope.$on("$destroy", function(){
            $($window).off("resize.oblFramework");
        });

        var checkWidth = function(){
            var width = Math.max($($window).innerWidth(),$window.innerWidth);
            $scope.isMenuVisible = (width > 768);
            $scope.isMenuButtonVisible = !$scope.isMenuVisible;
        };

        $scope.menuButtonClicked = function(){
            $scope.isMenuVisible = !$scope.isMenuVisible;
            broadcastMenuState();
            //$scope.$apply();
        };

        var broadcastMenuState = function(){
          $rootScope.$broadcast('obl-menu-show',
              {
                  show: $scope.isMenuVisible
              });
        };

        $timeout(function(){
            checkWidth();
        },0)
    }
})();