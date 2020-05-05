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
              private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.ipService.getIPAddress().subscribe((result: any) => {
      this.firebaseService.productCollection.valueChanges().subscribe(product => {
        this.firebaseService.addItem(result.ip, product[0].productList);
      });
    }, error => {
      this.snackBar.open('Something went wrong', '', {
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['snack-error']
      });
    });
  }
}
