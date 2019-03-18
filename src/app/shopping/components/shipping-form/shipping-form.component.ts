import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/guard/auth.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    ) { }

    ngOnInit() {
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }

  async placeOrder() {
    // let order = new Order(this.userId, this.shipping, this.cart);

    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPriceOfItem
        };
      })
    };
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }


}
