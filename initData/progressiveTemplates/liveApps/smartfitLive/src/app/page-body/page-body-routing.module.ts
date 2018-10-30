import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { NewarivalsComponent } from './newarivals/newarivals.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PoliciesComponent } from './policies/policies.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { DeliveryPolicyComponent } from './delivery-policy/delivery-policy.component';
import { WarrantyConditionsComponent } from './warranty-conditions/warranty-conditions.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaypalPaymentComponent } from './paypal-payment/paypal-payment.component';
import { AppUserComponent } from './app-user/app-user.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PayhereCancelComponent } from './payhere-cancel/payhere-cancel.component';
import { PayhereSuccessComponent } from './payhere-success/payhere-success.component';

const routes: Routes = [
 { path: '',
   component: HomepageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login/:type',
    component: LoginComponent,
    data:{title:'Login Page'}
  },
  {
    path: 'register/:type',
    component: RegisterComponent,
    data:{title:'Register Page'}
  },
 {
    path: 'aboutus',
    component: AboutusComponent,
    data:{title:'About Us Page'}
  },
  {
    path: 'policies',
    component: PoliciesComponent,
    data:{title:'Policies Page'}
  },
  {
    path: 'return-policy',
    component: ReturnPolicyComponent,
    data:{title:'Return Policy Page'}
  },
  {
    path: 'delivery-policy',
    component: DeliveryPolicyComponent,
    data:{title:'Delivery Policy Page'}
  },
  {
    path: 'warranty-conditions',
    component: WarrantyConditionsComponent,
    data:{title:'Warranty Conditions Page'}
  },
  {
    path: 'terms',
    component: TermsComponent,
    data:{title:'Terms Page'}
  },
  {
    path: 'contact',
    component: ContactComponent,
    data:{title:'Contact Page'}
  },
  {
    path: 'shop/:id/:name',
    component: ShopComponent,
    data:{title:'Shop Page'}
  },
  {
    path: 'shop',
    component: ShopComponent,
    data:{title:'Shop Page'}
  },
  {
    path: 'cart',
    component: CartComponent,
    data:{title:'Cart Page'}
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    data:{title:'Order-History Page'}
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    data:{title:'Blog Page'}
  },
  {
    path: 'blogView/:id',
    component: BlogViewComponent,
    data:{title:'Blog-View Page'}
  },
  {
    path: 'appUser',
    component: AppUserComponent,
    data:{title:'Edit User Details'}
  },
  {
    path: 'product/:catName/:prodId',
    component: ProductComponent,
    data:{title:'Product Page'}
  },
  {
    path: 'checkout/:type',
    component: CheckoutComponent,
    data:{title:'Checkout Page'}
  },
  {
    path: 'warranty',
    component: WarrantyComponent,
    data:{title:'Warranty'}
  },
   {
    path: 'complaints',
    component: ComplaintsComponent,
    data:{title:'Complaints'}
  },
  {
    path: 'newarivals',
    component: NewarivalsComponent,
    data:{title:'New Arivals'}
  },
  {
    path: 'paypal/rest/execute',
    component: PaypalPaymentComponent
  },
  {
    path: 'passwordReset',
    component: PasswordResetComponent
  },
  {
    path: 'payhereCancel',
    component: PayhereCancelComponent
  },
  {
    path: 'payhereSuccess',
    component: PayhereSuccessComponent
  },
// {
//   path: 'paypal',
// component: PaypalPaymentComponent
// }
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class PageBodyRoutingModule { }
