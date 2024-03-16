import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { login, signUp,user,taller } from '../models/data-type';
import { ContextService } from './context.service';
import { LoginComponent } from '../componentes/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi= environment.apiUrl + "/users"
  private urlReg=environment.apiUrl + "/RegistroUsuario"
  private urlRegTaller=environment.apiUrl+"/RegistroTaller"
  private heaters={'mode':'cors'};
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

   /*userSignUp(data: signUp) {
    
    this.http.post(this.urlReg, data,{observe: 'response'})
    .subscribe((result)=>{

      if(result.ok){
         this.re=true;
         console.log("ok",this.re)
 
        //this.router.navigate(['/'])
      }else{ 
        console.log("false")
      }
    });
    
    console.log("return2",this.re)

  }*/
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
}
