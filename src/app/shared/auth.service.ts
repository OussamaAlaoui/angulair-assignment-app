import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  constructor() { }

  login(){
    // les info de auth en params
    // call db and test
    this.loggedIn=true;

  }
  logout(){
    this.loggedIn=false;
  }

  isAdmin(){
    let isAdmin = new Promise((resolve,reject)=>{
      // normally verify is the login is ok

      resolve(this.loggedIn);

    })
    return isAdmin;
  }
}
