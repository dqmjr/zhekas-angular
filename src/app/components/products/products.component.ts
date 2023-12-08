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

  basket: IProducts[];
  BasketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  constructor (private ProductsService: ProductsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    //... Logic of access function
    this.canEdit = true;
    this.productSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
    this.BasketSubscription = this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if(data) {
        if (data && data.id) {
          this.UpdateProduct(data);
        }
        else {
          this.postData(data)
        }
      }
    });
  }

  postData(data: IProducts){
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.BasketSubscription) this.BasketSubscription.unsubscribe();
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

  productToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0){
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) {
        this.updateToBasket(findItem);
      }
      else {
        this.postToBasket(product)
      }
    }
    else {
      this.postToBasket(product)
    }

  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.UpdateProductToBasket(product).subscribe((data) => { })
  }

}
