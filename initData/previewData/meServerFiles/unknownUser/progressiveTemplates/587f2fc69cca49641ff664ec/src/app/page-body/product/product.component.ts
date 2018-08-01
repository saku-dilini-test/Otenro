import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import * as _ from 'lodash';
import { TitleService } from '../../services/title.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { ProductsService } from '../../services/products/products.service';
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
    private player:any;
    results
    private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';

    constructor(private productService: ProductsService,private sanitizer: DomSanitizer,private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private title: TitleService) {

        this.Data = this.dataService.data;
    }

    ngAfterViewInit() {
        $(".carousel").swipe({

            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

              if (direction == 'left') $(this).carousel('next');
              if (direction == 'right') $(this).carousel('prev');

            },
            allowPageScroll:"vertical"

          });
    }

    click(index){
        // $('#video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        console.log($('#video'+index)[0])
        }

    ngOnInit() {

        this.router.params.subscribe(params => {
            this.catName = params['catName'];
            if(this.catName){
              this.productService.createArticleViewDataInfo(this.catName).subscribe(data => {
                  // Read the result field from the JSON response.
                  this.results = data;
                },
                error => {
                  console.log('Error on create record');
                });
            }
        });

        $(() => {
            var carouselEl = $('.carousel');
            var carouselItems = carouselEl.find('.item');
            carouselEl.carousel({
                interval: 10000000
            }).on('slid.bs.carousel', (event) => {
                console.log(event);
                let index:any;
                let playerIndex;

                if (event.direction == 'right') {

                    if (carouselItems.siblings('.active').index() == (this.Data.tempImageArray.length - 1)) {
                        // console.log('inside if');
                        playerIndex = 0;
                        index = this.Data.tempImageArray.length - 1
                        // document.getElementById('player' + playerIndex).style.display = 'none';
                        // document.getElementById('image' + playerIndex).style.display = 'block';
                        // if(this.Data.tempImageArray[index].videoUrl){
                        //     $('#video'+index)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                        // }
                        // this.click(index);
                        // $('.myVideoClass').each(()=>{
                        //     $(this).stopVideo();
                        //   });
                    } else {
                        // console.log('inside else');
                        if (carouselItems.siblings('.active').index() == -1) {
                            index = 0;
                            playerIndex = index + 1;
                        } else {
                            index = carouselItems.siblings('.active').index();
                            playerIndex = index + 1;
                        }
                        // document.getElementById('player' + playerIndex).style.display = 'none';
                        // document.getElementById('image' + playerIndex).style.display = 'block';

                        if(this.Data.tempImageArray[playerIndex].videoUrl && index != this.Data.tempImageArray.length ){
                            $('#video'+playerIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                            this.click(playerIndex);
                        }
                        // $('.myVideoClass').each(()=>{
                        //     $(this).stopVideo();
                        //   });
                    }

                } else {
                    console.log('im in');

                    if (carouselItems.siblings('.active').index() == -1) {
                        index = 0;
                        playerIndex = this.Data.tempImageArray.length - 1;
                        // document.getElementById('player' + (this.Data.tempImageArray.length - 1)).style.display = 'none';
                        // document.getElementById('image' + (this.Data.tempImageArray.length - 1)).style.display = 'block';

                        if(this.Data.tempImageArray[playerIndex].videoUrl && index != 1){
                            $('#video'+playerIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                            this.click(playerIndex);
                        }

                        // $('.myVideoClass').each(()=>{
                        //     $(this).stopVideo();
                        //   });

                    } else {
                        index = carouselItems.siblings('.active').index();
                        playerIndex = index - 1;
                        // document.getElementById('player' + (index - 1)).style.display = 'none';
                        // document.getElementById('image' + (index - 1)).style.display = 'block';

                        if(this.Data.tempImageArray[playerIndex].videoUrl && index != 1){
                            $('#video'+playerIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                            this.click(playerIndex);
                        }
                                                // $('.myVideoClass').each(()=>{
                        //     $(this).stopVideo();
                        //   });
                    }

                }

                console.log(index);
            })
        })



    }


}

