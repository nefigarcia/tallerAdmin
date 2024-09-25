import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { login, signUp,user,taller, cliente } from '../models/data-type';
import { ContextService } from './context.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi= environment.apiUrl + "/users"
  private urlReg=environment.apiUrl + "/RegistroUsuario"
  private urlRegTaller=environment.apiUrl+"/RegistroTaller"
  private urlRegCliente=environment.apiUrl+"/Regcliente"
  private urlClientes=environment.apiUrl+"/Clientes"
  private urlRegCarro=environment.apiUrl+"/RegCarro"
  private urlCarros=environment.apiUrl+"/Carros"

  clientes:string[]=[]
  private clientess=new BehaviorSubject<any[]>([])
  public stClientes$=this.clientess.asObservable();

  private carross=new BehaviorSubject<any[]>([])
  public stCarros$=this.carross.asObservable();

  constructor(private http: HttpClient, private router:Router, private context: ContextService ) { }

  userLogin(data: login){
    this.http.get<user[]>(this.urlApi+`?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result)=>{
      console.log("ss",result);
      if(result && Array.isArray(result.body)){
        this.context.setUserDa(result.body);
      //  this.loginComp.openSignupTaller();
        this.router.navigate(['/home']);
      }
    })
  }

 userSignUp(data: signUp,myStatus: (st:boolean)=>void ){
  this.http.post(this.urlReg, data,{observe: 'response'})
    .subscribe((result)=>{
      if(result.ok){
          this.context.setSignup(data)
          console.log("si",data);
          console.log("sico",this.context.getSignup());
          myStatus(result.ok)
        //this.router.navigate(['/'])
      }else{ 
        console.log("false")
      }
    })
}

  userSignUpTaller(data: taller, changeTaller: (st:boolean)=>void){
    this.http.post(this.urlRegTaller,data,{observe:'response'})
      .subscribe((result)=>{
        if(result.ok){
          this.context.setTallerDa(data);
      var ur:signUp=this.context.getSignup()
      var ta:taller=this.context.getTallerDa();    
      console.log("ur",ur)
      console.log("ta",ta)
    
          this.context.setUserDa([{ID:0,NOMBRE:ur.name,NOMBRET:ta.name,TALLER_ID:0,APP:""}])
          changeTaller(result.ok)
          this.router.navigate(['/home']);
        }
      })
  }

 addCliente(data:string,callBack:(st:boolean)=>void) {
  this.http.post(this.urlRegCliente,data,{observe:'response'})
   .subscribe((result)=>{
    if(result.ok){
      this.context.setCliente(data)
      callBack(result.ok)
    }
   })
 }
 getClientes(){
  this.http.get<any[]>(this.urlClientes+`?tallerid=${this.context.getUserDa()[0].TALLER_ID}`,{observe:'response'})
   .subscribe((result)=>{
      if(result && Array.isArray(result.body)){
        this.clientes=result.body
        this.context.setClientes(this.clientes)
        this.updateClientes(result.body)
        console.log("clien",this.context.getClientes())
      }
   })
 }

 updateClientes(newArr:any[]){
  //var fiClientes=newArr.map((i)=>({nombre:i.NOMBRE, apellidos:i.APELLIDOS}))
  this.clientess.next(newArr)
 }

 addCarro(data:string,callbac:(st:boolean)=>void){
  this.http.post(this.urlRegCarro,data,{observe:"response"})
  .subscribe((result)=>{
    if(result.ok){
      callbac(result.ok)
    }
  })
 }

 getCarros(){
  this.http.get<any[]>(this.urlCarros+`?tallerid=${this.context.getUserDa()[0].TALLER_ID}`,{observe:"response"})
   .subscribe((result)=>{
    if(result && Array.isArray(result.body)){
      this.carross.next(result.body)
    }
   })
 }
 
}
