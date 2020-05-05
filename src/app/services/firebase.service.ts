import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  shoppingCartCollection: AngularFirestoreCollection<any>;
  productCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.shoppingCartCollection = afs.collection<any>('shopping-cart');
    this.productCollection = afs.collection<any>('product');
  }

  addItem(ip, productData) {
    this.shoppingCartCollection.doc(ip).set({ip, productData}).then(result => {
    }).catch(error => {
      console.log(error);
    });
  }

  update(ip, productData) {
    return this.afs.collection('shopping-cart').doc(ip).set(productData).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }
}
