import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productList;
  dataSource: MatTableDataSource<any>;
  isLoading = true;
  tempProduct;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public firebaseService: FirebaseService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.firebaseService.shoppingCartCollection.valueChanges().subscribe((result: any) => {
      let data;
      result.find(d => {
        if (d.ip === this.firebaseService.getIp()) {
          data = d;
          this.tempProduct = d.productData;
        } else {
          return false;
        }
      });
      if (data) {
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<any>(data.productData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.connect().subscribe(r => {
          this.productList = r;
        });
      }
    }, error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  addToWishList(product, index) {
    this.tempProduct.find(data => {
      if (data.id === product.id) {
        data.isAddedToWishList = !data.isAddedToWishList;
      }
    });
    this.isLoading = true;
    this.firebaseService.update(this.firebaseService.getIp(), this.tempProduct).then(result => {
      this.isLoading = false;
      /*  this.snackBar.open(this.productList[index].name + ' added to wish list', '', {
          horizontalPosition: 'right',
          duration: 3000,
          panelClass: ['snack-success']
        });*/
      this.firebaseService.wishListItem.next(this.tempProduct);
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  addToCart(product, index) {
    this.tempProduct.find(data => {
      if (data.id === product.id) {
        data.isaddedTocart = !data.isaddedTocart;
      }
    });
    this.isLoading = true;
    this.firebaseService.update(this.firebaseService.getIp(), this.tempProduct).then((result: any) => {
      if (result) {
        this.isLoading = false;
      }
      /*this.snackBar.open(this.productList[index].name + ' added to cart', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-success']
      });*/
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }
}
