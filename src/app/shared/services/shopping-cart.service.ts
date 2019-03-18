import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/app-product';
@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const cart = this.db.object('/shopping-carts/' + cartId + '/items/').snapshotChanges().pipe(
      map((result: any) => {
        const key = result.key;
        const items = result.payload.val();
        return new ShoppingCart(key, items);
      })
    );
    return cart;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const itemPayload = item.payload.val();
      let quantity = (itemPayload ? itemPayload['quantity'] : 0) + change;
      if (quantity === 0) item$.remove();
      else { item$.update({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity
      });
      }
    });
  }

}
