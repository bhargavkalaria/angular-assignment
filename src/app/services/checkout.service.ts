import {Injectable} from '@angular/core';
import {UserDetails} from '../modals/userDetails';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  userInfo: UserDetails;
  isValid = false;

  constructor() {
  }
}
