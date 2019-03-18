import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/app-product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';


@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addTocart() {
    this.cartService.addToCart(this.product);
  }

  removeFromcart() {
    this.cartService.removeFromCart(this.product);
  }

}
