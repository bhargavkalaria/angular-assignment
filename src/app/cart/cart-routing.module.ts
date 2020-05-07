import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from './cart.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {PreventCheckoutGuard} from '../guards/preventCheckout.guard';


const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [PreventCheckoutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
