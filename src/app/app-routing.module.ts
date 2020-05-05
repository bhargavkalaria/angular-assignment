import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookMovieDetailsComponent} from './book-movie-details/book-movie-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'product/:id',
    component: BookMovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
