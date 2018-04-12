import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddonsModule } from './addons/addons.module';
import { PageBodyModule } from './page-body/page-body.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './page-body/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// https://ng-bootstrap.github.io/#/getting-started
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// https://angular-maps.com/guides/getting-started/
import { AgmCoreModule } from '@agm/core';
// http://tb.github.io/ng2-nouislider/
import { PagebodyServiceModule } from './page-body/page-body.service';
import { CategoriesService } from './services/categories/categories.service';
import { ProductsService } from './services/products/products.service';
import { AppDataService } from './services/appdata-info/appdata-info.service';
import { TitleService } from './services/title.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,HttpModule,
    AddonsModule,
    PageBodyModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBanVJ_9ViC-HeJruJzhetGXUERg1eYXag'
    }),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [PagebodyServiceModule,
    CategoriesService,
    ProductsService,
    AppDataService,
    TitleService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
