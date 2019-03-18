import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../../shared/models/app-product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ProductService } from 'src/app/core/services/app-firebase/category/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  productsSubscription: Subscription;
  categoriesSubscription: Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productsSubscription = this.productService.getAllProducts()
      .pipe
      (
        map(actions => {
          return actions.map(product => ({
            $key: product.key,
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price']
          }) as Product);
        })
      )
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
        });
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

}
