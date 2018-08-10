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
    // ItemToAdd will be like {id: value, property: value}
    const itemsCollection = this.afs.collection(nameCollection);
    itemsCollection.add(ItemToAdd);
  }

  // This function reset the document with all the values specified in itemValues
  updateItem(itemID: any, itemValues: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + itemID);
    // itemValues will be like {id: value, property: value}
    this.itemDoc.set(itemValues);
  }

  // This function updates a specific property of the document
  updateItemValues(idItem: any, valuesToModify: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/'  + idItem);
    // valuesToModify will be like {property1: value, property2: value}
    this.itemDoc.update(valuesToModify);
  }

  deleteItem(idItem: any, nameCollection: string) {
    this.itemDoc = this.afs.doc(nameCollection + '/' + idItem);
    this.itemDoc.delete();
  }

}
