import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { ProductsService } from '../../services/products/products.service';
declare var $: any;
var gallaryThis;
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit {

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
    private templateName = (<any>data).templateName;
    selection = [];
    private selection1 = [];
    private selection2 = [];
    private selection3 = [];
    Data;
    isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    lockBuyButton = false;
    dialogVariants;
    discountAvailable = false;
    oldPrice; newPrice;
    promoData = [];
    todayDate;
    api;
    private imageArray = [];

    imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    bannerImageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=banner';
    readMore: boolean;
    desPart1; desPart2; desPart1_demo;
    name1; name2; name3; name4;
    ifNotSelectedVariantOrQuantity: boolean;
    availableFirstVariPromo = false;
    private player: Player;
    zoomRatio;
    errBuy = false;
    message;
    responce;
    private prodId;
    constructor(private localStorageService: LocalStorageService, private currencyService: CurrencyService,
        private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute,
        private route: Router, private title: TitleService, private productsService: ProductsService) {
      this.Data = {
        tempImageArray : []
      }
      this.router.params.subscribe(params => {
        this.catName = params['catName'];
        this.prodId = params['prodId'];
      });

      if(this.templateName == "smartfit"){
            this.zoomRatio = 1.5;
        }else{
            this.zoomRatio = 1;
        }
        this.productsService.getSalesAndPromoData(this.appId).subscribe(data => {

            data.forEach(element => {
                element.selectedProduct.forEach(variants => {

                    variants.fromDate = element.dateFrom;
                    variants.toDate = element.dateTo;

                    if (element.discountType == 'discountValue') {
                        variants.discountType = element.discountType;
                        variants.discount = element.discount
                    } else {
                        variants.discountType = element.discountType;
                        variants.discount = element.discountPercent
                    }

                    this.promoData.push(variants);
                });
            });
            this.dataService.promoData = this.promoData;
        });

      this.title.changeTitle('Details');
      window.scrollTo(0, 0);

    }

    currency: string;
    tests;

    readLessFunct() {
      this.desPart2 = this.Data.detailedDesc.slice(400, this.Data.detailedDesc.length);
      this.desPart1 = this.Data.detailedDesc.slice(0, 400) + "...";
      this.desPart1_demo = this.Data.detailedDesc.slice(0, 400);
      this.readMore = true;
    }

    readMoreFunct() {
        this.desPart1 = this.desPart1_demo.concat(this.desPart2);
        this.readMore = false;

    }
    checkUrl(url) {

        let id,URL;
        let res = url.slice(8);
        let res2 = res.split(/\/|&|=/);
        if (res2.length > 2) {
            id = res2[2];
        }else{
            id = res2[1];
        }
        return id;
    }

    ngOnInit() {

        let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)

        if (appUser) {
            this.dataService.appUserId = appUser.registeredUser;
        }

        this.currencyService.getCurrencies().subscribe(data => {
            this.currency = data.sign;
        }, error => {
            console.log('Error retrieving currency');
        });


    }

    ngAfterViewInit() {
      this.productsService.getProductById(this.prodId).subscribe(product => {
        this.Data = product;
        this.init();
        setTimeout(function(){
          this.api = $("#gallery").unitegallery({
            theme_enable_text_panel: false,
            gallery_background_color: "rgba(0,0,0,0)",
            slider_scale_mode: "fit",
            slider_textpanel_bg_color:"#000000",
            slider_textpanel_bg_opacity: 0,
            gallery_autoplay:true,
            theme_hide_panel_under_width: null,
            slider_zoom_max_ratio: this.zoomRatio,
            slider_scale_mode_media: 'fit',
            slider_scale_mode_fullscreen: 'down',
            gallery_width:900,							//gallery width
            gallery_height:600,							//gallery height
            gallery_max_width: 900,						//gallery minimal width when resizing
            gallery_min_width: 150,
            gallery_min_height: 600,
          });
          gallaryThis = this;
          $('#gallery').on({
            'touchstart' : function(){
              this.api.stop();
            }
          });
        }, 0);
      }, error => {
        console.log('Error retrieving products' + error);
      });
    }


    init() {
      this.isBuyBtnDisable = true;
      if (this.Data.detailedDesc.length > 400) {
        this.desPart2 = this.Data.detailedDesc.slice(400, this.Data.detailedDesc.length);
        this.desPart1 = this.Data.detailedDesc.slice(0, 400) + "...";
        this.desPart1_demo = this.Data.detailedDesc.slice(0, 400);
        this.readMore = true;

      } else {
        this.desPart1 = this.Data.detailedDesc;
      }

        var d = new Date();
        var str = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        this.todayDate = new Date(str);
        // this.promoData = this.dataService.promoData;


        if (this.Data.selection.length == 1) {
            this.name1 = this.Data.selection[0].name;
        }
        if (this.Data.selection.length == 2) {
            this.name1 = this.Data.selection[0].name;
            this.name2 = this.Data.selection[1].name;
        }
        if (this.Data.selection.length == 3) {
            this.name1 = this.Data.selection[0].name;
            this.name2 = this.Data.selection[1].name;
            this.name3 = this.Data.selection[2].name;
        }
        if (this.Data.selection.length == 4) {
            this.name1 = this.Data.selection[0].name;
            this.name2 = this.Data.selection[1].name;
            this.name3 = this.Data.selection[2].name;
            this.name4 = this.Data.selection[3].name;
        }

        if (this.Data) {
            this.foodInfo = this.Data;
            this.images = this.Data.tempImageArray;

            if (this.Data.variants.length > 0) {
                this.selectedVariant = this.Data.variants[0];
                this.selection = [];
                this.selection1 = [];
                this.selection2 = [];
                this.selection3 = [];
                if (this.Data.selection.length == 2) {
                    this.selection1.push({ 'vType': 'Select ' + this.name2 });
                } else if (this.Data.selection.length == 3) {
                    this.selection1.push({ 'vType': 'Select ' + this.name2 });
                    this.selection2.push({ 'vType': 'Select ' + this.name3 });
                } else if (this.Data.selection.length == 4) {
                    this.selection1.push({ 'vType': 'Select ' + this.name2 });
                    this.selection2.push({ 'vType': 'Select ' + this.name3 });
                    this.selection3.push({ 'vType': 'Select ' + this.name4 });
                }
                this.selection.push({ 'vType': 'Select ' + this.name1 });
                for (var i = 0; i < this.foodInfo.variants.length; i++) {
                    this.selection.push({ 'vType': this.foodInfo.variants[i].selection[0].vType });
                }

                var percentagePrice;

                if (this.dataService.promoData.length > 0) {
                    if (this.foodInfo.selection.length == 1) {
                        if (this.foodInfo.variants.length == 1) {
                            for (let i = 0; i < this.dataService.promoData.length; i++) {
                                if (this.dataService.promoData[i].sku == this.foodInfo.variants[0].sku) {
                                    if (new Date(this.dataService.promoData[i].toDate) >= this.todayDate) {
                                        this.availableFirstVariPromo = true;
                                        if (this.dataService.promoData[i].discountType == "discountValue") {
                                            this.oldPrice = this.selectedVariant.price;
                                            this.newPrice = this.selectedVariant.price - this.dataService.promoData[i].discount;
                                        } else {
                                            this.oldPrice = this.selectedVariant.price;
                                            percentagePrice = this.selectedVariant.price * (this.dataService.promoData[i].discount / 100);
                                            this.newPrice = this.selectedVariant.price - percentagePrice;
                                        }
                                    }
                                    break;
                                }

                            };
                        }

                    }
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
        this.lockBuyButton = false;
        this.discountAvailable = false;
        this.selection1 = [];
        this.selection2 = [];
        this.selection3 = [];

        if (this.Data.selection.length == 2) {
            this.selection1.push({ 'vType': 'Select ' + this.name2 });
        } else if (this.Data.selection.length == 3) {
            this.selection1.push({ 'vType': 'Select ' + this.name2 });
            this.selection2.push({ 'vType': 'Select ' + this.name3 });
        } else if (this.Data.selection.length == 4) {
            this.selection1.push({ 'vType': 'Select ' + this.name2 });
            this.selection2.push({ 'vType': 'Select ' + this.name3 });
            this.selection3.push({ 'vType': 'Select ' + this.name4 });
        }

        // variant1 = variant1.replace(/\s/g, '');

        if (variant1) {
            this.selectedVariant1 = variant1;
            this.selectedVariant2 = null;
            this.selectedVariant.buyQuantity = null;
            if (variant1 == "Select" + this.name1 || this.selectedVariant.buyQuantity == null) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
        }

        if (this.foodInfo.selection.length == 1 && variant1 != 'Select' + this.name1) {

            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {
                    this.selectedVariant = this.foodInfo.variants[i];


                }
            }

            var BreakException = {};
            var percentagePrice;

            try {

                this.promoData.forEach(prod => {
                    if (prod.sku == this.selectedVariant.sku) {

                        if (new Date(prod.toDate) >= this.todayDate) {
                            this.discountAvailable = true
                            if (prod.discountType == "discountValue") {
                                this.oldPrice = this.selectedVariant.price;
                                this.newPrice = this.selectedVariant.price - prod.discount;
                                throw BreakException;
                            } else {
                                this.oldPrice = this.selectedVariant.price;
                                percentagePrice = this.selectedVariant.price * (prod.discount / 100);
                                this.newPrice = this.selectedVariant.price - percentagePrice;
                                throw BreakException;
                            }
                        }
                    }
                });

            } catch (e) {
                if (e !== BreakException) throw e;
            }

            if(this.imageArray.indexOf(this.selectedVariant.imageUrl) != -1){
              gallaryThis.api.selectItem(this.imageArray.indexOf(this.selectedVariant.imageUrl));
              gallaryThis.api.stop();
            }else{
              gallaryThis.api.selectItem(this.Data.defaultImage);
              gallaryThis.api.stop();
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
        this.lockBuyButton = false;
        this.discountAvailable = false;
        this.selection2 = [];
        this.selection3 = [];
        if (this.Data.selection.length == 2) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
        } else if (this.Data.selection.length == 3) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select ' + this.name3 });
        } else if (this.Data.selection.length == 4) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            this.selection2.push({ 'vType': 'Select ' + this.name3 });
            this.selection3.push({ 'vType': 'Select ' + this.name4 });
        }
        //for IE specific issue
        // variant2 = variant2.replace(/\s/g, '');

        if (variant2) {
            this.selectedVariant2 = variant2;
            this.selectedVariant.buyQuantity = null;
            if (variant2 == "Select" + this.name2 || this.selectedVariant.buyQuantity == null) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
        }

        if (this.foodInfo.selection.length == 2 && variant2 != 'Select' + this.name2) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }

            var BreakException = {};
            var percentagePrice;

            try {

                this.promoData.forEach(prod => {
                    if (prod.sku == this.selectedVariant.sku) {
                        if (new Date(prod.toDate) >= this.todayDate) {

                            this.discountAvailable = true
                            if (prod.discountType == "discountValue") {
                                this.oldPrice = this.selectedVariant.price;
                                this.newPrice = this.selectedVariant.price - prod.discount;
                                throw BreakException;
                            } else {
                                this.oldPrice = this.selectedVariant.price;
                                percentagePrice = this.selectedVariant.price * (prod.discount / 100);
                                this.newPrice = this.selectedVariant.price - percentagePrice;
                                throw BreakException;
                            }
                        }
                    }
                });

            } catch (e) {
                if (e !== BreakException) throw e;
            }

            if(this.imageArray.indexOf(this.selectedVariant.imageUrl) != -1){
              gallaryThis.api.selectItem(this.imageArray.indexOf(this.selectedVariant.imageUrl));
              gallaryThis.api.stop();
            }else{
              gallaryThis.api.selectItem(this.Data.defaultImage);
              gallaryThis.api.stop();
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
        this.lockBuyButton = false;
        this.discountAvailable = false;
        // for IE specific issue
        // variant3 = variant3.replace(/\s/g, '');
        this.selection3 = [];
        if (this.Data.selection.length == 2) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
        } else if (this.Data.selection.length == 3) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            // this.selection2.push({ 'vType': 'Select '+this.name3 });
        } else if (this.Data.selection.length == 4) {
            // this.selection1.push({ 'vType': 'Select '+this.name2 });
            // this.selection2.push({ 'vType': 'Select '+this.name3 });
            this.selection3.push({ 'vType': 'Select ' + this.name4 });
        }

        if (variant3) {
            this.selectedVariant3 = variant3;
            this.selectedVariant.buyQuantity = null;
            if (variant3 == 'Select' + this.name3 || this.selectedVariant.buyQuantity == null) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
        }

        if (this.foodInfo.selection.length == 3 && variant3 != 'Select' + this.name3) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }
            var BreakException = {};
            var percentagePrice;

            try {

                this.promoData.forEach(prod => {
                    if (prod.sku == this.selectedVariant.sku) {
                        if (new Date(prod.toDate) >= this.todayDate) {
                            this.discountAvailable = true
                            if (prod.discountType == "discountValue") {
                                this.oldPrice = this.selectedVariant.price;
                                this.newPrice = this.selectedVariant.price - prod.discount;
                                throw BreakException;
                            } else {
                                this.oldPrice = this.selectedVariant.price;
                                percentagePrice = this.selectedVariant.price * (prod.discount / 100);
                                this.newPrice = this.selectedVariant.price - percentagePrice;
                                throw BreakException;
                            }
                        }
                    }
                });

            } catch (e) {
                if (e !== BreakException) throw e;
            }

            if(this.imageArray.indexOf(this.selectedVariant.imageUrl) != -1){
              gallaryThis.api.selectItem(this.imageArray.indexOf(this.selectedVariant.imageUrl));
              gallaryThis.api.stop();
            }else{
              gallaryThis.api.selectItem(this.Data.defaultImage);
              gallaryThis.api.stop();
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
        this.lockBuyButton = false;
        this.discountAvailable = false;
        //for IE specific issue
        // variant4 = variant4.replace(/\s/g, '');

        if (variant4) {
            this.selectedVariant4 = variant4;
            this.selectedVariant.buyQuantity = null;
            if (variant4 == 'Select' + this.name4 || this.selectedVariant.buyQuantity == null) {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
        }

        if (this.foodInfo.selection.length == 4 && variant4 != 'Select' + this.name4) {


            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3 &&
                    this.foodInfo.variants[i].selection[3].vType == this.selectedVariant4) {
                    this.selectedVariant = this.foodInfo.variants[i];

                }
            }

            var BreakException = {};
            var percentagePrice;

            try {

                this.promoData.forEach(prod => {
                    if (prod.sku == this.selectedVariant.sku) {
                        if (new Date(prod.toDate) >= this.todayDate) {
                            this.discountAvailable = true
                            if (prod.discountType == "discountValue") {
                                this.oldPrice = this.selectedVariant.price;
                                this.newPrice = this.selectedVariant.price - prod.discount;
                                throw BreakException;
                            } else {
                                this.oldPrice = this.selectedVariant.price;
                                percentagePrice = this.selectedVariant.price * (prod.discount / 100);
                                this.newPrice = this.selectedVariant.price - percentagePrice;
                                throw BreakException;
                            }
                        }
                    }
                });

            } catch (e) {
                if (e !== BreakException) throw e;
            }

            if(this.imageArray.indexOf(this.selectedVariant.imageUrl) != -1){
              gallaryThis.api.selectItem(this.imageArray.indexOf(this.selectedVariant.imageUrl));
              gallaryThis.api.stop();
            }else{
              gallaryThis.api.selectItem(this.Data.defaultImage);
              gallaryThis.api.stop();
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
            // If quantity is unlimited enable buy button
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
        if (!this.lockBuyButton) {

            this.errBuy = true;
            if (this.Data.selection.length == 1) {
                this.message = "Please select the " + this.name1 + " and the Quantity";
            }else if (this.Data.selection.length == 2) {
                this.message = "Please select the " + this.name1 + ", " + this.name2 + " and the Quantity";
            } else if (this.Data.selection.length == 3) {
                this.message = "Please select the " + this.name1 + ", " + this.name2 + ", " + this.name3 + " and the Quantity";
            } else if (this.Data.selection.length == 4) {
                this.message = "Please select the " + this.name1 + ", " + this.name2 + ", " + this.name3 + ", " + this.name4 + " and the Quantity";
            }
            window.setTimeout(() => {
                $(".alert-warning").fadeTo(500, 0).slideUp(500, ()=>{
                    $(this).remove();
                    this.errBuy = false;
                });
            }, 2000);
            return;
        }else if(this.selectedVariant.buyQuantity == null){

            this.errBuy = true;
            this.message = "Please select the Colour and the Quantity";
            window.setTimeout(() => {
                $(".alert-warning").fadeTo(500, 0).slideUp(500, ()=>{
                    $(this).remove();
                    this.errBuy = false;
                });
            }, 2000);
            return;
        } else {
            this.dialogVariants = data;
            $('#myModal').modal('show');
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

        this.productsService.checkProduct(this.foodInfo.id, this.selectedVariant.sku, this.foodInfo.name, this.selectedVariant.quantity).subscribe(data => {

            if (data.status == 200) {

              if (!this.lockBuyButton) {

                  this.errBuy = true;
                  if (this.Data.selection.length == 1) {
                      this.message = "Please select the " + this.name1 + " and the Quantity";
                  }else if (this.Data.selection.length == 2) {
                      this.message = "Please select the " + this.name1 + ", " + this.name2 + " and the Quantity";
                  } else if (this.Data.selection.length == 3) {
                      this.message = "Please select the " + this.name1 + ", " + this.name2 + ", " + this.name3 + " and the Quantity";
                  } else if (this.Data.selection.length == 4) {
                      this.message = "Please select the " + this.name1 + ", " + this.name2 + ", " + this.name3 + ", " + this.name4 + " and the Quantity";
                  }
                  window.setTimeout(() => {
                      $(".alert-danger").fadeTo(500, 0).slideUp(500, ()=>{
                          $(this).remove();
                          this.errBuy = false;
                      });
                  }, 2000);
                  return;
              }else if(this.selectedVariant.buyQuantity == null){

                  this.errBuy = true;
                  this.message = "Please select the Colour and the Quantity";
                  window.setTimeout(() => {
                      $(".alert-danger").fadeTo(500, 0).slideUp(500, ()=>{
                          $(this).remove();
                          this.errBuy = false;
                      });
                  }, 2000);
                  return;
              } else {

                  this.errBuy = false;
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
                                  price: this.discountAvailable == true ? this.newPrice : Math.round(this.selectedVariant.price * 100) / 100,
                                  total: this.discountAvailable == true ? this.newPrice : Math.round(this.selectedVariant.price * 100) / 100,
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
                      } else {
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
                          price: this.discountAvailable == true ? this.newPrice : Math.round(this.selectedVariant.price * 100) / 100,
                          total: this.discountAvailable == true ? this.newPrice : Math.round(this.selectedVariant.price * 100) / 100,
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
                      } else {
                          this.localStorageService.set("cartUnknownUser", (this.dataService.cart));
                      }
                      if (navi == "buyNowCart") {
                          this.route.navigate(['cart']);
                      }
                  }
              }
           } else {
                this.responce = data.name;
                $('#unavailableProd').modal('show');
            }
        });
    };
}

