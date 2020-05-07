import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {FirebaseService} from '../services/firebase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {CheckoutService} from '../services/checkout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userDetails: FormGroup;
  products = [];
  tmpData;
  value = 1;
  step = 1;
  min = 1;
  max = 10;
  wrap = false;
  totalAmount = 0;
  dialogRef;
  removeProductName;
  isLoading = true;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private firebaseService: FirebaseService,
              private dialog: MatDialog,
              private checkoutService: CheckoutService,
              private router: Router) {
    this.userDetails = this.formBuilder.group({
      username: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      upiId: ['', Validators.required],
    });
  }

  ngOnInit() {
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

  incrementValue(step: number = 1, data): void {
    this.totalAmount = 0;
    this.tmpData.find(d => {
      if (d.id === data.id) {
        let inputValue = d.buyedItems + step;
        if (this.wrap) {
          inputValue = this.wrappedValue(inputValue);
        }
        d.buyedItems = inputValue;
        d.quantity = 10 - d.buyedItems;
      }
    });
    this.tmpData.filter(price => {
      if (price.isaddedTocart) {
        this.totalAmount += (price.buyedItems * price.amount);
      }
    });
  }

  wrappedValue(inputValue): number {
    if (inputValue > this.max) {
      return this.min + inputValue - this.max;
    }

    if (inputValue < this.min) {
      if (this.max === Infinity) {
        return 0;
      }
      return this.max + inputValue;
    }
    return inputValue;
  }

  shouldDisableDecrement(inputValue: number, data): boolean {
    return !this.wrap && data.buyedItems <= this.min;
  }

  shouldDisableIncrement(inputValue: number, data): boolean {
    return !this.wrap && data.buyedItems >= this.max;
  }

  removeFromCart(product, templateRef) {
    this.removeProductName = product.name;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(product);
      }
      this.dialogRef = null;
    });
  }

  updateProduct(index) {
    this.tmpData.find(data => {
      if (data.id === index.id) {
        data.isaddedTocart = false;
      }
    });
    this.snackBar.open(index.name + 'remove from cart', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.firebaseService.update(this.firebaseService.getIp(), this.tmpData).then(result => {
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  saveDetails() {
    if (this.userDetails.valid) {
      this.checkoutService.isValid = this.userDetails.valid;
      this.checkoutService.userInfo = this.userDetails.value;
      this.router.navigate(['cart', 'checkout']);
      this.firebaseService.update(this.firebaseService.getIp(), this.tmpData);
    }
  }
}
