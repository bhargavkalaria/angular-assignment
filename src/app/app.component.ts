import {Component, OnInit} from '@angular/core';
import {IpService} from './services/ip.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean;

  constructor(private ipService: IpService,
              private snackBar: MatSnackBar,
              public firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.getIpAddress();
    this.subscribeForWishList();
  }

  getIpAddress() {
    this.ipService.getIPAddress().subscribe((result: any) => {
      this.firebaseService.ipAddress = result.ip;
      this.firebaseService.productCollection.valueChanges().subscribe(product => {
        this.firebaseService.shoppingCartCollection.valueChanges().subscribe((res: any) => {
          const tmp = res.every(d => {
            if (this.firebaseService.getIp()) {
              return true;
            } else if (d.ip === result.ip) {
              this.firebaseService.wishListItem.next(d.productData);
              return true;
            } else {
              return false;
            }
          });
          if (!tmp) {
            this.firebaseService.addItem(result.ip, product[0].productList);
          }
        });
      });
    }, error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }

  subscribeForWishList() {
    this.firebaseService.wishListItem.subscribe((wishList: any) => {
      this.firebaseService.wishListCount = 0;
      wishList.forEach(d => {
        if (d.isAddedToWishList) {
          this.firebaseService.wishListCount += 1;
        }
      });
    });
  }
}
