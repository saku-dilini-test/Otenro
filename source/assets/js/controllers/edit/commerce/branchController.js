(function () {
    'use strict';
    angular.module("appEdit").controller("BranchCtrl", [
        '$scope', '$mdDialog', 'toastr','contactUsService','branch','uiGmapGoogleMapApi','$rootScope','commerceService',
        BranchCtrl]);

    function BranchCtrl($scope, $mdDialog, toastr, contactUsService, branch, uiGmapGoogleMapApi, $rootScope, commerceService) {
        $scope.title = 'ADD';
        if(branch){
            $scope.locationInfo = branch;
            $scope.coords =branch.branch;
            $scope.title = 'UPDATE';
        }else{
            $scope.coords={
                latitude : 6.9320204155752050,
                longitude: 79.8890950584107031
            };
        }

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map= {
                center: $scope.coords,
                zoom: 11,
                markers: [{
                    id: Date.now(),
                    coords:$scope.coords
                }],
                events: {
                    click: function(map, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];
                        var lat = e.latLng.lat(),
                            lon = e.latLng.lng();
                        var marker = {
                            id: Date.now(),
                            coords: {
                                latitude: lat,
                                longitude: lon
                            }
                        };
                        $scope.map.markers=[];
                        $scope.map.markers.push(marker);
                        $scope.$apply();
                    }
                }
            };
        });


        $scope.addBranchLocation = function(locationInfo,map) {
            if(locationInfo.address === undefined && locationInfo.name === undefined){
                toastr.error('Need to fill all the fields', { closeButton: true});
            }else if($scope.map.markers[0].coords.latitude === undefined || $scope.map.markers[0].coords.longitude === undefined ){
                toastr.error('Need to select a location from the map', { closeButton: true});
            }
            else{
                var branchInfoResponse = {
                    'appId': $rootScope.appId,
                    'name': locationInfo.name,
                    'address': locationInfo.address,
                    'branch': $scope.map.markers[0].coords
                };
                if( $scope.title === 'UPDATE'){
                    branchInfoResponse = {
                        'appId': $rootScope.appId,
                        'name': locationInfo.name,
                        'address': locationInfo.address,
                        'branch': $scope.map.markers[0].coords,
                        'id':$scope.locationInfo.id
                    };
                }
                contactUsService.saveBranchInfo(branchInfoResponse)
                    .success(function(data, status, headers, config) {
                        toastr.success('New branch Successfully Updated. ', 'Awesome ', {closeButton: true});
                        return commerceService.showStoreSettingsDialog(4);

                    }).error(function(data, status, headers, config) {
                    toastr.error('Updating new branch failed','Warning', { closeButton: true});
                    return commerceService.showStoreSettingsDialog(4);
                });
            }

        };


        $scope.cancel = function () {
            return commerceService.showStoreSettingsDialog(4);
        };


    }
})();
