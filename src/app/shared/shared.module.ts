import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CustomFormsModule } from 'ng2-validation';

import { CategoryService } from '../core/services/app-firebase/category/category.service';
import { UserService } from '../core/services/app-firebase/user/user.service';
import { AuthService } from '../core/services/guard/auth.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forChild([])
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
