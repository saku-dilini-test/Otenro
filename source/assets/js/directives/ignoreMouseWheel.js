(function() {

    angular.module('app').directive( 'ignoreMouseWheel', function( $rootScope ) {
    	return {
    		restrict: 'A',
    		link: function( scope, element, attrs ){
    			element.bind('mousewheel', function ( event ) {
    				element.blur();
    			} );
    		}
    	}
    });

})();