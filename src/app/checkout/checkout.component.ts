import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from '../services/firebase.service';
import {CheckoutService} from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLoading = true;
  totalAmount = 0;
  products = [];
  tmpData;
  otpValue: number;

  constructor(private snackBar: MatSnackBar,
              private firebaseService: FirebaseService,
              public checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.getWishListData();
  }

  getWishListData() {
    this.firebaseService.shoppingCartCollection.valueChanges().subscribe((result: any) => {
      this.isLoading = false;
      this.products = [];
      this.totalAmount = 0;
      result.find(d => {
        if (d.ip === this.firebaseService.getIp()) {
          this.tmpData = d.productData;
        } else {
          return false;
        }
      });
      this.tmpData.filter(d => {
        if (d.isaddedTocart) {
          this.products.push(d);
          this.totalAmount += (d.buyedItems * d.amount);
        }
      });
    }, error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  checkout() {
    this.snackBar.open('Your order is placed successfully', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
  }
}
