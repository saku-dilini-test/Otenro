import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import * as _ from 'lodash';
import { CurrencyService } from '../../services/currency/currency.service';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'app-product',
    templateUrl: './app/page-body/product/product.component.html',
    styleUrls: ['./app/page-body/product/product.component.css'],
})
export class ProductComponent implements OnInit {

    private catName;
    private foodInfo;
    private images;
    private selectedVariant: any;
    private selectedVariant1;
    private selectedVariant2;
    private selectedVariant3;
    private selectedVariant4;
    private sign;
    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    private selection = [];
    private selection1 = [];
    private selection2 = [];
    private selection3 = [];
    private Data;
    private isBuyBtnDisable:boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    private lockBuyButton = false;

    private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    constructor(private CurrencyService: CurrencyService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router,private title: TitleService) {

        this.Data = this.dataService.data;
        this.init();
        this.isBuyBtnDisable = true;
    }

    currency: string;

    ngOnInit() {

        this.CurrencyService.getCurrencies().subscribe(data => {
            this.currency = data.currency;
        }, error => {
            console.log('Error retrieving currency');
        });

        this.router.params.subscribe(params => {
            this.catName = params['catName'];
        });


    }


    init() {
        if (this.Data) {
            this.foodInfo = this.Data;
            this.title.changeTitle(this.foodInfo.name);
            this.images = this.Data.tempImageArray;

            if (this.Data.variants.length > 0) {
                this.selectedVariant = this.Data.variants[0];
                this.selection = [];
                this.selection1 = [];
                this.selection2 = [];
                this.selection3 = [];
                this.selection.push({ 'vType': 'Please Select' });
                for (var i = 0; i < this.foodInfo.variants.length; i++) {
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

    changeVariant(variant1) {
        this.lockBuyButton = false;
        this.selection1 = [];
        this.selection2 = [];
        this.selection3 = [];

        if(variant1){
        this.selectedVariant1 = variant1;
        this.selectedVariant2 = null;
        this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 1) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {
                    this.selectedVariant = this.foodInfo.variants[i];

                    this.lockBuyButton = true;
                }
            }
        } else {

            if(variant1 == "Please Select"){
            }else{
                this.selection1.push({ 'vType': 'Please Select' });
            }

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
        this.selection2 = [];
        this.selection3 = [];

        if (variant2) {
            this.selectedVariant2 = variant2;
            this.selectedVariant.buyQuantity = '';

        }

        if (this.foodInfo.selection.length == 2) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selectedVariant = this.foodInfo.variants[i];
                    this.lockBuyButton = true;
                }
            }

        } else {
            this.selection2.push({ 'vType': 'Please Select' });
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
        this.selection3 = [];

        if (variant3) {
            this.selectedVariant3 = variant3;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 3) {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3) {
                    this.selectedVariant = this.foodInfo.variants[i];
                    this.lockBuyButton = true;
                }
            }
        } else {
            this.selection3.push({ 'vType': 'Please Select' });
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[2].vType == variant3 && this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 && this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selection3.push({ 'vType': this.foodInfo.variants[i].selection[3].vType });
                }
            }
            this.selection3 = _.uniqBy(this.selection3, 'vType');
        }
    };
    changeVariant4(variant4) {
        if (variant4) {
            this.selectedVariant4 = variant4;
            this.selectedVariant.buyQuantity = '';

        }

        for (var i = 0; i < this.foodInfo.variants.length; i++) {
            if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3 &&
                this.foodInfo.variants[i].selection[3].vType == this.selectedVariant4) {
                this.selectedVariant = this.foodInfo.variants[i];
                this.lockBuyButton = true;

            }
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


    addToCart() {
        if (this.selectedVariant.buyQuantity == null) {
            console.log(' error');
        } else {
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
                        this.route.navigate(['home']);
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
                            price: this.selectedVariant.price,
                            total: this.selectedVariant.price,
                            imgURL: this.Data.tempImageArray,
                            variant: this.selectedVariant.selection,
                            totalQty: this.selectedVariant.quantity,
                            weight: this.selectedVariant.weight  //(new) added weight of each product

                        });
                        this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                        this.parentobj.cartSize = this.dataService.cart.cartSize;
                        this.dataService.parseWeight = this.selectedVariant.weight;
                        //  $state.go('app.category');
                        this.route.navigate(['home']);
                        break;
                    }
                    i++;
                }
            }
            else {
                this.dataService.cart.cartItems.push({
                    id: this.foodInfo.id,
                    name: this.foodInfo.name,
                    qty: this.selectedVariant.buyQuantity,
                    sku: this.selectedVariant.sku,
                    totWeight: this.selectedVariant.weight * this.selectedVariant.buyQuantity,
                    price: this.selectedVariant.price,
                    total: this.selectedVariant.price,
                    imgURL: this.Data.tempImageArray,
                    variant: this.selectedVariant.selection,
                    totalQty: this.selectedVariant.quantity,
                    weight: this.selectedVariant.weight //(new) added weight of each product

                });
                this.dataService.cart.cartSize = this.dataService.cart.cartItems.length;
                this.parentobj.cartSize = this.dataService.cart.cartSize;
                this.dataService.parseWeight = this.selectedVariant.weight;
                // $state.go('app.category');
                this.route.navigate(['home']);

            }
        }

    };
}

