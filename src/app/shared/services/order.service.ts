import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private shoppingcartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders/').push(order);
    this.shoppingcartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges();
  }

  getAllByUser(userId: string) {
    return this.db.list<any>('/orders',
    ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
}
