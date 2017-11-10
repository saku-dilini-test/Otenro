import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';


@Component({
  selector: 'app-product',
  templateUrl: './app/page-body/product/product.component.html',
  styleUrls: ['./app/page-body/product/product.component.css'],
})
export class ProductComponent implements OnInit {

  public catName;
  public foodInfo;
  public images;
  public selectedVariant = {};
  public selectedVariant1;
  public selectedVariant2;
  public selectedVariant3;
  public selectedVariant4;
  public sign;
  public appId = (<any>data).appId;
  public userId = (<any>data).userId;
  public selection = [];
  public selection1 = [];
  public selection2 = [];
  public selection3 = [];
  public Data;
  public parentobj = {cartItems:[],cartSize:0,totalPrice:0};

  imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
  +this.userId+"&appId="+this.appId+"&"+new Date().getTime()+'&images=thirdNavi';
  
  constructor(private http: HttpClient,private dataService : PagebodyServiceModule, private router: ActivatedRoute, private route: Router) { 
    
    this.Data = this.dataService.data;
    console.log(this.imageUrl);
    this.init();
  }
    
  currency : string;
  ngOnInit() {

    this.http.get(SERVER_URL + '/templates/getCurrency?appId='+ this.appId).subscribe(function(data) {
      this.currency = data;
      console.log("this.currency  : " + JSON.stringify(this.currency.sign));
this.sign = this.currency.sign;
  }, error => {
    this.showErrorPage();
    
 });

    this.router.params.subscribe(params => {
      this.catName = params['catName'];
      console.log("this.value : " + this.catName);
    });
    console.log("data  : " + JSON.stringify(this.dataService.data));

    
  }

  showErrorPage(){
    alert('Somthing went Wrong!');
  }

  
init(){
    console.log('initcalled');
  if(this.Data){
      console.log("this.Data  : " + JSON.stringify(this.Data));
    this.foodInfo = this.Data;
    console.log("this.foodInfo  : " + JSON.stringify(this.foodInfo));
    
    this.images = this.Data.tempImageArray;

      if(this.Data.variants.length > 0){
             this.selectedVariant = this.Data.variants[0];
             console.log("this.selectedVariant  : " + JSON.stringify(this.selectedVariant));
            for(var i=0;i <this.foodInfo.variants.length;i++){
                    this.selection.push({'vType':this.foodInfo.variants[i].selection[0].vType});
                    console.log("this.selection  : " + JSON.stringify(this.selection));
                }
                this.selectedVariant = this.Data.variants[0];
                
            if(this.selectedVariant.quantity > 0 ){
                var isBuyBtnDisable = false;
            }else{
                var isBuyBtnDisable = true;
            }
      }
}

}
changeVariant(variant){
    this.selectedVariant = this.Data.variants[0];
    
    console.log("variant : " + variant);
    console.log("changeVariant called");
    console.log("this.selectedVariant  : " + JSON.stringify(this.selectedVariant));
    
  this.selectedVariant1  = variant;
  console.log("this.selectedVariant1  : " + JSON.stringify(this.selectedVariant1));
  
  this.selectedVariant.buyQuantity = '';

  // $scope.lockBuyButton = true;

    if(this.foodInfo.selection.length ==1){
        console.log("if called");        
      for(var i=0;i<this.foodInfo.variants.length;i++){
        if(this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1){
            this.selectedVariant = this.foodInfo.variants[i];
            console.log("this.selectedVariant  : " + JSON.stringify(this.selectedVariant));
            
            // $scope.lockBuyButton = false;
        }
      }
    }else{
        console.log("else called");
        for(var i=0;i <this.foodInfo.variants.length;i++){
            if(this.foodInfo.variants[i].selection[0].vType == variant){
                this.selection1.push({'vType':this.foodInfo.variants[i].selection[1].vType});
                console.log("this.selection1  : " + JSON.stringify(this.selection1) + JSON.stringify(this.selection));                
            }
        }
    }

};

changeVariant2(variant){
    console.log("variant : " + variant);
    console.log("changeVariant2 called");
  if(variant){
        this.selectedVariant2  =variant;
        this.selectedVariant.buyQuantity = '';

  }
  // $scope.lockBuyButton = true;

    if(this.foodInfo.selection.length==2){
        console.log("if called");
        for(var i=0;i<this.foodInfo.variants.length;i++){
        if(this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
            this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2){
            this.selectedVariant = this.foodInfo.variants[i];
            console.log("this.selectedVariant  : " + JSON.stringify(this.selectedVariant));
            // $scope.lockBuyButton = false;

        }
      } 
    }else{
        console.log("else called");
        for(var i=0;i <this.foodInfo.variants.length;i++){
            if(this.foodInfo.variants[i].selection[1].vType == variant){
                this.selection2.push({'vType':this.foodInfo.variants[i].selection[2].vType});
                console.log("this.selection2  : " + JSON.stringify(this.selection2) + JSON.stringify(this.selection));                                
            }
        }
    }

};

changeVariant3(variant){
    console.log("variant : " + variant);
    console.log("changeVariant3 called");
  if(variant){
        this.selectedVariant3  =variant;
        this.selectedVariant.buyQuantity = '';
  }
  // $scope.lockBuyButton = true;

    if(this.foodInfo.selection.length==3){
        console.log("if called");
        for(var i=0;i<this.foodInfo.variants.length;i++){
            if(this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3){
                this.selectedVariant = this.foodInfo.variants[i];
                //  $scope.lockBuyButton = false;

            }
          }
    }else{
        console.log("else called");
        for(var i=0;i <this.foodInfo.variants.length;i++){
            if(this.foodInfo.variants[i].selection[2].vType == variant){
                this.selection3.push({'vType':this.foodInfo.variants[i].selection[3].vType});
                console.log("this.selection3  : " + JSON.stringify(this.selection3) + JSON.stringify(this.selection));                                
            }
        }
    }
};
changeVariant4(variant){
    if(variant){
        this.selectedVariant4  =variant;
        this.selectedVariant.buyQuantity = '';

    }

  for(var i=0;i<this.foodInfo.variants.length;i++){
        if(this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
            this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
            this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3 &&
            this.foodInfo.variants[i].selection[3].vType == this.selectedVariant4){
            this.selectedVariant = this.foodInfo.variants[i];
            // $scope.lockBuyButton = false;

        }
  }
};



