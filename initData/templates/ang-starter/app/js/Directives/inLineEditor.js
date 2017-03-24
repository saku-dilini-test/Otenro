/**
 * Created by @Madhuranga on 29/06/2015.
 */

'use strict';
angular.module('AngStarter')
    .directive('oblInLineEditor', [function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                console.log(attrs.id);

            },
            template: ""

        };
    }]);
