import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import * as data from '../../../assets/madeEasy.json';
import { SERVER_URL } from '../../../assets/constantsService';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { CurrencyService } from '../../services/currency/currency.service';
declare var $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private imageUrl: any;
  private imageUrl1: any;
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName: any;
  private currentViewName: string;
  private currency: string;

  @Input('categories') categories: CategoriesModel;
  @Input('products') products: any;

  constructor(private router: Router, private dataService: PagebodyServiceModule,private currencyService: CurrencyService) {
    this.currentViewName = 'Home';

  }

  ngOnInit() {

    this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
    this.imageUrl1 = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=thirdNavi";


    this.currencyService.getCurrencies().subscribe(data => {
      this.currency = data.sign;
    }, error => {
      console.log('Error retrieving currency');
    });

  }

  ngAfterContentChecked() {
    $('.carousel').carousel('cycle');
    $('.carousel').carousel({
      interval: 3000
    });
    // $('.right.carousel-control').trigger('click');
  }
  ngOnDestroy() {
    $('.carousel').carousel('pause');
  }


  checkSoldOut(product) {

    let count = 0;
    let isSoldOut = false;
    if (product) {
      let variantsLength = product.variants.length;

      for (let i = 0; i < variantsLength; i++) {
        if (product.variants[i].quantity == 0) {
          count++;
        }
      }

      if (count == variantsLength) {
        isSoldOut = true;
      } else {
        isSoldOut = false;
      }
    }
    return isSoldOut;
  }


  getWidth(index, length) {
    let styles = {
      'width': '100%'
    };
    let vw = window.innerWidth;
    if (vw < 768 && length - 1 === index && length % 2 === 1) {
      return styles;
    }
  }


  owlOptions = {
    loop: false,
    margin: 5,
    stagePadding: 0,
    nav: true,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 4
      }
    }
  }


}

export class CategoriesModel {
  id: number;
  title: string;
  nodes: any[];
}
