import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: IProducts[];
  productSubscription: Subscription;

  constructor (private ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
