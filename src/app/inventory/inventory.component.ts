import { Component, inject, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item, InventoryServiceService } from '../inventory-service.service';
import { CommonModule } from '@angular/common';


type ItemKey = keyof Item;


@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
title = 'inventory';

InventoryServiceService = inject(InventoryServiceService);

item: Item={
description: '',
id: '',
brand: '',
price: 0,
cost: 0,
upc: '',
styleNum: '',
qty: 0,
}

 input: string = '';

editItemId: string|null = null;

items: Item[] = [];
filteredItems: Item[] = [];



sortColumn: string | null = null;
sortDirection: 'asc' | 'desc' = 'asc';

ngOnInit(){
  this.InventoryServiceService.getInventory().subscribe(data => {
    this.items = data;
    this.filteredItems = [...this.items]; // Directly assign after data loads
  });
}

addItem(){
  this.InventoryServiceService.addItem(this.item);
  this.filterItems();
}

setEditItem(item:Item){
  this.item = {...item};
  this.editItemId = item.id;
}

deleteItem(id: string){
  this.InventoryServiceService.deleteItem(id);
  this.filterItems();
}

updateItem(){
  this.InventoryServiceService.updateItem(this.item);
  this.resetForm();
  this.filterItems();
}

resetForm(){
  this.item = {
    description: '',
    id: '',
    brand: '',
    price: 0,
    cost: 0,
    upc: '',
    styleNum: '',
    qty: 0,
  }
  this.editItemId = null;
  this.filterItems();
}

sendInput() {
    this.filterItems();
    //this.output.emit(this.input);
  }

  receiveInput(msg:string){
    if(msg == "")
      this.ngOnInit();
    this.filteredItems = [...this.items];
  }

    filterItems() {
    const searchTerm = this.input.toLowerCase();
    console.log('Search Term in filterItems:', searchTerm);
    if (!searchTerm) {
    this.filteredItems = [...this.items];
    return;
    }
    this.filteredItems = this.items.filter(item => item.description.toLowerCase().includes(searchTerm) || item.upc.toLowerCase().includes(searchTerm) || item.styleNum.toLowerCase().includes(searchTerm) || item.brand.toLowerCase().includes(searchTerm));
  }

  

  sort(column: ItemKey) {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.filteredItems.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    // Handle potential mixed types (string, number) for comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      // Handle cases where types are different (you might want a specific logic)
      return 0; // Default to no change in order
    }
  });
}

}
