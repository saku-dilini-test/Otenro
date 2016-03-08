(function(){
  angular.module('appEdit').directive("meFileRead", [function () {
    return {
        scope: {
            meFileRead: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.meFileRead = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

})();