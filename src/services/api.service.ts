import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WhereFilterOp } from '@google-cloud/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  itemsCollection: AngularFirestoreCollection<any>;
  Item: Observable<any[]>;
  itemDoc: AngularFirestoreDocument<any>;
  itemSelected: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  getCollection(nameCollection: string) {
    this.itemsCollection = this.afs.collection(nameCollection);
    this.Item = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.Item;
  }

  getCollectionItem(itemID: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + itemID);
    this.itemSelected = this.itemDoc.valueChanges();
    return this.itemSelected;
  }

  getCollectionWhere(nameCollection: string , documentValue: string , operator: WhereFilterOp, valueToCompare: any) {
    this.itemsCollection = this.afs.collection(nameCollection, ref => ref.where(documentValue, operator , valueToCompare));
    this.Item = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.Item;
  }

  addItem(ItemToAdd: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + ItemToAdd);
    // ItemToAdd will be like {id: value, property: value}
    const itemsCollection = this.afs.collection('nameCollection');
    itemsCollection.add(ItemToAdd);
  }

  updateItem(ItemMod: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + ItemMod);
    // ItemMod will be like {id: value, property: value}
    this.itemDoc.set(ItemMod);
  }

  updateItemValues(ItemMod: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/'  + ItemMod);
    // ItemMod will be like {id: value, property: value}
    this.itemDoc.update(ItemMod);
  }

  deleteItem(ItemDel: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + ItemDel);
    this.itemDoc.delete();
  }

}
