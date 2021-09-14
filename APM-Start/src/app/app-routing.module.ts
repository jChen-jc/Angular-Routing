import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AuthGuard } from '../app/user/auth.guard';
import { SelectivePreloadStrategy } from "./selective-strategy.service";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                canActivate: [AuthGuard],
                // canLoad: [AuthGuard],
                data: { preload: false },
                loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent },
        ], { preloadingStrategy: SelectivePreloadStrategy })   // , { enableTracing: true } // { preloadingStrategy: PreloadAllModules } - preload all lazy load modules
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
