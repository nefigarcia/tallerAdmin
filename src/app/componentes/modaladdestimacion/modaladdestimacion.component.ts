import { Component,OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MatDialogActions } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { servicios, serviciost } from 'src/app/models/data-type';
import { EstimacionService } from 'src/app/services/estimacion.service';

@Component({
  selector: 'app-modaladdestimacion',
  templateUrl: './modaladdestimacion.component.html',
  styleUrls: ['./modaladdestimacion.component.css'],
})
export class ModaladdestimacionComponent {
  myControl=new FormControl('');
  options: string[]=['Uno','Dos','Tres'];
  filteredOptions: Observable<string[]> | undefined;
  servicios:servicios[]=[]
  serviciost:any= []

  constructor(public dialogRef: MatDialogRef<ModaladdestimacionComponent>, private servestima:EstimacionService) {}
  panelOpenState = false;
  openAddservicio=false;

  ngOnInit(){
    this.servestima.servicios$.subscribe((i)=>{
      this.servicios=i
      console.log("servicios",this.servicios)
    })
      this.servestima.serviciost$.subscribe((i)=>{
      this.serviciost= i
      console.log("serviciost",this.serviciost)

    })
  }

  addServicio(servicio:servicios){
    console.log("serv",servicio)
    this.servestima.addServicio(servicio,this.callbackEstservicio.bind(this))
  }
  callbackEstservicio(){
    this.openAddservicio=true
    this.closeModal()
  }
  closeModal(){
    let cl:HTMLElement=document.getElementById('btClose') as HTMLElement
    cl.click()
  }
  clTest(){
    console.log("testing")
  }
  cannedServicio(servicios:serviciost){
    console.log("cannedServicios:",servicios)
    this.servestima.selectedServicios(servicios,this.callbackAddServ.bind(this))
  }
  callbackAddServ(){
    this.closeModal()
  }
}
