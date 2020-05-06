import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookMovieDetailsComponent} from './book-movie-details/book-movie-details.component';
import {CatalogComponent} from './catalog/catalog.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'product/:id',
    component: BookMovieDetailsComponent
  },
  {
    path: 'wish-list',
    loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: '**',
    component: CatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
