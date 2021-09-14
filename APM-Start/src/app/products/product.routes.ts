import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductListComponent } from "./product-list.component";
import { ProductResolverService } from "./product-resolver.service";
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

export const productRouts:Routes =  [
    { path: '', component: ProductListComponent },
    {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolverService }
    },
    {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { resolvedData: ProductResolverService },
        canDeactivate: [ProductEditGuard],
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: ProductEditInfoComponent },
            { path: 'tags', component: ProductEditTagsComponent },
        ]
    }
]

//resolve: { product: ProductResolverService, cat: catService }