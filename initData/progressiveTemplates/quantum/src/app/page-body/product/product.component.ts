import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import * as _ from 'lodash';
import { CurrencyService } from '../../services/currency/currency.service';
import { TitleService } from '../../services/title.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as Player from '@vimeo/player';

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
    private isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    private lockBuyButton = false;
    private dialogVariants;
    private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
    private player: Player;

    constructor(public sanitizer: DomSanitizer, private CurrencyService: CurrencyService, private http: HttpClient, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private title: TitleService) {
        this.sanitizer = sanitizer;
        this.Data = this.dataService.data;
        this.init();
        this.isBuyBtnDisable = true;
        console.log(this.Data.tempImageArray);
    }

    cleanURL(oldURL: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }

    currency: string;
    clicked = false;
    slided = false;
    tests;
    @ViewChild('iframePlayer') playerContainer;

    ngOnInit() {
        this.CurrencyService.getCurrencies().subscribe(data => {
            this.currency = data.sign;
        }, error => {
            console.log('Error retrieving currency');
        });

        this.router.params.subscribe(params => {
            this.catName = params['catName'];
        });

        $(() => {
            var carouselEl = $('.carousel');
            var carouselItems = carouselEl.find('.item');
            carouselEl.carousel({
                interval: 100000
            }).on('slid.bs.carousel', (event) => {
                console.log(event);
                let index;
                let playerIndex;

                if (event.direction == 'right') {

                    if (carouselItems.siblings('.active').index() == (this.Data.tempImageArray.length - 1)) {
                        // console.log('inside if');
                        playerIndex = 0;
                        index = this.Data.tempImageArray.length - 1
                        document.getElementById('player' + playerIndex).style.display = 'none';
                        document.getElementById('image' + playerIndex).style.display = 'block';

                        var iframePlayer = new Player('player' + playerIndex);
                        iframePlayer.unload().then(function () {
                            // the video was unloaded
                            console.log('player unloaded if');
                        }).catch(function (error) {
                            // an error occurred
                        });

                    } else {
                        // console.log('inside else');
                        index = carouselItems.siblings('.active').index();
                        if (carouselItems.siblings('.active').index() == -1) {
                            index = 0;
                            playerIndex = index + 1;
                        } else {
                            index = carouselItems.siblings('.active').index();
                            playerIndex = index + 1;
                        }
                        document.getElementById('player' + playerIndex).style.display = 'none';
                        document.getElementById('image' + playerIndex).style.display = 'block';

                        var iframePlayer = new Player('player' + playerIndex);
                        iframePlayer.unload().then(function () {
                            // the video was unloaded
                            console.log('player unloaded else');
                        }).catch(function (error) {
                            // an error occurred
                        });
                    }

                } else {

                    if (carouselItems.siblings('.active').index() == -1) {
                        index = 0;
                        playerIndex = this.Data.tempImageArray.length - 1;
                        document.getElementById('player' + (this.Data.tempImageArray.length - 1)).style.display = 'none';
                        document.getElementById('image' + (this.Data.tempImageArray.length - 1)).style.display = 'block';
                    } else {
                        index = carouselItems.siblings('.active').index();
                        playerIndex = index - 1;
                        document.getElementById('player' + (index - 1)).style.display = 'none';
                        document.getElementById('image' + (index - 1)).style.display = 'block';
                    }

                    // console.log(document.getElementById('image' + index).style);
                    // console.log(document.getElementById('player' + index).style);
                    var iframePlayer = new Player('player' + playerIndex);
                    iframePlayer.unload().then(function () {
                        // the video was unloaded
                        console.log('player unloaded left');
                    }).catch(function (error) {
                        // an error occurred
                    });


                }


                // var iframe = document.querySelector('iframe');
                // // console.log(iframe);
                // var iframePlayer = new Player(iframe);
                // // console.log(iframePlayer);

                // iframePlayer.unload().then(function () {
                //     // the video was unloaded
                //     console.log('player unloaded');
                // }).catch(function (error) {
                //     // an error occurred
                // });
                console.log(index);
            })
        })
        // console.log(this.clicked);
    }

    ngAfterContentChecked() {
    }

    ngAfterViewChecked() {
    }

    ngOnChanges() {
    }

    ngAfterViewInit() {
        this.clicked = false;
        this.slided = true;

        $(".carousel").swipe({

            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

              if (direction == 'left') $(this).carousel('next');
              if (direction == 'right') $(this).carousel('prev');

            },
            allowPageScroll:"vertical"

          });
        // console.log(document.getElementById('iframePlayer'));
        // this.player = new Player(this.playerContainer.nativeElement);
    }

    video(index, id) {

        console.log(index);
        console.log(id);

        // console.log(document.getElementById('image' + index).style.display);
        document.getElementById('image' + index).style.display = 'none';
        document.getElementById('player' + index).style.display = 'block';

        // this.player = new Player(document.getElementById('handstick'));

        // this.player.play().then(function (id) {
        //     // the video successfully loaded
        //     console.log('video successfully loaded');
        // }).catch(function (error) {
        //     switch (error.name) {
        //         case 'TypeError':
        //             // the id was not a number
        //             break;

        //         case 'PasswordError':
        //             // the video is password-protected and the viewer needs to enter the
        //             // password first
        //             break;

        //         case 'PrivacyError':
        //             // the video is password-protected or private
        //             break;

        //         default:
        //             // some other error occurred
        //             break;
        //     }
        // });

        var options = {
            id: id,
            width: 360,
            height: 360,
            loop: true,
            autoplay: true
        };
        if (id) {
            var player = new Player('player' + index,options);
            console.log(player);

            player.ready().then(function () {
                console.log('player is ready');
                // player.getVideoEmbedCode().then(function(embedCode) {
                //     // embedCode = <iframe> embed code
                //     console.log(embedCode);
                // }).catch(function(error) {
                //     // an error occurred
                // });
                // player.loadVideo(id).then(function (id) {

                //     console.log('video loaded');
                //     // player.play();
                //     // the video successfully loaded
                // }).catch(function (error) {
                //     switch (error.name) {
                //         case 'TypeError':
                //             // the id was not a number
                //             break;

                //         case 'PasswordError':
                //             // the video is password-protected and the viewer needs to enter the
                //             // password first
                //             break;

                //         case 'PrivacyError':
                //             // the video is password-protected or private
                //             break;

                //         default:
                //             // some other error occurred
                //             break;
                //     }
                // });
                // player.on('play', function() {
                //     console.log('played the video!');
                // });

                player.play().then(function() {
                    // the video was played
                    console.log('vido played');
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

        // player.setVolume(0);

        // player.on('play',  ()=> {
        //     console.log('played the video!');
        // },err=>{
        //     console.log(err);
        // });

        // var iframe = document.querySelector('iframe');
        // var player = new Player(iframe);

        // this.clicked = true;
        // this.slided = false;

        // this.player.on('play', function () {
        //     console.log('played the video!');
        // });



    }



    init() {
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
        this.selection1 = [];
        this.selection2 = [];
        this.selection3 = [];

        variant1 = variant1.replace(/\s/g, '');

        if (variant1) {
            if (variant1 == "PleaseSelect") {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
            this.selectedVariant1 = variant1;
            this.selectedVariant2 = null;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 1 && variant1 != 'PleaseSelect') {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1) {
                    this.selectedVariant = this.foodInfo.variants[i];


                }
            }
            this.lockBuyButton = true;
        } else {

            if (variant1 == "Please Select") {
            } else {
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
        this.selection2 = [];
        this.selection3 = [];
        //for IE specific issue
        variant2 = variant2.replace(/\s/g, '');

        if (variant2) {
            if (variant2 == "PleaseSelect") {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
            this.selectedVariant2 = variant2;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 2 && variant2 != 'PleaseSelect') {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }
            this.lockBuyButton = true;

        } else {
            if (variant2 != 'PleaseSelect') {
                this.selection2.push({ 'vType': 'Please Select' });
            }
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

        if (variant3) {
            if (variant3 == 'PleaseSelect') {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;
            }
            this.selectedVariant3 = variant3;
            this.selectedVariant.buyQuantity = '';
        }

        if (this.foodInfo.selection.length == 3 && variant3 != 'PleaseSelect') {
            for (var i = 0; i < this.foodInfo.variants.length; i++) {
                if (this.foodInfo.variants[i].selection[0].vType == this.selectedVariant1 &&
                    this.foodInfo.variants[i].selection[1].vType == this.selectedVariant2 &&
                    this.foodInfo.variants[i].selection[2].vType == this.selectedVariant3) {
                    this.selectedVariant = this.foodInfo.variants[i];
                }
            }
            this.lockBuyButton = true;

        } else {
            if (variant3 != 'PleaseSelect') {
                this.selection3.push({ 'vType': 'Please Select' });
            }
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
            if (variant4 == 'PleaseSelect') {
                this.lockBuyButton = false;
                this.isBuyBtnDisable = true;

            }
            this.selectedVariant4 = variant4;
            this.selectedVariant.buyQuantity = '';

        }

        if (this.foodInfo.selection.length == 4 && variant4 != 'PleaseSelect') {


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
    test(data) {
        this.dialogVariants = data;
        $('#myModal').modal('show')
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

        if (this.selectedVariant.buyQuantity == null) {
            console.log(' error please select buy quantity');
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
                        if (navi == "buyNowCart") {
                            this.route.navigate(['cart']);
                        }
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
                if (navi == "buyNowCart") {
                    this.route.navigate(['cart']);
                }
            }
        }

    };
}

