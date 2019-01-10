import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { CategoriesService } from '../../services/categories/categories.service';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { TitleService } from '../../services/title.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { SliderService } from '../../services/slider/slider.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private catName;
  categories:any;
  products:any;
  primaryCategories:any;
  prevCategories:boolean = false;
  isSliderDataAvailable: boolean = false;
  private sliderData: any;
  header;
  private content;
  private imageUrlSlider;
  private imageUrl;
  private currentCategoryImage;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private dataService: PagebodyServiceModule,
              private categoryService: CategoriesService,
              private title: TitleService,
              private route:ActivatedRoute,
              sliderService: SliderService,
              private http: HttpClient) {

    this.title.changeTitle("Home");

    sliderService.retrieveSliderData().subscribe(data => {
      if (data.length > 0) {
        this.sliderData = data;
        var size = Object.keys(this.sliderData).length;
        if (size > 0) {
          this.isSliderDataAvailable = true;
        } else {
          this.isSliderDataAvailable = false;
        }
      } else {
        this.sliderData = null;
        this.isSliderDataAvailable = false;
      }

    }, err => {
      console.log(err);
    });

    this.route.queryParams.subscribe( params =>{
		if(params.id && params.id != 'Home'){
			this.prevCategories = true;
		}else{
			this.prevCategories = false;
		}
        categoryService.getCategories().subscribe(data => {
			this.primaryCategories = data;
			// console.log(this.primaryCategories,params.id)
            categoryService.getNodeById(this.primaryCategories,params.id).subscribe((result)=>{
				// console.log(result)
				// console.log(this.dataService.categories)
				this.currentCategoryImage = this.dataService.currentCategoryImage;
				this.categories = this.dataService.categories;
				this.products = this.dataService.products;
              });
        });

		if (params['emailID']) {
			this.verifyEmailAddress(params['emailID']);
		}

        window.scrollTo(0, 0);
    });

     this.imageUrlSlider = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=slider";
     this.imageUrl = SERVER_URL + "/templates/viewWebImages?userId="
      + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";

      window.scrollTo(0, 0);
  }

   ngOnInit() {
   setTimeout(function() {
        $('.carousel').carousel('cycle');
     
    }, 3000);

      // let appUser: any = this.localStorageService.get('appLocalStorageUser' + this.appId)
      //
      // if (appUser) {
      //   if (this.localStorageService.get("cart" + appUser.registeredUser)) {
      //     this.dataService.cart = this.localStorageService.get("cart" + appUser.registeredUser);
      //   }
      // }

    }
  navigateSliderProd(val, item) {
    if (item.optionals.length == 2 && item.optionals[0] &&  item.optionals[1] != null) {
      this.catName = item.optionals[0].name;
      this.dataService.data = item.optionals[1];
      localStorage.setItem(this.appId + ":dataServiceData", JSON.stringify(this.dataService.data))
      this.router.navigate([val, this.catName]);
    }else if(item.optionals.length == 2 && item.optionals[0] &&  item.optionals[1] == null){
		 this.router.navigate([''], { queryParams: { id:item.optionals[0].id} });
	}
  }

    verifyEmailAddress(email) {

		let data = { appId: this.appId, emailID: email };

		this.http.post(SERVER_URL+"/templatesAuth/verifyAppUserEmail", data)
		  .subscribe((res: any)=> {

			if (res.message === 'success') {
				let requestParams = {
					"token": res.token,
					"email": res.data.email,
					"name": res.data.firstName,
					"lname": res.data.lastName,
					"phone": res.data.phone,
					"streetNumber": res.data.streetNumber,
					"streetName": res.data.streetName,
					"country": res.data.country,
					"city": res.data.city,
					"zip": res.data.zip,
					"type": 'internal',
					"appId": res.data.appId,
					"registeredUser": res.user.sub
				};

				this.localStorageService.set('appLocalStorageUser' + this.appId, (requestParams));
					if(this.localStorageService.get("cartUnknownUser")){
					this.localStorageService.set("cart"+requestParams.registeredUser,this.localStorageService.get("cartUnknownUser"));
					this.localStorageService.remove("cartUnknownUser");
				}
				this.dataService.appUserId = requestParams.registeredUser;
				this.dataService.isUserLoggedIn.check = true;
				this.dataService.parentobj.userLog = this.dataService.isUserLoggedIn.check;
				$('#verificationEmailModal').modal('show');
			} else {
				console.log(res.message);
			}
		});
	}
}
