angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope,$rootScope,initialData) {
    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0,oneDoller:initialData.oneUSD.data.result};

})

.controller('MenuCtrl', function ($scope, SERVER_URL,initialData) {
  $scope.SERVER_URL = SERVER_URL;
  $scope.categories = initialData.categories.data.result;
})

.controller('CategoryProductsCtrl',
  function ($scope,SERVER_URL, $stateParams,categoryProductResources) {
    $scope.SERVER_URL = SERVER_URL;
    $scope.categoryProducts = categoryProductResources.getProductsByCategory($stateParams.categoryCode)
      .success(function (data) {
        $scope.categoryProducts = data.result;
      })
      .error(function (err) {
        console.log(err);
      })
})

.controller('ProductDetailCtrl',
  function ($scope,SERVER_URL,categoryProductResources, $stateParams,$state,$rootScope,DataService) {
    $scope.SERVER_URL = SERVER_URL;
    $scope.paypalCart = DataService.cart;
    $scope.product =  categoryProductResources.productsDetails($stateParams.productId)
      .success(function (data) {
        $scope.product = data.result;
        $scope.product.qty = 1;
      })
      .error(function (err) {
        console.log(err);
      });
    $scope.choice =[
      {text: "Cake", value: "1", price:$scope.product.price},
      {text: "Slice", value:"2", price:$scope.product.perSlicePrice}
    ];
    $scope.data = {
      choice:"1"
    };
    $scope.buy = function(data){
      var value = data;
      var usdPrice,Price;
      if(value == 1){
        Price = $scope.product.qty * $scope.product.price;
        usdPrice = $scope.product.price;
      }
      else{
        Price = $scope.product.qty * $scope.product.perSlicePrice;
        usdPrice = $scope.product.perSlicePrice;
      }
      $rootScope.cart.cartItems.push({
        name: $scope.product.name,
        pieces: $scope.product.qty,
        price:Price,
        itemCode:$scope.product.itemCode
      });
      if($scope.product.qty == 0){
        $scope.paypalCart.addItem($scope.product.itemCode, $scope.product.name, usdPrice, -1000);
      }
      $scope.paypalCart.addItem($scope.product.itemCode, $scope.product.name,usdPrice, $scope.product.qty);

      $scope.paypalCart.saveItems();
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;

      $state.go('tab.cart')
    }
})

.controller('AboutCtrl', function ($scope) {})

.controller('CartCtrl', function ($scope,$rootScope,DataService) {
    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.paypalCart = DataService.cart;

    $scope.getTotal = function(){
      var total = 0;
      for(var i = 0; i < $scope.cartItems.length; i++){
          var product = $scope.cartItems[i];
          total += (product.price);
      }
      $rootScope.cart.totalPrice = total;
      return total;
    };

    $scope.removeItem = function(index,cartItem){

      $scope.cartItems.splice(index, 1);
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
      $scope.paypalCart.addItem(cartItem.itemCode, cartItem.name, cartItem.price, -1000);

    }
})

.controller('ContactCtrl', function ($scope,$location,$http,SERVER_URL,$state,$stateParams,$timeout, $cordovaFileTransfer) {

    $scope.contact = {name:'',email:'',title:'',msg:''};
    $scope.selectImage = '';

    $scope.upload = function() {
      fileChooser.open(function(uri) {
        $scope.selectImage = uri;
      });
    }

    $scope.submitContactForm = function(file,data) {
      if(file != ''){
        var reqData = {name : data.name,email : data.email,title : data.title,msg : data.msg,
          imageUrl : 'image.jpg'
        };
        var options = {
          fileKey: "file",
          fileName: "ionic.png",
          chunkedMode: false,
          mimeType: "image/png",
          params : reqData
        };
        $cordovaFileTransfer.upload(SERVER_URL+'contactUs/create', file , options).then(function(result) {
          $timeout( function(){
            $scope.contact.name = '';
            $scope.contact.email = '';
            $scope.contact.title = '';
            $scope.contact.msg = '';
            $scope.selectImage = '';
          }, 1000);
        }, function(err) {
        }, function (progress) {
        });

      }else{
        var reqData = data;
        reqData['imageUrl'] = 'null';
        $http.post(SERVER_URL+'contactUs/create',reqData)
          .success(function(data) {
            $timeout( function(){
              $scope.contact.name = '';
              $scope.contact.email = '';
              $scope.contact.title = '';
              $scope.contact.msg = '';
            }, 1000);
          }).error(function(err) {
          });
      }
    }
  })

