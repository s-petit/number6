import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MatIconModule, MatToolbarModule} from "@angular/material";
import {AvidsenService} from "./service/avidsen.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      MatIconModule,
      MatToolbarModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [AvidsenService],
   bootstrap: [AppComponent]
})
export class AppModule {
}
