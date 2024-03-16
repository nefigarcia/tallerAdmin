import { Component, OnInit } from '@angular/core';
import { login, signUp,taller } from 'src/app/models/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  authError:string="";
  showLogin:boolean= true;
  showSignUp:boolean=false;
  showSignupTaller:boolean=false;
  constructor(private user:UserService){}
  ngOnInit(): void {
      
  }
  login(data: login){
    console.log("component",data)
    this.user.userLogin(data);
  }
   /*async signUp(data: signUp){
    const a= await this.user.userSignUp(data);
    
    if(a){
      console.log("heyyy",this.user.re)
      this.showSignupTaller=true;
      console.log("bandera",this.showSignupTaller)
    }
  }*/
 signUp (data: signUp) {
    this.user.userSignUp(data, this.myStatus.bind(this));
 }
   myStatus(params:boolean) {
    if(params){
      this.showSignUp=false;
      this.showSignupTaller=params;
      
    }
 }


  signUpTaller(data: taller){
    this.user.userSignUpTaller(data,this.changeTallerSignup.bind(this));
  }
  changeTallerSignup(params:boolean){
    if(params){
      this.showSignupTaller=false;
    }
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
    this.showSignUp=true;
  }
  
}