.controller('DeliveryCtrl', function ($scope,$rootScope,paymentResources,$state,initialData,
                                      DataService,$location,$timeout,ORDER_URL,ionicTimePicker,ionicDatePicker) {
        var totalAmountUSD = initialData.totalAmount.data.usd;
        var oneUSD = initialData.oneUSD.data.result;
        $scope.isVisibleAddress = false;
        $scope.paypalCart = DataService.cart;

        $scope.cart = DataService.cart;
        $scope.addDeliveryFee = function(amount){

          $scope.delivery.usdAmountWithDeliveryFee = totalAmountUSD + (amount / oneUSD );
          $scope.paypalCart.saveDeliveryCharges(amount);
          $scope.isVisibleAddress = true;
          $scope.isOutOfHours = false;
          var selectDate , selectedMonth , selectYear;
          $scope.OutOfDate = false;


          if(typeof amount == 'undefined'){
            $scope.isVisibleAddress = false;
          }
        };

        var startDate = (new Date()).valueOf();
        var endDate = startDate + 31536000000;
        var ipObj1 = {
          callback: function (val) {  //Mandatory
            console.log(val);
            var date = new Date(val);
            var deliveryDate = date.getDate() + ' - ' + ( date.getMonth() + 1 ) + ' - ' + date.getFullYear();
            console.log(deliveryDate);
            $scope.delivery.date = deliveryDate;
            selectDate = date.getDate();
            //console.log("selectDate = "+ selectDate);
            selectedMonth = date.getMonth() + 1;
            //console.log("selectedMonth = "+ selectedMonth);
            selectYear = date.getFullYear();
            //console.log("selectYear = "+ selectYear);



          },
          from: new Date(), //Optional
          to : new Date(endDate),
          mondayFirst: true,          //Optional
          closeOnSelect: false,       //Optional
          templateType: 'popup'       //Optional
        };

        $scope.openDatePicker = function(){
          var currentDate = (new Date()).valueOf();
          console.log(currentDate);
          console.log(currentDate = currentDate + 40000000000)
          ionicDatePicker.openDatePicker(ipObj1);
        };


        var ipObj2 = {
          callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            }else {

              var Crntdate = new Date();
              var CrntYear = Crntdate.getFullYear();
              var Crntmonth = Crntdate.getMonth() + 1;
              var Crntday = Crntdate.getDate();
              var Crnthour = Crntdate.getHours() * 3600;
              var Crntminuts = Crntdate.getMinutes() * 60;
              var CurrentDate = Crnthour + Crntminuts;
              var selectedTime = new Date(val * 1000);

              console.log("val =" + val);
              $scope.isOutOfHours = false;
              /*console.log("Crntday = "+ Crntday );
               console.log("selectDate = "+ selectDate );
               console.log("CrntYear = "+ CrntYear );
               console.log("selectYear = "+ selectYear );
               console.log("Crntmonth = "+ Crntmonth );
               console.log("selectedMonth = "+ selectedMonth );*/


                  if((val > 72000) || (val < 36000)){
                    console.log("select another time");
                    $scope.isOutOfHours = true;

                  }else if((val < CurrentDate) & (Crntday == selectDate)& (Crntmonth == selectedMonth) & (CrntYear == selectYear)){
                    console.log("select time again");
                    $scope.OutOfDate = true;
                  }

                  else{
                   $scope.OutOfDate = false;
                  $scope.isOutOfHours = false;
                  var deliveryTime = formatAMPM(selectedTime);
                  $scope.delivery.time = deliveryTime;
                  console.log(deliveryTime);


                      function formatAMPM(date) {
                        var hours = date.getUTCHours();
                        var minutes = date.getUTCMinutes();
                        var ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        minutes = minutes < 10 ? '0'+minutes : minutes;
                        var strTime = hours + ':' + minutes + ' ' + ampm;
                        return strTime;
                        }
                  }
              }
          },
          //var seconds = new Date().getTime() / 1000;
          inputTime: 36000,   //Optional
          format: 12,         //Optional
          step: 15,           //Optional
          setLabel: 'Set Time'    //Optional
        };

        $scope.openDateTime = function() {
          ionicTimePicker.openTimePicker(ipObj2);
        }


        $scope.delivery = {usdAmount:totalAmountUSD};
        $scope.deliveryLocations = initialData.deliveryLocations.data.result;
        console.log(initialData.email);



        $scope.payNow = function(){
          $scope.cartInfo = $scope.cart.getCartInfo();
          $scope.cartInfo.oneDoller = $rootScope.cart.oneDoller;
          $scope.cartInfo.userInfo = $scope.delivery;

          console.log("------------------------------- "+JSON.stringify($scope.cartInfo.userInfo));

          var cartInfo = JSON.stringify($scope.cartInfo);
          {
            // Open in external browser
            window.open(ORDER_URL+'cartInfo='+cartInfo,'_system','location=no');
          };
          $scope.changePath = function(){
            $scope.cart.clearItems();
            for(var i = 0; i < $rootScope.cart.cartSize ; i++ ){
              $rootScope.cart.cartItems.splice(i,1);
            }
            $rootScope.cart.cartSize = 0;
            $scope.delivery = {};
            $location.path('/');
          }

          $timeout( function(){
            $scope.changePath();
          }, 3000);
        }


  })
  .controller('PickupCtrl', function ($scope,$rootScope,paymentResources,$state,initialData,DataService,$location,$timeout,ORDER_URL,ionicDatePicker,ionicTimePicker) {
    var totalAmountUSD = initialData.totalAmount.data.usd;
    $scope.pickup = {usdAmount:totalAmountUSD};
    $scope.cart = DataService.cart;
    $scope.branchLocations = initialData.branchLocations.data.result;
    var selectDate , selectedMonth , selectYear;
    $scope.OutOfDate = false;
    $scope.OutOfHours = false;


    var startDate = (new Date()).valueOf();
    console.log("start=" + startDate);
    var endDate = startDate + 31536000000;
    console.log("endDate=" + endDate);
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        //console.log(val);
        var date = new Date(val);
        var pickDate = date.getDate() + ' - ' + ( date.getMonth() + 1 ) + ' - ' + date.getFullYear();
        console.log(pickDate);
        $scope.pickup.date = pickDate;
        selectDate = date.getDate();
         //console.log("selectDate = "+ selectDate);
         selectedMonth = date.getMonth() + 1;
         //console.log("selectedMonth = "+ selectedMonth);
         selectYear = date.getFullYear();
         //console.log("selectYear = "+ selectYear);



      },
      from: new Date(), //Optional
      to : new Date(endDate),
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      var currentDate = (new Date()).valueOf();
      console.log("currentDate = " + currentDate);
      console.log(currentDate = currentDate + 40000000000)
      ionicDatePicker.openDatePicker(ipObj1);

    };


    var ipObj2 = {

      callback: function (val) {      //Mandatory
         if (typeof (val) === 'undefined') {
            console.log('Time not selected');
         }else {

             var Crntdate = new Date();
             var CrntYear = Crntdate.getFullYear();
             var Crntmonth = Crntdate.getMonth() + 1;
             var Crntday = Crntdate.getDate();
             var Crnthour = Crntdate.getHours() * 3600;
             var Crntminuts = Crntdate.getMinutes() * 60;
             var CurrentDate = Crnthour + Crntminuts;
             var selectedTime = new Date(val * 1000);
             //console.log("val =" + val);
             $scope.OutOfHours = false;

             /*console.log("Crntday = "+ Crntday );
             console.log("selectDate = "+ selectDate );
             console.log("CrntYear = "+ CrntYear );
             console.log("selectYear = "+ selectYear );
             console.log("Crntmonth = "+ Crntmonth );
             console.log("selectedMonth = "+ selectedMonth );*/
                if((val > 75600) || (val < 28800)){
                    console.log("select time again");
                    $scope.OutOfHours = true;

                }else if((val < CurrentDate) & (Crntday == selectDate)& (Crntmonth == selectedMonth) & (CrntYear == selectYear)){
                    console.log("select time again");
                    $scope.OutOfDate = true;
                }
                else{
                     $scope.OutOfDate = false;
                     $scope.OutOfHours = false;
                     var pickTime = formatAMPM(selectedTime);
                     $scope.pickup.time = pickTime;
                     console.log(pickTime);

                     function formatAMPM(date) {
                        var hours = date.getUTCHours();
                        var minutes = date.getUTCMinutes();
                        var ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        minutes = minutes < 10 ? '0'+minutes : minutes;
                        var strTime = hours + ':' + minutes + ' ' + ampm;
                        return strTime;
                     }

                }
          }
        },


      inputTime: 36000,   //Optional
      format: 12,         //Optional
      step: 15,           //Optional
      setLabel: 'Set Time'    //Optional
    };

    $scope.openDateTime = function() {

      ionicTimePicker.openTimePicker(ipObj2);

    }


    $scope.payNow = function(){
      $scope.cartInfo = $scope.cart.getCartInfo();
      $scope.cartInfo.oneDoller = $rootScope.cart.oneDoller;
      $scope.cartInfo.userInfo = $scope.pickup;

      console.log("------------------------------- "+JSON.stringify($scope.cartInfo.userInfo));
      console.log($scope.cartInfo.userInfo.email)

      var cartInfo = JSON.stringify($scope.cartInfo);

      window.open(ORDER_URL+'cartInfo='+cartInfo,'_system','location=no');
      $scope.changePath = function(){
        $scope.cart.clearItems();
        for(var i = 0; i < $rootScope.cart.cartSize ; i++ ){
          $rootScope.cart.cartItems.splice(i,1);
        }
        $rootScope.cart.cartSize = 0;
        $scope.pickup = {};
        $location.path('/');
      }

      $timeout( function(){
        $scope.changePath();
      }, 3000);


    }

  })

  .controller('orderConfirmationCtrl', function ($scope,$rootScope,initialData) {
    var summary  = initialData.orderSummary.data.result.pickupDetails;
    $scope.isBranch = true;
    if(typeof summary == 'undefined'){
      summary  = initialData.orderSummary.data.result.deliveryDetails;
      $scope.isBranch = false;
    }
    var ProcessedTime = initialData.orderSummary.data.result.order_proccessed_Time;
    var ProcessedId = initialData.orderSummary.data.result.response.id;

    $scope.totalAmount = summary.usdAmount+"$";
    $scope.customerName = summary.name;
    $scope.customerContactNo = summary.contactNo;
    $scope.pickupBranch = summary.branch;
    $scope.deliveryAddress = summary.address;
    $scope.orderProcessedTime = ProcessedTime;
    $scope.orderProcessedId = ProcessedId;

  })

  .controller('PromosCtrl', function ($scope,promotionResources) {

    $scope.promotionList = promotionResources.getPromotionList()
      .success(function (data) {

        $scope.promotionList = data.result[0];
      })
      .error(function (err) {
        console.log(err);
      })
  })

  .controller('TabCtrl',function($scope,$rootScope){
    $scope.itemsSize = $rootScope.cart.cartSize;
    $scope.$watch(function() {
      return $rootScope.cart.cartSize;
    }, function() {
      $scope.itemsSize = $rootScope.cart.cartSize;
    }, true);
  });


