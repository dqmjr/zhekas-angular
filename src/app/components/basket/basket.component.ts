import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";


@Component({
  selector: 'app-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.scss']
})


export class BasketComponent implements OnInit {
  constructor(private ProductsService: ProductsService) { }

  basket: IProducts[];
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  increaseItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      })
    }
    else {
      item.quantity--;
      this.ProductsService.UpdateProductToBasket(item).subscribe((data) => {

      })
    }
  }
  decreaseItemFromBasket(item: IProducts) {
    item.quantity++;
    this.ProductsService.UpdateProductToBasket(item).subscribe((data) => {

    })
  }
}
