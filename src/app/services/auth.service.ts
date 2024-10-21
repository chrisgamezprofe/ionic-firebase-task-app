import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ngFireAuth: AngularFireAuth,private router:Router,private storage:Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async register(email:string,pass:string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,pass);
  }

  async login(email:string,pass:string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email,pass);
  }

  async resetPassword(email:string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async logOut() {
     await this.ngFireAuth.signOut();
     await this.storage.remove('user');
     //this.router.navigate([routeRedirect]);
  }

  async getUserProfile() {
    return await this.ngFireAuth.currentUser;
  }

  
  async isLoggedIn(){
    const currentUser = await this.storage.get('user');
    console.log("GET:",currentUser)
    return !!currentUser;
  }

  async userData(){
    const currentUser = await this.storage.get('user');
    console.log("USER:",currentUser)
    return currentUser;
  }

  async saveSession(user:any){
    console.log("SAVE:",user)
    if(user){
      await this.storage.set('user',user);
      true;
    }
    return false;
  }

  

}
