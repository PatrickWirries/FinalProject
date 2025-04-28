import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc} from "@angular/fire/firestore";
import { Observable } from 'rxjs';


export interface Item{
description: string,
id: string,
brand: string,
price: number,
cost: number,
upc: string,
styleNum: string,

}

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private firestore = inject(Firestore);
  private inventoryCollection = collection(this.firestore, 'items');

  getInventory(): Observable<Item[]>{
    return collectionData(this.inventoryCollection, ({idField: 'id'})) as Observable<Item[]>
  }

  addItem(newItem: Item){
    const userRef = doc(this.inventoryCollection);
    const newId = userRef.id;
    newItem.id = newId;
    setDoc(userRef, newItem);
  }
  constructor() { }
}
