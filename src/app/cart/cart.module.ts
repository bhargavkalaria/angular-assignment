import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart.component';
import {MaterialModule} from '../material/material.module';
import {CartRoutingModule} from './cart-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckoutComponent} from '../checkout/checkout.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CartModule {
}
