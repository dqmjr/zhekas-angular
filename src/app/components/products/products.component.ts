import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: IProducts[];
  productSubscription: Subscription;
  canEdit: boolean = false;
  canView: boolean = false;

  constructor (private ProductsService: ProductsService, public dialog: MatDialog) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: 123
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    //... Logic of access function
    this.canEdit = true;
    this.productSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
