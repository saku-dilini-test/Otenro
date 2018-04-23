import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import * as _ from 'lodash';
import { TitleService } from '../../services/title.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
@Component({
    selector: 'app-product',
    templateUrl: './app/page-body/product/product.component.html',
    styleUrls: ['./app/page-body/product/product.component.css'],
})
export class ProductComponent implements OnInit {

    private catName;
    private foodInfo;
    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    private Data;
    private isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    private lockBuyButton = false;
    private dialogVariants;
    private player;
    private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    constructor(private sanitizer: DomSanitizer,private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private title: TitleService) {

        this.Data = this.dataService.data;
    }

    ngAfterViewInit() {
        const doc = (<any>window).document;
        let playerApiScript = doc.createElement('script');
        playerApiScript.type = 'text/javascript';
        playerApiScript.src = 'https://www.youtube.com/iframe_api';
        doc.body.appendChild(playerApiScript);
    }

    ngOnInit() {

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
                        // document.getElementById('player' + playerIndex).style.display = 'none';
                        // document.getElementById('image' + playerIndex).style.display = 'block';

                        // var iframePlayer = new Player('player' + playerIndex);
                        // iframePlayer.unload().then(function () {
                        //     // the video was unloaded
                        //     console.log('player unloaded if');
                        // }).catch(function (error) {
                        //     // an error occurred
                        // });

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
                        // document.getElementById('player' + playerIndex).style.display = 'none';
                        // document.getElementById('image' + playerIndex).style.display = 'block';

                        // var iframePlayer = new Player('player' + playerIndex);
                        // iframePlayer.unload().then(function () {
                        //     // the video was unloaded
                        //     console.log('player unloaded else');
                        // }).catch(function (error) {
                        //     // an error occurred
                        // });
                    }

                } else {
                    console.log('im in');

                    if (carouselItems.siblings('.active').index() == -1) {
                        index = 0;
                        playerIndex = this.Data.tempImageArray.length - 1;
                        // document.getElementById('player' + (this.Data.tempImageArray.length - 1)).style.display = 'none';
                        // document.getElementById('image' + (this.Data.tempImageArray.length - 1)).style.display = 'block';
                    } else {
                        index = carouselItems.siblings('.active').index();
                        playerIndex = index - 1;
                        // document.getElementById('player' + (index - 1)).style.display = 'none';
                        // document.getElementById('image' + (index - 1)).style.display = 'block';
                    }

                }

                console.log(index);
            })
        })



    }


}

