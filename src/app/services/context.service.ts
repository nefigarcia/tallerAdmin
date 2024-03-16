import { Injectable } from '@angular/core';
import { signUp,user,taller } from '../models/data-type';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  userDa:user[]=[];
  tallerDa:taller={
    name: '',
    id: 0
  };
  signupDa: signUp={
    name: '',
    apellidos: '',
    email: '',
    password: ''
  }
  constructor() { }

  setUserDa(userDa: user[]){
    console.log("userDa",userDa)
    this.userDa=userDa;
  }
  getUserDa(){
    return this.userDa;
  }
  setTallerDa(tallerDa:taller){
    this.tallerDa=tallerDa;
  }
  getTallerDa(){
    return this.tallerDa;
  }
  setSignup(signup:signUp){
    this.signupDa=signup;
  }
  getSignup(){
    return this.signupDa;
  }
}
