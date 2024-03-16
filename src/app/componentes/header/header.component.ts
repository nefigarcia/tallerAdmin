import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login,signUp } from 'src/app/models/data-type';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string="default";
  userStore: signUp[]=[];
  userName:string="";
  tallerName:string="";
  constructor(private route: Router, private context:ContextService){}

    ngOnInit(): void {
      this.route.events.subscribe((val:any)=>{
        if(val.url){
          if(this.context.getUserDa().length && val.url.includes('home')){
            let userStoree=this.context.getUserDa()[0];
            //let tallerDa=this.context.getTallerDa();
            this.userName=userStoree.NOMBRE;
            this.tallerName=userStoree.NOMBRET
            this.menuType='user';
          }
          console.log("url",val.url)
        }
      })
    }
}
