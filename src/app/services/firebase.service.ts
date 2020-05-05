import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  shoppingCartCollection: AngularFirestoreCollection<any>;
  productCollection: AngularFirestoreCollection<any>;
  ipAddress;
  wishListItem = new Subject();
  public wishListCount = 0;

  constructor(private afs: AngularFirestore) {
    this.shoppingCartCollection = afs.collection<any>('shopping-cart');
    this.productCollection = afs.collection<any>('product');
  }

  addItem(ip, productData) {
    localStorage.setItem('ipConfig', ip);
    this.shoppingCartCollection.doc(ip).set({ip, productData});
  }

  update(ip, productData) {
    return this.afs.collection('shopping-cart').doc(ip).set({ip, productData});
  }

  getIp() {
    return localStorage.getItem('ipConfig');
  }
}
