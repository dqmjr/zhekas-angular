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
  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.id) {
        this.UpdateProduct(data);
      }
      else {
        this.postData(data)
      }
    });
  }

  postData(data: IProducts){
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

  deleteData(id:number) {
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find( (item) => {
      if (id === item.id){
        let idx:number = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }

  UpdateProduct(product: IProducts) {
    this.ProductsService.UpdateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data
        else return product
      })
    });
  }
}
