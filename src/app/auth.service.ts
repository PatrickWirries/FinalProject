import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { doc, Firestore, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { User } from './user';
import { Router } from '@angular/router';;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);


// Login Function
async login(email: string, password:string): Promise<void>{

  try{
   
//Sign In and save the UID that matches with the user's login information
const credential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
const uid = credential.user.uid;


//Get the document from firebase referencing the user
const userDocRef = doc(this.firestore, `/users/${uid}`);
const userRef = await getDoc(userDocRef);

//If the document can't be found, but Auth holds the user's login info
if (!userRef.exists()){
  throw new Error("User's data not found in Firestore'");
}

//Grab the user's data to match their 'role' value
const data = userRef.data();
const role = data['role']; 

//Build the user
const AppUser: User = {
  uid: uid,
  email: email,
  role: role
};

// Add the 'role' to local storage
localStorage.setItem('role', role);
localStorage.setItem('user', JSON.stringify(AppUser))
localStorage.setItem('token', 'true');

//Route the user to the dashboard if the user successfully logs in
  this.router.navigate(['/dashboard']);
}

  //If login fails
  catch (err){
    console.error('Login failed:', err);
  }
}

//Logout function. 
// Clears firebaseAuth and local storage before redirecting to login page
logout(): void {
  this.firebaseAuth.signOut().then(() => {
    localStorage.clear();
    this.router.navigate(['']);
  });
  console.log("Logging Out") //Dev Tool
}

async doesEmailExist(email: string): Promise<boolean>{
  //Create a query for the database
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", '==', email.toLowerCase())); //Query table 'users' where email matches the one submitted by user

const querySnapshot = await getDocs(q);

return !querySnapshot.empty;
}

//Reset password by sending the 'password reset link'
resetPassword(email: string){
  sendPasswordResetEmail(this.firebaseAuth, email)
    .then(() => alert('Password reset link sent!'))
    .catch(err => alert('Error sending reset link: ' + err.message));
}

//Return true if the current user is valid via local storage token
loggedIn(){
  return localStorage.getItem('token') == 'true'
}

//Return True if user is a manager
isManager(){
  return localStorage.getItem('role') == "MANAGER";
}

//Return True if user is an employee
isEmployee(){
  return localStorage.getItem('role') == 'EMPLOYEE';
}
}
