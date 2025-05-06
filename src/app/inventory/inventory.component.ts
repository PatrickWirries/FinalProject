import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Item, InventoryServiceService } from '../inventory-service.service';


@Component({
  selector: 'app-inventory',
  imports: [RouterOutlet, FormsModule],
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

editItemId: string|null = null;

items: Item[] = [];

ngOnInit(){
  this.InventoryServiceService.getInventory().subscribe(data => this.items = data);
}

addItem(){
  this.InventoryServiceService.addItem(this.item);
}

setEditItem(item:Item){
  this.item = {...item};
  this.editItemId = item.id;
}

deleteItem(id: string){
  this.InventoryServiceService.deleteItem(id);
}

updateItem(){
  this.InventoryServiceService.updateItem(this.item);
  this.resetForm();
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
}
}
