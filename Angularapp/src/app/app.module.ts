import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatInputModule,
         MatCardModule,
          MatButtonModule,
           MatToolbarModule,
            MatExpansionModule} from '@angular/material'

import { AppComponent } from './app.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import { ProductsService } from './products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    HeaderComponent,
    ProductListComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
