angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {

    // This is dummy data, should come from db 
    $scope.itemList = [
        {
            id :1,    
            name : 'Water Pizza',
            imgUrl : 'item_01.png',
            price : '12.5$',
            description : 'Pizza description'
        },
        {
            id: 2,
            name : 'Color Pizza',
            imgUrl : 'item_02.png',
            price : '15.5$',
            description : 'Pizza description'
        },
        {
            id: 3,
            name : 'Apple Pizza',
            imgUrl : 'item_03.png',
            price : '11.5$',
            description : 'Pizza description'
        }  
        ];
    
    /* ----- Swipe Function start ----- */
    // Configuration 
    $scope.startIndex = 0;
    $scope.leftIndex = 0;
    $scope.rightIndex = $scope.itemList.length-1;
    $scope.isEnableLeftButton = false;
    $scope.isEnableRightButton = true;
    if($scope.rightIndex == -1){
        $scope.isEnableRightButton = false;
    }    
    // view item 
    $scope.item = {};  
    // item set function     
    $scope.setItem = function(id){    
        if($scope.leftIndex <= id && id <= $scope.rightIndex){            
            $scope.item = $scope.itemList[id];
        }        
    }
    // initial set as 0 index 
    $scope.setItem(0);
    // left swipe function 
    $scope.onSwipeLeft = function(){        
        if($scope.startIndex > $scope.leftIndex)
            $scope.startIndex = $scope.startIndex - 1;        
        $scope.isEnableRightButton = true;
        $scope.setItem($scope.startIndex);
        if($scope.startIndex == $scope.leftIndex){
            $scope.isEnableLeftButton = false;
        }    
    }   
    // Right swipe function 
    $scope.onSwipeRight = function(){        
        if($scope.startIndex < $scope.rightIndex)
            $scope.startIndex = $scope.startIndex + 1;
        $scope.setItem($scope.startIndex);
        $scope.isEnableLeftButton = true;
        if($scope.startIndex == $scope.rightIndex){
            $scope.isEnableRightButton = false;
        }                    
    }
    /* ----- Eng Swipe Fucntion  ----- */
})

.controller('MenuCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.categoryList = [
        {
            id : 1,
            name : 'ZTC Pizza',    
            imgUrl : 'category_01.png',
            description : 'Pizza description'
        },
        {
            id : 2,
            name : 'XYZ Pizza',        
            imgUrl : 'category_02.png',
            description : 'Pizza description'
        }
    ];
})

.controller('ItemsCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.itemList = [
        {
            id: 1,
            name : 'NTK Pizza',    
            imgUrl : 'item_01.png',
            description : 'Pizza description'
        },
        {   id : 2,
            name : 'LLMB Pizza',        
            imgUrl : 'item_02.png',
            description : 'Pizza description'
        }
    ];    
    
})

.controller('ItemCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.item =  {
            id : 1,
            name : 'LLMB Pizza',    
            imgUrl : 'item_01.png',
            description : 'Pizza description'
        };
})

.controller('OurStoresCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.stores = [
        {
            name : 'Colombo Store',
            address : 'No 488, Kotte Road, Nugegoda'
        },
        {
            name : 'Nugegoda Store',
            address : 'No 884, Nugegoda Road, Kotte'
        }
    ]
})

.controller('ContactUsCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.address = "No 488, Kotte Road, Kotte";
    $scope.telPhone = "011-45-55-568";
    $scope.email = "info@deliveryLanka.com";
    $scope.webSite = "deliveryLanka.com";
});