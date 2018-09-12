import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PageBodyRoutingModule } from './page-body-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { PageBodyComponent } from './page-body.component';
import {  AddonsModule } from '../addons/addons.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { PoliciesComponent } from './policies/policies.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { PaypalPaymentComponent } from './paypal-payment/paypal-payment.component';
import { AppUserComponent } from './app-user/app-user.component';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    PageBodyRoutingModule,
    AddonsModule,
    NgbModule,
    OwlModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule

  ],
   exports:[
    PageBodyComponent
  ],
  declarations: [
     HomepageComponent,
     PageBodyComponent,
     AboutusComponent, 
     PoliciesComponent,
     TermsComponent, 
     ContactComponent, 
     ShopComponent, 
     ProductComponent, 
     CartComponent, 
     CheckoutComponent, 
     RegisterComponent,
     PaypalPaymentComponent, 
     AppUserComponent, 
     SearchPipe
    ]
})
export class PageBodyModule { }
