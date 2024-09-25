import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith } from 'rxjs';
import { ModaladdestimacionComponent } from '../modaladdestimacion/modaladdestimacion.component';
import { AddclienteComponent } from '../addcliente/addcliente.component';
import { cliente,client, carro, vehicleInfo, records, productos, servicios, serviciost } from 'src/app/models/data-type';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';
import { filter, map } from 'rxjs/operators'
import { AddcarroComponent } from '../addcarro/addcarro.component';
import { AutozoneService } from 'src/app/services/autozone.service';
import { EstimacionService } from 'src/app/services/estimacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-addestimacion',
  templateUrl: './addestimacion.component.html',
  styleUrls: ['./addestimacion.component.css']
})
export class AddestimacionComponent implements OnInit{
  myControl=new FormControl('');
  mycontrol2=new FormControl('')
  //options: string[]=['Uno','Dos','Tres'];
  filteredOptions: Observable<any[]> | undefined;
  filteredOptions2: Observable<any[]> | undefined
  daClientes:string[]=[]
  options: any[]=[]
  options2: any[]=[]
  stClientes$=this.serv.stClientes$;
  stCarros$=this.serv.stCarros$;
  cliente:client={APELLIDOS:'',EMAIL:'',ID:0,NA:'',NOMBRE:'',TALLER_ID:0,TELEFONO:0}
  carro:carro={ID:0,MARCA:'',MODELO:'',YEAR:0,PLACA:'',VIN:'',TALLER_ID:0}
  stCliente:boolean=false
  stCarro:boolean=false;

  vehicleInfo$=this.autozone.vehicle$
  vehicleInfo:vehicleInfo={year:"",make:"",model:"",engine:{engine:"",engineId:"",vehicleId:""}}

  productos:productos[][]=[]
  servicios:servicios[]=[]
  valueRefa=""
  estiservicios:any=[]
  displayedColumns:String[]=["DESCRIPCION","CANTIDAD","PRECIO","ESTADO" ]
  dataSources:MatTableDataSource<any>[]=[]

  addrow:number=0
  numero=0
  precio=0
  descripcion=""

  indexTab=0
  @ViewChildren(MatSort)
  sorts!: QueryList<MatSort>;
  constructor(public dialog: MatDialog,private context:ContextService, private serv:UserService,private autozone:AutozoneService,private estiserv:EstimacionService) {
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModaladdestimacionComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openAddcarro(enterAnimationDuration:string, exitAnimationDuration:string):void{
    this.dialog.open(AddcarroComponent, {
      width:'550px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
  openAddcliente(enterAnimationDuration: string, exitAnimationDuration:string): void {
    this.dialog.open(AddclienteComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
  closeClienteDialog(){
    this.dialog.closeAll()
  }
  ngOnInit(){
    this.vehicleInfo$.subscribe((val)=>{
      this.vehicleInfo=val;this.stCarro=true
      console.log("vehiBehavior",this.vehicleInfo)
    })
    console.log("stCarro",this.stCarro)
    this.daClientes=this.context.getClientes()
    this._oneArray()
    this._oneArray2()
    this.filteredOptions2=this.mycontrol2.valueChanges.pipe(
      startWith(''),
      map((value)=>this._filter2(value || ''))
    )
    this.filteredOptions=this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    )
    this.autozone.prodRecords$.subscribe((i)=>{
      
      console.log("subsProductos",i?.contents.contents.map((a)=>{
        const mapproductos=a.shelfPageBody.filter((f)=>f.name=="Results List")
         this.productos=mapproductos.map((i)=>{return i.records})
        console.log("produc:",this.productos)
        //console.log("mapProductos",a.shelfPageBody.filter((f)=>f.name=="Results List"))
      }))
    })
    this.estiserv.servicios$.subscribe((i)=>{
      this.servicios=i
      console.log("servicios",this.servicios)
    })
    this.estiserv.estiservicios$.subscribe((i:any)=>{
      console.log("obserEstiservicios$:",i)
      this.estiservicios=i
     
    })
   
  }
  log(i:any){

    console.log("var",i);
  }
  _oneArray(){
   //this.options= daCli.map((i,index)=>{return i.NOMBRE + i.APELLIDOS})
   const stClientes=this.stClientes$.pipe(map((v:any)=>{return v} ))
   .subscribe((v)=>{
     const arr=v.map((i: any )=>{return {ID:i.ID,NOMBRE:i.NOMBRE,APELLIDOS:i.APELLIDOS,NA:i.NOMBRE+' '+i.APELLIDOS,EMAIL:i.EMAIL,TELEFONO:i.TELEFONO,TALLER_ID:i.TALLER_ID}} )
     this.options=arr;
    console.log("oneArray1",arr)})

  }
  _oneArray2(){
   const stCarros= this.stCarros$.pipe(map((v:any)=>{return v}))
     .subscribe((v)=>{
      console.log("car",v)
      const arr=v.map((i:any)=>{return i})
      this.options2=arr;
     })
  }
  private _filter(value: any): any[]{
    var filterValue: any;
    if(value.NA) {
      filterValue=value.NA.toLowerCase()
    }else{
       filterValue=value.toLowerCase();
    }
    return this.options.filter((option:any) => option.NA.toLowerCase().includes(filterValue))
  }
  private _filter2(value:any): any[]{
    var filtervalue:any
     if(value.PLACA){
      filtervalue=value.MARCA.toLowerCase()
     }else{
      filtervalue=value.toLowerCase()
     }
    return this.options2.filter((option:any)=> option.PLACA.toLowerCase().includes(filtervalue))
  }
  getClientepr(cl:any){
    this.cliente=cl.value
    this.stCliente=true
  }
  getCarropr(cl:any){
    this.carro=cl.value
    this.stCarro=true
  }
  decliente(){
    this.stCliente=false
  }
  decarro(){
    this.stCarro=false
  }

  getRefa(){
    this.autozone.getLocation(this.vehicleInfo.engine.vehicleId,this.valueRefa.toLowerCase())
  }
  castMatatableDataSource(val:any){
    console.log("castMat",val)
    return new MatTableDataSource(val)
  }
  addLabor(serv:serviciost){
    this.addrow=serv.ID;
    this.descripcion="Labor"
  }
  addPiezaTab(pie:serviciost){
    this.addrow=pie.ID
   this.indexTab=1
   this.numero=0
  }
  addPieza(pieza:productos){
    this.descripcion=pieza.description
    this.precio=pieza.attributes.P_ItemPrice[0].slice(0,pieza.attributes.P_ItemPrice[0].length-1) as unknown as number
    this.indexTab=0
    console.log("savePiez",pieza)
  }
  
  delete(){
    this.addrow=0
  }
  save(serv:serviciost){
    var servicio:servicios={ID:0,NOMBRE:"",DESCRIPCION:this.descripcion,PRECIO:this.precio,CANTIDAD:this.numero,TALLER_ID:this.context.getUserDa()[0].TALLER_ID,SERVICIO_ID:serv.ID,ESTADO:""}

    this.estiserv.addServicio(servicio,this.callbackServicio.bind(this))
  }
  callbackServicio(st:boolean){
    if(st){
      this.addrow=0
      this.numero=0
      this.precio=0
    }
    
  }
}
