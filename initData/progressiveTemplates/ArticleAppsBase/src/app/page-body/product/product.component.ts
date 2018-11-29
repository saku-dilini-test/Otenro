import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as data from '../../../assets/madeEasy.json';
import * as _ from 'lodash';
import { TitleService } from '../../services/title.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductsService } from '../../services/products/products.service';
import {MessageService} from "../../services/message.service";
declare let $:any;
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

    private catName;
    private catId;
    private articleId;
    private foodInfo;
    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    Data;
    api;
    private isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    private lockBuyButton = false;
    private dialogVariants;
    private player: any;
    private imageUrl = this.dataService.getServerURL() + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
    results:any;
    private loadImageCount:number = 0;
    constructor(private productService: ProductsService,
                private sanitizer: DomSanitizer,
                private dataService: PagebodyServiceModule,
                private router: ActivatedRoute,
                private route: Router,
                private title: TitleService,
                private messageService: MessageService) {

        this.Data = this.dataService.data;
        const arr = this.Data.tempImageArray;
        this.title.setLocation('product');
        this.messageService.sendMessage({loadImageCount:-1});
        this.dataService.initialImageCount =  arr?  arr.length : 0;
    }

    setCarousalControlls() {
        $(".ug-zoompanel").css('display', 'none');
        $(".ug-default-button-hidepanel").css('display', 'none');
        $(".ug-default-button-fullscreen-single").css('display', 'none');
        $(".ug-default-button-play-single").css({'right': '2px', 'left': 'unset'});
    }

    loadArticle(catId,articleId){
        if(catId && articleId) {
          console.log("loadArticle for catId: " + catId + " articleId: " + articleId);

          this.dataService.catId = catId;
          this.productService.getProducts().subscribe(articles => {
              console.log("<<<<<<<<Articles>>>>>>>>>");
              // console.log(articles);
              var article = null;
              for (let i = 0; i < articles.length; i++) {
                console.log("articles[i].id=>" + articles[i].id)
                if (articles[i].id === articleId) {
                  article = articles[i];
                }
              }

              if (article) {
                  this.dataService.data = article;
                  this.catName = article.title;
                  this.title.changeTitle(this.catName);
                  this.Data = article;
                  const arr = this.Data.tempImageArray;
                  this.dataService.initialImageCount =  arr?  arr.length : 0;
 		          this.initializeGallery();
                  this.productService.createArticleViewDataInfo(this.catName).subscribe(data => {
                      // Read the result field from the JSON response.
                      this.results = data;
                  },
                      error => {
                          console.log('Error on create record');
                      });

              } else {
                console.log("Article not found for the catId: " + catId + " articleId: " + articleId);
                this.Data.tempImageArray = 0;
              }
            },
            error => {
              console.log('Error shop service');
               this.Data.tempImageArray = 0;
            });
        }
    }


    ngOnInit() {
        console.log("Product. ngOnInit",this.catId,this.articleId);
        this.router.params.subscribe(params => {
            if(params['catName'] != 'fromPushMessage'){
              this.title.changeTitle(params['catName']);
            }else{
            //  write the code to fetch category name
            }
            console.log(this.catId,this.articleId);

            this.articleId = params['articleId'];
            this.catId = params['catId'];

            this.loadArticle(this.catId,this.articleId);
        });
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
    initializeGallery = () => {
        $('#gallery div').remove();

        setTimeout(() => {
            this.setGallery();
        }, 1);
    }

    setGallery = () => {
        //remove all the rendered div tags and just keep the img tags for angular
        this.api = $("#gallery").unitegallery({
            theme_enable_text_panel: false,
            gallery_background_color: "rgba(0,0,0,0)",
            slider_textpanel_bg_color:"#000000",
            slider_textpanel_bg_opacity: 0,
        });
    }

    imageLoaded(e){
      // console.log(e);
      this.loadImageCount += 1;
      this.messageService.sendMessage({loadImageCount:this.loadImageCount});
    }
}
