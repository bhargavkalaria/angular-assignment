import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public items;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('shopping-cart');
    this.items = this.itemsCollection.valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  addItem() {
    // Persist a document id
    const ip = '121.168.11.121';
    const productList = [
        {
          id: 1,
          name: 'bhargav'
        },
        {
          id: 1,
          name: 'bhargav'
        },
        {
          id: 1,
          name: 'bhargav'
        }
      ]
    ;
    const item = {ip, productList};
    this.itemsCollection.doc(ip).set(item);
    // this.itemsCollection.add(name);
  }

  update() {
    return this.afs.collection('shopping-cart')
      .doc('121.168.11.12/')
      .set({id: 1, name: 'changes'});
  }
}
