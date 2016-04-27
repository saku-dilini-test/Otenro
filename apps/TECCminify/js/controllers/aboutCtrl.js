(function () {
    "use strict";
    angular.module('animateApp')
        .controller('aboutCtrl',['$scope', function AboutCtrl($scope) {

            $scope.ourStory = "The English Cake Company started in December 2012 at " +
                "the Good Market at Battaramulla after some friends came for dinner and " +
                "suggested our cakes might be popular there. Since the first day," +
                " all the goodies have been a hit and we’ve never looked back. " +
                "All our cakes are made to my favorite recipes collected " +
                "(and tweaked) over time from friends, family, my travels and " +
                "my mum who’s a trained baker and confectioner.";

            $scope.ourCompany = "We intend to carry on producing high quality cakes " +
                "and puddings using the best ingredients while keeping them affordable." +
                "All our cakes are made just the way I like to eat them myself, " +
                "and I hope you like them too!" +
                " We are always trying to be environmentally friendly " +
                "with our packaging and containers. Where possible," +
                " all our ingredients are sourced locally from small businesses";

            $scope.ourGoal = "Always keep the products fresh and high quality," +
                " paying close attention to every single product coming out of our kitchens." +
                "Completely stop using plastics and use recyclable materials for our packaging." +
                "Work with local small businesses to help each other and select the best of ingredients." +
                "Source items from small local businesses who produce all natural products " +
                "with no artificial additives and encourage people to stop using artificial colors," +
                "preservatives and additives";
        }]);
})();