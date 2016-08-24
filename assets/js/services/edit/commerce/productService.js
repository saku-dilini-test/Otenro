/**
 * Created by udeshikaperera on 23/08/2016.
 */

(function() {
    angular.module('appEdit').service('productService', [
        'SERVER_URL','$resource', ProductService
    ]);
        function ProductService(SERVER_URL, $resource){
            return $resource(SERVER_URL+ 'edit/thirdNavigation/:productId',{productId:'@productId'},
                {
                    'update': { method:'PUT' },
                    'add':{
                        method:'POST',
                        url:SERVER_URL+ 'edit/thirdNavigation/add/:product',
                        params:{product:'@product'}
                    },
                    'delete':{method:'DELETE'},
                    'get':{
                        method:'GET',
                        url:SERVER_URL+ 'edit/thirdNavigation/getById/:productId',
                        params:{productId:'@productId'}
                    }
                });
        }
    }

)();