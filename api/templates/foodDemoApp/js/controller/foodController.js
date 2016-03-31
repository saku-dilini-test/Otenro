/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams) {
    $scope.foods = [
        { title: 'food 1', description: 'description 1', id: 1 },
        { title: 'food 2', description: 'description 2', id: 2 },
        { title: 'food 3', description: 'description 3', id: 3 },
        { title: 'food 4', description: 'description 4', id: 4 },
        { title: 'food 5', description: 'description 5', id: 5 },
        { title: 'food 6', description: 'description 6', id: 6 }
    ];

    $scope.foodInfo = $stateParams.foodId;

});