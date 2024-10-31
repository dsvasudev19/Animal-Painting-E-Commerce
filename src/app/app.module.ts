
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CartModule } from './cart/cart.module';
import { TitlePipePipe } from './pipes/title-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TitlePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CartModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
