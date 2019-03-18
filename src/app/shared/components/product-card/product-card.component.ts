
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/app-product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') ShowActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

   addTocart() {
    this.cartService.addToCart(this.product);
  }

}
