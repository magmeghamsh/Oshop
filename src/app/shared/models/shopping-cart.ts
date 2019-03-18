import { ShoppingCartItem } from './shopping-cart-items';
import { Product } from './app-product';


export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(
    public key: string,
    private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    // tslint:disable-next-line:forin
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, $key: productId}));
    }
  }

  getQuantity(product: Product) {
    // tslint:disable-next-line:no-unused-expression
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (let productId in this.items) {
      // tslint:disable-next-line:no-unused-expression
      sum += this.items[productId].totalPriceOfItem;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line:forin
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}

