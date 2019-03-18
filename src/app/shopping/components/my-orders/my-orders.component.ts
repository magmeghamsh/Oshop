import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/guard/auth.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    console.log(this.appUser);

    this.subscription = authService.user$.pipe(switchMap(user =>
      orderService.getAllByUser(user.uid).pipe(
        map(actions => {
          return actions.map(action => {
            // console.log(action.payload.val())
            return ({
              key: action.key,
              datePlaced: action.payload.val().datePlaced,
              items: action.payload.val().items,
              userId: action.payload.val().userId,
              shipping: action.payload.val().shipping,
              shoppingCart: action.payload.val().shoppingCart
            }) as Order;
          });
        })
      )
    ))
      .subscribe(orders => this.filteredOrders = this.orders = orders);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
