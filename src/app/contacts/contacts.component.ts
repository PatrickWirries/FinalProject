import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { collection, collectionData, addDoc, updateDoc, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  editId: string | null = null;

  employees$!: Observable<any[]>; 
  private employeesCollection;

  constructor(private firestore: Firestore) {
    // Reference the 'employees' collection in Firestore
    this.employeesCollection = collection(this.firestore, 'employees');
  }

  ngOnInit(): void {
    // Retrieve all documents in 'employees' as an observable array of objects, including each document's ID.
    this.employees$ = collectionData(this.employeesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  // Add a new employee
  async addEmployee() {
    if (!this.name || !this.email || !this.phone) return;
    await addDoc(this.employeesCollection, { name: this.name, email: this.email, phone: this.phone });
    // Clear form after adding
    this.name = '';
    this.email = '';
    this.phone = '';
  }

  // Set up the form for editing an existing employee
  editEmployee(employee: any) {
    this.editId = employee.id;
    this.name = employee.name;
    this.email = employee.email;
    this.phone = employee.phone;
  }

  // Update the selected employee in Firestore using the bound form fields
  async updateEmployee() {
    if (!this.editId) return;
    const empDocRef = doc(this.firestore, 'employees', this.editId);
    await updateDoc(empDocRef, { name: this.name, email: this.email, phone: this.phone });
    // Clear form and exit edit mode
    this.cancelEdit();
  }

  // Delete an employee document by ID
  async deleteEmployee(id: string) {
    const empDocRef = doc(this.firestore, 'employees', id);
    await deleteDoc(empDocRef);
  }

  // Cancel editing: clear form and reset edit mode
  cancelEdit() {
    this.editId = null;
    this.name = '';
    this.email = '';
    this.phone = '';
  }

  // Track function for ngFor to improve performance
  trackByEmployeeId(index: number, employee: any): string {
    return employee.id;
  }
}
