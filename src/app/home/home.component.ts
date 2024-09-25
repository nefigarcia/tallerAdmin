import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EstimacionService } from '../services/estimacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private serv:UserService,private estiserv:EstimacionService){}
  ngOnInit(){
    this.serv.getClientes();
    this.serv.getCarros()
    this.estiserv.getServicios()
  }
}
