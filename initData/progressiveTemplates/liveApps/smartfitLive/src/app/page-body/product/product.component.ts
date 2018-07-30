import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import * as _ from 'lodash';
import { CurrencyService } from '../../services/currency/currency.service';
import { TitleService } from '../../services/title.service';
import * as Player from '@vimeo/player';
import { LocalStorageService } from 'angular-2-local-storage';
declare var $:any;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

    private catName;
    private foodInfo;
    private images;
    selectedVariant: any;
    private selectedVariant1;
    private selectedVariant2;
    private selectedVariant3;
    private selectedVariant4;
    private sign;
    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    selection = [];
    private selection1 = [];
    private selection2 = [];
    private selection3 = [];
    Data;
    isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    lockBuyButton = false;
    dialogVariants;
    imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

        bannerImageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=banner';
    readMore = false;
    desPart1; desPart2; desPart1_demo;
    name1; name2; name3; name4;
    ifNotSelectedVariantOrQuantity:boolean;
     private player: Player;
    constructor(private localStorageService: LocalStorageService, private CurrencyService: CurrencyService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private title: TitleService) {

        this.Data = JSON.parse(localStorage.getItem(this.appId+":dataServiceData"));

        this.init();
        this.isBuyBtnDisable = true;
        this.title.changeTitle('Details');
        if (this.Data.detailedDesc.length > 400) {
            this.desPart2 = this.Data.detailedDesc.slice(400, this.Data.detailedDesc.length);
            this.desPart1 = this.Data.detailedDesc.slice(0, 400) + "...";
            this.desPart1_demo = this.Data.detailedDesc.slice(0, 400);

        } else {
            this.desPart1 = this.Data.detailedDesc;
            this.readMore = true;
        }
    }

    video(id) {

        var options = {
            id: id,
            autoplay: true,
            background: false,
            muted: true,
        };
        if (id) {
            var x=this;
            this.player = new Player('player', options);
            this.player.ready().then(function () {

               x.player.play().then(function() {
                    // the video was played
                }).catch(function(error) {
                    switch (error.name) {
                        case 'PasswordError':
                            // the video is password-protected and the viewer needs to enter the
                            // password first
                            break;

                        case 'PrivacyError':
                            // the video is private
                            break;

                        default:
                            // some other error occurred
                            break;
                    }
                });

            });

        }
    }



    currency: string;
    tests;

    readMoreFunct() {

        this.desPart1 = this.desPart1_demo.concat(this.desPart2);
        this.readMore = true;
    }

    ngOnInit() {

        let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

        if (appUser) {
            this.dataService.appUserId = appUser.registeredUser;
        }

        this.CurrencyService.getCurrencies().subscribe(data => {
            this.currency = data.sign;
        }, error => {
            console.log('Error retrieving currency');
        });

        this.router.params.subscribe(params => {
            this.catName = params['catName'];
        });


    }

    ngAfterViewInit() {
      var api;
      api = $("#gallery").unitegallery({
        theme_enable_text_panel: false,
        gallery_background_color: "rgba(0,0,0,0)",
        slider_scale_mode: "fit",
        slider_textpanel_bg_color:"#000000",
        slider_textpanel_bg_opacity: 0,
        gallery_autoplay:true,
        theme_hide_panel_under_width: null
      });
      $('#gallery').on({ 'touchstart' : function(){
        api.stop();
      } });



         //  for(let i=this.Data.tempImageArray.length-1;i>=0;i--){
         //     if(this.Data.tempImageArray[i].videoUrl){
         //         this.video(this.Data.tempImageArray[i].videoUrl);
         //         $('#videoModal').modal('show');
         //         var x = this;
         //         $('#videoModal').on('hidden.bs.modal', function (e) {
         //              x.player.destroy().then(function() {
         //                    // the player was destroyed
         //              }).catch(function(error) {
         //                    // an error occurred
         //              });
         //         })
         //         break;
         //     }
         // }

    }


    init() {


        if (this.Data.selection.length == 1) {
            this.name1 = this.Data.selection[0].name
        }
        if (this.Data.selection.length == 2) {
            this.name1 = this.Data.selection[0].name
            this.name2 = this.Data.selection[1].name
        }
        if (this.Data.selection.length == 3) {
            this.name1 = this.Data.selection[0].name
            this.name2 = this.Data.selection[1].name
            this.name3 = this.Data.selection[2].name
        }
        if (this.Data.selection.length == 4) {
            this.name1 = this.Data.selection[0].name
            this.name2 = this.Data.selection[1].name
            this.name3 = this.Data.selection[2].name
            this.name4 = this.Data.selection[3].name
        }

        if (this.Data) {
            this.foodInfo = this.Data;
            this.title.changeTitle(" ");
            this.images = this.Data.tempImageArray;

            if (this.Data.variants.length > 0) {
                this.selectedVariant = this.Data.variants[0];
                this.selection = [];
                this.selection1 = [];
                this.selection2 = [];
                this.selection3 = [];
                if(this.Data.selection.length == 2){
                    this.selection1.push({ 'vType': 'Select '+this.name2 });
                }else if(this.Data.selection.length == 3){
                    this.selection1.push({ 'vType': 'Select '+this.name2 });
                    this.selection2.push({ 'vType': 'Select '+this.name3 });
                }else if(this.Data.selection.length == 4){
                    this.selection1.push({ 'vType': 'Select '+this.name2 });
                    this.selection2.push({ 'vType': 'Select '+this.name3 });
                    this.selection3.push({ 'vType': 'Select '+this.name4 });
                }
                this.selection.push({ 'vType': 'Select '+this.name1 });                for (var i = 0; i < this.foodInfo.variants.length; i++) {
                    this.selection.push({ 'vType': this.foodInfo.variants[i].selection[0].vType });
                }

                this.selection = _.uniqBy(this.selection, 'vType');
                this.selectedVariant = this.Data.variants[0];

                if (this.selectedVariant.quantity > 0) {
                    this.isBuyBtnDisable = false;
                } else {
                    this.isBuyBtnDisable = true;
                }
            }
        }
    }

    getIndex(sku) {

        let index = this.Data.defaultImage;
        if (this.Data.selectedSku) {
            this.Data.selectedSku.forEach(element => {
                if (element.sku == sku) {
                    index = element.index;
                }
            });
        }

        return index;
    }

    changeVariant(variant1) {
        this.selection1 = [];
        this.selection2 = [];
        this.selection3 = [];

        if(this.Data.selection.length == 2){
            this.selection1.push({ 'vType': 'Select '+this.name2 });
        }else if(this.Data.selection.length == 3){
            this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select '+this.name3 });
        }else if(this.Data.selection.length == 4){
            this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select '+this.name3 });
            this.selection3.push({ 'vType': 'Select '+this.name4 });
        }

        variant1 = variant1.replace(/\s/g, '');

        if (variant1) {
            if (variant1 == "Select"+this.name1) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
            this.selectedVariant1 = variant1;
            this.selectedVariant2 = null;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 1 && variant1 != 'Select'+this.name1) {

            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {
                    this.selectedVariant = this.foodInfo.variants[i];


                }
            }
            this.lockBuyButton = true;

        } else {

            // if (variant1 == "Please Select") {
            // } else {
            //     this.selection1.push({ 'vType': 'Please Select' });
            // }

            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {

                    this.selection1.push({ 'vType': this.foodInfo.variants[i].selection[1].vType });
                }
            }
            this.selection1 = _.uniqBy(this.selection1, 'vType');
        }

    };

    changeVariant2(variant2) {
        this.selection2 = [];
        this.selection3 = [];
        if(this.Data.selection.length == 2){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
        }else if(this.Data.selection.length == 3){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select '+this.name3 });
        }else if(this.Data.selection.length == 4){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select '+this.name3 });
            this.selection3.push({ 'vType': 'Select '+this.name4 });
        }
        //for IE specific issue
        variant2 = variant2.replace(/\s/g, '');

        if (variant2) {
            if (variant2 == "Select"+this.name2) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
            this.selectedVariant2 = variant2;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 2 && variant2 != 'Select'+this.name2) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }
            this.lockBuyButton = true;

        } else {
            // if (variant2 != 'PleaseSelect') {
            //     this.selection2.push({ 'vType': 'Please Select' });
            // }
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[1].vType == variant2 && this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {
                    this.selection2.push({ 'vType': this.foodInfo.variants[i].selection[2].vType });
                }
            }
            this.selection2 = _.uniqBy(this.selection2, 'vType');

        }

    };

    changeVariant3(variant3) {

        //for IE specific issue
        variant3 = variant3.replace(/\s/g, '');
        this.selection3 = [];
        if(this.Data.selection.length == 2){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
        }else if(this.Data.selection.length == 3){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            // this.selection2.push({ 'vType': 'Select '+this.name3 });
        }else if(this.Data.selection.length == 4){
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            // this.selection2.push({ 'vType': 'Select '+this.name3 });
            this.selection3.push({ 'vType': 'Select '+this.name4 });
        }

        if (variant3) {
            if (variant3 == 'Select'+this.name3) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
            this.selectedVariant3 = variant3;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 3 && variant3 != 'Select'+this.name3) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }
            this.lockBuyButton = true;

        } else {
            // if (variant3 != 'PleaseSelect') {
            //     this.selection3.push({ 'vType': 'Please Select' });
            // }
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[2].vType == variant3 && this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 && this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selection3.push({ 'vType': this.foodInfo.variants[i].selection[3].vType });
                }
            }
            this.selection3 = _.uniqBy(this.selection3, 'vType');
        }
    };
    changeVariant4(variant4) {
        //for IE specific issue
        variant4 = variant4.replace(/\s/g, '');

        if (variant4) {
            if (variant4 == 'Select'+this.name4) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
            this.selectedVariant4 = variant4;
            this.selectedVariant.buyQuantity = '';

        }

        if (this.foodInfo.selection.length == 4 && variant4 != 'Select'+this.name4) {


            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3 &&
                    this.foodInfo.variants[i].selection[3].vType == this.selectedVariant4) {
                    this.selectedVariant = this.foodInfo.variants[i];

                }
            }
            this.lockBuyButton = true;
        }
    };

    //increase decrease
    descrease() {
        if (this.selectedVariant.buyQuantity > 1) {
            this.selectedVariant.buyQuantity--
        }
    }
    increase() {
        this.selectedVariant.buyQuantity++
    }



    // Check buyQty input value.
    // If buyQty value is less than or equal Selected-Variant-Qty, Buy Button Enable
    changeBuyQuantity(buyQty) {

        // default : Buy button set as Disable
        this.isBuyBtnDisable = true;

        // if buyQty value greater than 0
        if (buyQty > 0) {
            // Get Selected-Variant-Qty value
            var selectVariantAvailableQty = this.selectedVariant.quantity;
            //If quantity is unlimited enable buy button
            if (this.selectedVariant.unlimited == true) {
                this.isBuyBtnDisable = false;
            }
            else if (typeof selectVariantAvailableQty != 'undefined') {
                // If buyQty less than or equal Selected-Variant-Qty, buy button enable
                if (buyQty <= selectVariantAvailableQty) {
                    this.isBuyBtnDisable = false;
                }
            }
        }
    };
    open(data) {
        if(!this.isBuyBtnDisable){
            this.dialogVariants = data;
            $('#myModal').modal('show')
        }
    }
    close() {
        $('#myModal').modal('hide')
    }

    goToHome() {
        $('#myModal').on('hidden.bs.modal', (e) => {
            this.route.navigate(['home']);
        })
    }
    goToCart() {
        $('#myModal').on('hidden.bs.modal', (e) => {
            this.route.navigate(['cart']);
        })
    }

    addToCart(navi) {
        if(this.isBuyBtnDisable){
            if(!(this.selectedVariant.buyQuantity > this.selectedVariant.quantity && this.selectedVariant.quantity > 1)){
                this.ifNotSelectedVariantOrQuantity = true;
                setTimeout(() => {
                     this.ifNotSelectedVariantOrQuantity = false;
                }, 3100)
            }
        }else if (this.selectedVariant.buyQuantity == null) {
            console.log(' error please select buy quantity');
        }else {
            if (this.dataService.cart.cartItems.length != 0) {
                var i = 0;
                while (i < this.dataService.cart.cartItems.length) {
                    if (this.foodInfo.id == this.dataService.cart.cartItems[i].id && this.selectedVariant.sku == this.dataService.cart.cartItems[i].sku) {
                        this.dataService.position2 = false;
                        //increasing weight when we add same product again.
                        this.dataService.cart.cartItems[i].totWeight += this.selectedVariant.weight * this.selectedVariant.buyQuantity;
                        this.dataService.cart.cartItems[i].qty += this.selectedVariant.buyQuantity;
                        this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                        this.parentobj.cartSize = this.dataService.cart.cartSize;
                        this.dataService.parseWeight = this.selectedVariant.weight;
                        // $state.go('app.category');
                        if (navi == "buyNowCart") {
                            this.route.navigate(['cart']);
                        }
                        break;
                    }
                    else if (i == (this.dataService.cart.cartItems.length - 1)) {
                        this.dataService.position2 = true;
                        this.dataService.cart.cartItems.push({
                            id: this.foodInfo.id,
                            name: this.foodInfo.name,
                            qty: this.selectedVariant.buyQuantity,
                            sku: this.selectedVariant.sku,
                            totWeight: this.selectedVariant.weight * this.selectedVariant.buyQuantity,
                            price: Math.round(this.selectedVariant.price * 100) / 100,
                            total: Math.round(this.selectedVariant.price * 100) / 100,
                            imgURL: this.selectedVariant.imageUrl,
                            imgDefault: this.Data.tempImageArray[this.Data.defaultImage].img,
                            variant: this.selectedVariant.selection,
                            totalQty: this.selectedVariant.quantity,
                            unlimited: this.selectedVariant.unlimited,
                            weight: this.selectedVariant.weight,  //(new) added weight of each product
                            type: this.Data.mainType

                        });
                        this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                        this.parentobj.cartSize = this.dataService.cart.cartSize;
                        this.dataService.parseWeight = this.selectedVariant.weight;
                        //  $state.go('app.category');
                        if (navi == "buyNowCart") {
                            this.route.navigate(['cart']);
                        }
                        break;
                    }
                    i++;
                }
                if (this.dataService.appUserId) {
                    this.localStorageService.set("cart" + this.dataService.appUserId, (this.dataService.cart));
                }else{
                    this.localStorageService.set("cartUnknownUser", (this.dataService.cart));
                }
            }
            else {

                this.dataService.cart.cartItems.push({
                    id: this.foodInfo.id,
                    name: this.foodInfo.name,
                    qty: this.selectedVariant.buyQuantity,
                    sku: this.selectedVariant.sku,
                    totWeight: this.selectedVariant.weight * this.selectedVariant.buyQuantity,
                    price: Math.round(this.selectedVariant.price * 100) / 100,
                    total: Math.round(this.selectedVariant.price * 100) / 100,
                    imgURL: this.selectedVariant.imageUrl,
                    imgDefault: this.Data.tempImageArray[this.Data.defaultImage].img,
                    variant: this.selectedVariant.selection,
                    totalQty: this.selectedVariant.quantity,
                    unlimited: this.selectedVariant.unlimited,
                    weight: this.selectedVariant.weight, //(new) added weight of each product
                    type: this.Data.mainType
                });
                this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                this.parentobj.cartSize = this.dataService.cart.cartSize;
                this.dataService.parseWeight = this.selectedVariant.weight;
                // $state.go('app.category');

                if (this.dataService.appUserId) {
                    this.localStorageService.set("cart" + this.dataService.appUserId, (this.dataService.cart));
                }else{
                    this.localStorageService.set("cartUnknownUser", (this.dataService.cart));
                }
                if (navi == "buyNowCart") {
                    this.route.navigate(['cart']);
                }
            }
        }

    };
}

