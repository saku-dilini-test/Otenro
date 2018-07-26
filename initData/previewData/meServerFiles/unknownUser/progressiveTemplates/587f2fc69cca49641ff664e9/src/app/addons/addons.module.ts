import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContactInfoComponent } from './contact-info/contact-info.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
   exports:[
    ContactInfoComponent
  ],
  declarations: [ContactInfoComponent]
})
export class AddonsModule { }
