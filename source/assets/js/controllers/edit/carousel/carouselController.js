/**
 * Created by Shashan on 01/02/2018.
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("CarouselCtrl", ['$scope','$mdDialog', CarouselCtrl]);


    function CarouselCtrl($scope,$mdDialog) {

        // --- add carousel image --- //
        $scope.addCarouselBanner = function () {
            return $mdDialog.show({
                controller: 'CarouselCtrl',
                templateUrl: 'user/edit/carousel/addCarouselBanner.html',
                clickOutsideToClose: true
            }).then(function(answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                //$scope.status = 'You cancelled the dialog.';
            });
        }

        // --- cancel dialog -----
        $scope.cancel = function () {
            $mdDialog.cancel();
        };



        // controller for add carousel banner

        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";


        // image crop function
        $scope.cropImage = function () {
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                        $scope.picFile =  $scope.myImage
                    });
                };
                reader.readAsDataURL(file);
                $scope.imageSelected =false;
                $scope.buttonName = "Upload";
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }

        $scope.addImage = function(img){
            if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                var im = $scope.tmpImage;
                im[0] = $scope.picFile;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                $scope.myImage = null;
                toastr.success('Image has been uploaded successfully', 'message', {
                    closeButton: true
                });
            }

            $scope.imageSelected = true;
            $scope.buttonName = "Browse Image";
        };



    };

})();
