/**
 * Created by madhuranga on 2/18/16.
 */
(function(){
    angular.module('appEdit').directive('meCheckFileSize',function(){
    return{
        link: function(scope, elem, attr, ctrl) {
            $(elem).bind('change', function() {
                alert('File size:' + this.files[0].size);
            });
        }
    }
});

})();