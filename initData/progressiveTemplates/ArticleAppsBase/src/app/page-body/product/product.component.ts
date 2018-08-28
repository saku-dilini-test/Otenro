import { Component, OnInit, Input } from '@angular/core';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../../assets/constantsService';
import * as data from '../../../assets/madeEasy.json';
import * as _ from 'lodash';
import { TitleService } from '../../services/title.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductsService } from '../../services/products/products.service';
declare let $:any;
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

    private catName;
    private foodInfo;
    private appId = (<any>data).appId;
    private userId = (<any>data).userId;
    Data;
    private isBuyBtnDisable: boolean;
    private parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
    private lockBuyButton = false;
    private dialogVariants;
    private player: any;
    private results: any; 
    private imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
        + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
    results:any;
    constructor(private productService: ProductsService, private sanitizer: DomSanitizer, private dataService: PagebodyServiceModule, private router: ActivatedRoute, private route: Router, private title: TitleService) {

        this.Data = this.dataService.data;
    }


    ngAfterViewInit() {

      $("#gallery").unitegallery({
        theme_enable_text_panel: false,
        gallery_background_color: "rgba(0,0,0,0)",
        slider_textpanel_bg_color:"#000000",
        slider_textpanel_bg_opacity: 0,
      });
    }



    ngOnInit() {

        this.router.params.subscribe(params => {
            this.catName = params['catName'];
            if (this.catName) {
                this.productService.createArticleViewDataInfo(this.catName).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.results = data;
                },
                    error => {
                        console.log('Error on create record');
                    });
            }
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


}

