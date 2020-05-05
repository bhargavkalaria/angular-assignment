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
              private firebaseService: FirebaseService,
              private httpClient: HttpClient,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.firebaseService.shoppingCartCollection.valueChanges().subscribe((result: any) => {
      let data;
      result.forEach(d => {
        if (d.ip === this.firebaseService.ipAddress) {
          data = d;
          this.tempProduct = d.productData;
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
    this.tempProduct[index].isAddedToWishList = true;
    this.firebaseService.update(this.firebaseService.ipAddress, this.tempProduct).then(result => {
      this.firebaseService.wishListItem.next(this.tempProduct);
      this.snackBar.open(this.productList[index].name + ' added to wish list', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-success']
      });
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  addToCart(product, index) {
    this.tempProduct[index].isaddedTocart = true;
    this.firebaseService.update(this.firebaseService.ipAddress, this.tempProduct).then(result => {
      this.snackBar.open(this.productList[index].name + ' added to cart', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-success']
      });
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }
}
