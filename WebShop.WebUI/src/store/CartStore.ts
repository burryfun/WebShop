import { makeAutoObservable } from "mobx";
import { api } from "../api/api";
import { CartService } from "../services/CartService";

export default class CartStore {
  
  smartphonesId:string[] = [];
  count:number = 0;
  smartphones:api.ICart[] = [];

  constructor() {
    makeAutoObservable(this);
    this.count = CartService.count();
  }

  getCart() {
    const response = CartService.getCart();
    response?.then(data => this.smartphones = data);
  }

  add(item:string) {
    CartService.add(item);
    this.smartphonesId.push(item);
    this.count += 1;
  }

  remove(item:string) {
    CartService.remove(item);

    for (let i = 0; i != this.smartphones.length; ++i) {
      if (this.smartphones[i].smartphoneId === item) {
        this.smartphonesId.splice(i, 1);
        this.smartphones.splice(i, 1);
        i -= 1;
        this.count -= 1;
      }
    };
  }

  clear() {
    CartService.clear();
    this.smartphonesId = [];
    this.smartphones = [];
    this.count = 0;
  }

  getTotalAmount(): string {
    let sum = 0;
    this.smartphones.forEach(smartphone => {
      sum += smartphone.smartphoneAmount;
    });
    return sum.toFixed(2);
  }

}