
(function () {
    "use strict";


    var app=angular.module('animateApp');
        app.controller('contactCtrl', function($scope, $http) { 
    
  //var catId=$routeParams.catid;
    $scope.submitContactForm=function(contactForm){
     // console.log(contactForm);
      if($http.post('http://localhost:1339/contact/create',contactForm)){
        console.log("Data Posted to the backend ");
      //console.log(contactForm);
      //var userName= $scope.contactForm.name;
      //$scope.uname=userName;   
      }
      else{
        console.log("Error");
      }
    //console.log("Submit is working");
    }
  })
})();

