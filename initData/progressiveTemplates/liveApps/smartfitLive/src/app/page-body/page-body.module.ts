import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageBodyRoutingModule } from './page-body-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NewarivalsComponent } from './newarivals/newarivals.component';
import { PageBodyComponent } from './page-body.component';
import {  AddonsModule } from '../addons/addons.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { PoliciesComponent } from './policies/policies.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { DeliveryPolicyComponent } from './delivery-policy/delivery-policy.component';
import { WarrantyConditionsComponent } from './warranty-conditions/warranty-conditions.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { PaypalPaymentComponent } from './paypal-payment/paypal-payment.component';
import { PayhereCancelComponent } from './payhere-cancel/payhere-cancel.component';
import { PayhereSuccessComponent } from './payhere-success/payhere-success.component';
import { AppUserComponent } from './app-user/app-user.component';
import { SearchPipe } from '../pipes/search.pipe';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { SafeHtmlPipe } from '../pipes/safeHtml.pipe';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SafeUrlPipe } from '../pipes/safeUrl.pipe';

@NgModule({
  imports: [
    CommonModule,
    PageBodyRoutingModule,
    AddonsModule,
    NgbModule,
    OwlModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule

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
    WarrantyComponent,
    ComplaintsComponent,
    NewarivalsComponent,
    SearchPipe,
    BlogsComponent,
    BlogViewComponent,
    ReturnPolicyComponent,
    DeliveryPolicyComponent,
    WarrantyConditionsComponent,
    SafeHtmlPipe,
    PasswordResetComponent,
    SafeUrlPipe,
    PayhereCancelComponent,
    PayhereSuccessComponent
  ]
})
export class PageBodyModule {


}
