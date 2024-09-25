import { Component,Output, EventEmitter, ViewChild, ElementRef,OnInit } from '@angular/core';
import { cliente } from 'src/app/models/data-type';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css']
})
export class AddclienteComponent {
  @ViewChild('btclose') btclose!: ElementRef<HTMLElement>;
  @ViewChild('bttest') bttest!: ElementRef<HTMLElement>;
  @Output("closeClienteDialog") closeClienteDialog: EventEmitter<any>=new EventEmitter();
  modalsts:boolean=false
  constructor( private cliente:UserService, private context:ContextService){}

  ngOnInit(){
   
  }
  addCliente(cliente:cliente){
    cliente.tallerid=this.context.getUserDa()[0].TALLER_ID
    this.cliente.addCliente(cliente as unknown as string, this.callbackAddcliente.bind(this));
  }

  callbackAddcliente(param:boolean){
    if(param){
     // this.closeClienteDialog.emit()
      this.closemodal()
      this.cliente.getClientes()
    }
  }
  closemodal(){
    let cl:HTMLElement=document.getElementById('btclose') as HTMLElement;
    cl.click();
  }
  
  cltest(){
    console.log("testing")
  }
}
