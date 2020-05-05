import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-movie-details',
  templateUrl: './book-movie-details.component.html',
  styleUrls: ['./book-movie-details.component.scss']
})
export class BookMovieDetailsComponent implements OnInit {
  product;
  id;
  isLoading = true;
  dialogRef;
  allProduct;

  constructor(private afs: AngularFirestore,
              private firebaseService: FirebaseService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.getProduct(this.id);
    }
  }

  getProduct(id) {
    this.firebaseService.shoppingCartCollection.valueChanges().subscribe((res: any) => {
      res.find(d => {
        if (this.firebaseService.getIp() === d.ip) {
          this.isLoading = false;
          this.allProduct = d.productData;
          this.allProduct.find(data => {
            if (data.id === id) {
              this.product = data;
            }
          });
        }
      });
    });
  }

  openDialog(templateRef) {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      this.dialogRef = null;
    });
  }

  addToWishList() {
    this.allProduct.find(d => {
      if (d.id === this.id) {
        d.isAddedToWishList = true;
      }
    });
    this.snackBar.open(this.product.name + ' added to wish list', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.firebaseService.update(this.firebaseService.ipAddress, this.allProduct).then(result => {
      this.firebaseService.wishListItem.next(this.allProduct);
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  addToCart() {
    this.allProduct.find(d => {
      if (d.id === this.id) {
        d.isaddedTocart = true;
      }
    });
    this.snackBar.open(this.product.name + ' added to cart', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.firebaseService.update(this.firebaseService.ipAddress, this.allProduct).then(result => {
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }
}
