import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppCardComponent } from './app-card/app-card.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AppmakerStoreService } from './providers/appmaker-store.service';
import { PipeModule } from './shared/pipes/pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppCardComponent,
    AppDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PipeModule
  ],
  providers: [AppmakerStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
