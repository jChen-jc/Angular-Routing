import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })

export class ProductResolverService implements Resolve<ProductResolved> {
    constructor(private productService:ProductService) {}
    resolve(route:ActivatedRouteSnapshot, sate:RouterStateSnapshot): Observable<ProductResolved> {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Product was not a number: ${id}`;
            console.error(message);
            return of({ product: null, error: message });
        }
        return this.productService.getProduct(+id)
        .pipe(
            map(product => ({ product: product })),
            catchError(error => {
                const message = `Something went wrong: ${error}`;
                return of({ product: null, error: message});
            })
        );
    }
}