    // Check buyQty input value.
    // If buyQty value is less than or equal Selected-Variant-Qty, Buy Button Enable
    changeBuyQuantity(buyQty) {
      
              // default : Buy button set as Disable
              // $scope.isBuyBtnDisable = true;
      
              // if buyQty value greater than 0
              if(buyQty > 0){
                  // Get Selected-Variant-Qty value
                  var selectVariantAvailableQty =this.selectedVariant.quantity;
                  //If quantity is unlimited enable buy button
                  if(this.selectedVariant.unlimited == true){
                      // $scope.isBuyBtnDisable = false;
                  }
                  else if(typeof selectVariantAvailableQty != 'undefined'){
                      // If buyQty less than or equal Selected-Variant-Qty, buy button enable
                      if(buyQty <= selectVariantAvailableQty ){
                          // $scope.isBuyBtnDisable = false;
                      }
                  } 
              }
          };


          addToCart() {
              console.log("this.selectedVariant.buyQuantity  : " + this.selectedVariant.buyQuantity);
            if(this.selectedVariant.buyQuantity == null){
                alert(' error');
            }else{
                if(this.dataService.cart.cartItems.length != 0){
                        var i=0;
                        while(i < this.dataService.cart.cartItems.length){
                            if(this.foodInfo.id == this.dataService.cart.cartItems[i].id && this.selectedVariant.sku == this.dataService.cart.cartItems[i].sku){
                                this.dataService.position2 = false;
                                //increasing weight when we add same product again.
                                this.dataService.cart.cartItems[i].totWeight += this.selectedVariant.weight*this.selectedVariant.buyQuantity;
                                this.dataService.cart.cartItems[i].qty += this.selectedVariant.buyQuantity;
                                this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                                this.parentobj.cartSize = this.dataService.cart.cartSize;
                                this.dataService.parseWeight = this.selectedVariant.weight;
                                // $state.go('app.category');
                                this.route.navigate(['cart']);
                                break;
                            }
                            else if(i == (this.dataService.cart.cartItems.length -1)){
                                this.dataService.position2 = true;
                                this.dataService.cart.cartItems.push({
                                    id: this.foodInfo.id,
                                    name: this.foodInfo.name,
                                    qty: this.selectedVariant.buyQuantity,
                                    sku: this.selectedVariant.sku,
                                    totWeight: this.selectedVariant.weight*this.selectedVariant.buyQuantity,
                                    price: this.selectedVariant.price,
                                    total : this.selectedVariant.price,
                                    imgURL : this.Data.tempImageArray,
                                    totalQty: this.selectedVariant.quantity,
                                    weight: this.selectedVariant.weight  //(new) added weight of each product
    
                                });
                                this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                                this.parentobj.cartSize = this.dataService.cart.cartSize;
                                this.dataService.parseWeight = this.selectedVariant.weight;
                                //  $state.go('app.category');
                                this.route.navigate(['cart']);
                                break;
                            }
                            i++;
                        }
                }
                else{
                    this.dataService.cart.cartItems.push({
                        id: this.foodInfo.id,
                        name: this.foodInfo.name,
                        qty: this.selectedVariant.buyQuantity,
                        sku: this.selectedVariant.sku,
                        totWeight: this.selectedVariant.weight*this.selectedVariant.buyQuantity,
                        price: this.selectedVariant.price,
                        total : this.selectedVariant.price,
                        imgURL : this.Data.tempImageArray,
                        totalQty: this.selectedVariant.quantity,
                        weight: this.selectedVariant.weight //(new) added weight of each product
    
                    });
                    this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                    console.log('this.dataService.cart.cartSize  : ' + this.dataService.cart.cartSize);
                    this.parentobj.cartSize = this.dataService.cart.cartSize;
                    this.dataService.parseWeight = this.selectedVariant.weight;
                    // $state.go('app.category');
                    this.route.navigate(['cart']);
                    
                }
            }
    
        };


          
  slides = SLIDES;
}



const SLIDES = [
  { src:'./assets/images/slider/1.jpg', title:'Final Sale' },
];
