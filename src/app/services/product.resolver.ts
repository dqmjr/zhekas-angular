import {ActivatedRouteSnapshot, Resolve, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {IProducts} from "../models/products";
import {ProductsService} from "./products.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private ProductService: ProductsService, private router: Router) {  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> | Promise<IProducts> | IProducts {
     return this.ProductService.getProduct(route.params?.['id']).pipe(
      catchError(() =>{
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
