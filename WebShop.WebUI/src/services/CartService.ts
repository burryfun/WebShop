import { api } from "../api/api";

export class CartService {

  static getCart() {
    if (localStorage.getItem('cart')) {
      const smartphonesId = JSON.parse(localStorage.getItem('cart') || ''); 
      const response = api.getCart(smartphonesId);
      return response;
    }
    return null;
  }

  static add(item: string) {
    let items:string[] = []; 

    if (!localStorage.getItem('cart')) {
      items.push(item);
    } else {
      items = JSON.parse(localStorage.getItem('cart') || '');
      items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }

  static remove(item:string) {
    let items:string[] = [];
    items = JSON.parse(localStorage.getItem('cart') || '');

    for (let i = 0; i != items.length; ++i) {
      if (items[i] === item) {
        items.splice(i, 1);
        i -= 1;
      }
    };

    localStorage.setItem('cart', JSON.stringify(items));
  }

  static clear() {
    localStorage.removeItem('cart');
  }

  static count():number {
    if (localStorage.getItem('cart')) {
      const items:string[] = JSON.parse(localStorage.getItem('cart') || '');
      return items.length;
    }
    return 0;
  }
}