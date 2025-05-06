//Interface for User objects
export interface User {
uid: string; 
email: string; 
username?: string; //If I decide to include a display name
role: 'MANAGER' | 'EMPLOYEE' | null; // 2 valid roles or Null



}
