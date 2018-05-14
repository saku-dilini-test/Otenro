import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoriesComponent } from './categories/categories.component';
import { MarketingOption1LeftComponent } from './marketing-option1-left/marketing-option1-left.component';
import { MarketingOption1RightComponent } from './marketing-option1-right/marketing-option1-right.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
   exports:[
    CarouselComponent,
    MarketingOption1LeftComponent,
    MarketingOption1RightComponent,
    NewsletterComponent,
    FeedbackComponent,
    ContactInfoComponent,
    CategoriesComponent
  ],
  declarations: [CarouselComponent,
    MarketingOption1LeftComponent,
    MarketingOption1RightComponent,
    NewsletterComponent,
    FeedbackComponent,
    ContactInfoComponent,
    CategoriesComponent]
})
export class AddonsModule { }
