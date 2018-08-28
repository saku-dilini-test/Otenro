import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PoliciesComponent } from './policies/policies.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
 { path: '',
   component: HomepageComponent,
    pathMatch: 'full'
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
    path: 'contact',
    component: ContactComponent,
    data:{title:'Contact Page'}
  },
  {
    path: 'shop/:id/:name/:image',
    component: ShopComponent,
    data:{title:'Shop Page'}
  },
  {
    path: 'product/:catName',
    component: ProductComponent,
    data:{title:'Product Page'}
  },
// {
//   path: 'paypal',
// component: PaypalPaymentComponent
// }
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PageBodyRoutingModule { }
