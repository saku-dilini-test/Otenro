import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PageBodyRoutingModule } from './page-body-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { PageBodyComponent } from './page-body.component';
import {  AddonsModule } from '../addons/addons.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PoliciesComponent } from './policies/policies.component';
import { ContactComponent } from './contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  imports: [
    CommonModule,
    PageBodyRoutingModule,
    AddonsModule,
    NgbModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule

  ],
   exports:[
    PageBodyComponent
  ],
  declarations: [HomepageComponent, PageBodyComponent, AboutusComponent, PoliciesComponent, ContactComponent, ShopComponent, ProductComponent]
})
export class PageBodyModule { }
