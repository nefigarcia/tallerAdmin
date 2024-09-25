import { Component,OnInit } from '@angular/core';
import { carro, vehicleInfo } from 'src/app/models/data-type';
import { AutozoneService } from 'src/app/services/autozone.service';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-addcarro',
  templateUrl: './addcarro.component.html',
  styleUrls: ['./addcarro.component.css']
})
export class AddcarroComponent {
  selectedYear:string="";
  selectedMarca:any=""
  selectedModelo:any=""
  selectedMotor:any=""
  vehicleInfo:vehicleInfo={year:"",make:"",model:"",engine:{engine:"",engineId:"",vehicleId:""}}
  stYear:number=0
  dateYear:number=new Date().getFullYear();
  start:number=1990
   carYear:Array<any>=Array.from({length:this.dateYear-this.start},(x,i:number)=>{return {YEAR:i+this.start}})
   carMarca:any[]=[]
   carMarcas:any[]=[]
   carModelos:any[]=[]
   carMotores:any[]=[]
   marcas$=this.autozone.marcas$;
   constructor(private carro:UserService, private context:ContextService, private autozone:AutozoneService){}

   ngOnInit():void{
    console.log("stca",this.carMarcas)
    const mar= this.autozone.marcas$.pipe(map((i:any)=>{return i}))
     .subscribe((i)=>{
       this.carMarcas=i.map((i:any)=>{return i})
       console.log("oninitmakes",this.carMarcas)
     })
    
    const mo=this.autozone.modelos$.pipe(map((m:any)=>{return m}))
     .subscribe((m)=>{
       this.carModelos=m.map((m:any)=>{return m})
     })

    const mot=this.autozone.motores$.pipe(map((mo:any)=>{return mo})) 
     .subscribe((mo)=>{
       this.carMotores=mo.map((mo:any)=>{return mo})
     })
   }
   
  addCarro(carro:carro){
   carro.TALLER_ID=this.context.getUserDa()[0].TALLER_ID
    this.carro.addCarro(carro as unknown as string,this.callbackCloseModal.bind(this))
  }
  callbackCloseModal(boo:boolean){
    if(boo){
      this.carro.getCarros()
      this.moclose()
    }
  }
  moclose(){
    let cl=document.getElementById('btclose') as HTMLElement
    cl.click()  
  }
  cltest(){
    console.log("testing")
  }
  selectYear(y:number){
    this.stYear=y
    this.autozone.getMarcass(y)
    console.log("mar",this.marcas$)
  }
  selectMarca(m:any){
    console.log("m",m)
    this.autozone.getModelos(m)
  }
  selectModelo(m:any){
    console.log("model",m.model)
    this.autozone.getMotores(m)
  }
  selectMotor(m:any){
   const engineId=this.selectedMotor.engineId.slice(1)
    this.vehicleInfo={year:this.selectedYear,make:this.selectedMarca.make,model:this.selectedModelo.model,engine:{engine:this.selectedMotor.engine,engineId:this.selectedMotor.engineId,vehicleId:engineId}}
    this.autozone.vehicle.next(this.vehicleInfo)
    this.closeModal()
  }
  closeModal(){
    let el:HTMLElement=document.getElementById('btclose') as HTMLElement
    el.click()
  }
}
