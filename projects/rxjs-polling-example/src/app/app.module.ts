import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceComponent } from './price/price.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent, PriceComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
