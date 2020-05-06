import {NgModule} from '@angular/core';
import {WishListComponent} from './wish-list.component';
import {WishListRoutingModule} from './wish-list-routing.module';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    WishListRoutingModule,
    MaterialModule,
  ]
})
export class WishListModule {
}
