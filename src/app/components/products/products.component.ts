import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
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
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => this.postData(data));
  }

  postData(data: IProducts){
    console.log(data);
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //... Logic of access function
    this.canEdit = true;
    this.productSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }
}
