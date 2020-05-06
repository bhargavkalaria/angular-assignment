import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FirebaseService} from '../services/firebase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  tempProduct;
  displayedColumns: string[] = ['name', 'genre', 'ratings', 'writer', 'isAddedToWishList', 'isaddedTocart'];
  dataSource: MatTableDataSource<any>;
  isLoading = true;
  dialogRef;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private firebaseService: FirebaseService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getWishListData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getWishListData() {
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
        const tmp = [];
        this.isLoading = false;
        data.productData.filter(d => {
          if (d.isAddedToWishList) {
            tmp.push(d);
          }
        });
        this.dataSource = new MatTableDataSource(tmp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });

  }

  removeFromWishList(index, templateRef) {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(index);
      }
      this.dialogRef = null;
    });
  }

  updateProduct(index) {
    this.tempProduct.find(data => {
      if (data.id === index.id) {
        data.isAddedToWishList = false;
      }
    });
    this.snackBar.open(index.name + 'remove from wish list', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.firebaseService.update(this.firebaseService.getIp(), this.tempProduct).then(result => {
      this.firebaseService.wishListItem.next(this.tempProduct);
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  addToCart(data) {
    this.tempProduct.find(d => {
      if (d.id === data.id) {
        d.isaddedTocart = true;
      }
    });
    this.snackBar.open(data.name + ' added to cart', '', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.firebaseService.update(this.firebaseService.getIp(), this.tempProduct).then(result => {
    }).catch(error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }
}
