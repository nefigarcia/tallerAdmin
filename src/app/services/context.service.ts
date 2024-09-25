import { Injectable } from '@angular/core';
import { signUp,user,taller, cliente, vehicleInfo } from '../models/data-type';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  daaClientes:boolean=false;
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
  clientes: string[]=[];
  
  
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
  setClientes(cliente:string[]){
    //this.clientes.push(cliente)
    this.clientes=cliente
  }
  getClientes(){
    return this.clientes;
  }
  setCliente(cliente:string){
    this.clientes.push(cliente)
  }
  getDaaClientes(){
    return this.daaClientes;
  }
  setDaaClientes(){
    this.daaClientes=true
  }
  
}
