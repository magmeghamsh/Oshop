

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/app-product';
import { ProductService } from 'src/app/core/services/app-firebase/category/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts().pipe()
      .subscribe(products => this.filteredProducts = this.products = products.map(
        product => {
          return {
            $key: product.key,
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price']
          }as Product;
        }
      )
      );
  }

ngOnInit() {
}

filter(query: string) {
  this.filteredProducts = (query) ?
    this.products.filter(
      p => p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
