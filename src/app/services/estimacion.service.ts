import { Injectable,OnInit } from '@angular/core';
import { servicios, serviciost } from '../models/data-type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContextService } from './context.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstimacionService {
  
  private apiUrl=environment.apiUrl
  private servicios=new BehaviorSubject<servicios[]>([]);
  public servicios$=this.servicios.asObservable();

  private estiservicios=new BehaviorSubject<any>([])
  public estiservicios$=this.estiservicios.asObservable();
  public arrayservicios:any=[]

  private serviciost=new BehaviorSubject<serviciost>({ID:0,NOMBRE:"",TALLER_ID:0,TIPO:{
    ID:0,
    DESCRIPCION:"",
    PRECIO:0,
    CANTIDAD:0,
    ESTADO:"",
    TALLER_ID:0,
    SERVICIO_ID:0
  }})
  public serviciost$=this.serviciost.asObservable()
  
  /*arrayserviciost:serviciost[]=[{ID:0,NOMBRE:"",TALLER_ID:0,TIPO:[{
    ID:0,
    DESCRIPCION:"",
    PRECIO:0,
    CANTIDAD:0,
    ESTADO:"",
    TALLER_ID:0,
    SERVICIO_ID:0
  }]}]*/
  constructor(private http:HttpClient, private context:ContextService) { }

  addServicio(servicio:servicios, cb:(st:boolean)=>void){
    servicio.TALLER_ID=this.context.userDa[0].TALLER_ID
    this.http.post(this.apiUrl+"/Addservicio",servicio,{observe:'response'})
      .subscribe((res)=>{
        if(res.ok){
          this.getServicios()
          cb(res.ok)
        }
      })
  }
  getServicios(){
    var taller_id=this.context.userDa[0].TALLER_ID
    this.http.get<servicios>(this.apiUrl+"/Servicios"+`?tallerid=${taller_id}`,{observe:'response'})
      .subscribe((res)=>{
        if(res.ok && Array.isArray(res.body)){
         const servunic=  res.body.filter((f)=>{
          return f.SERVICIO_ID===null
         })

        const servtipo= servunic.map((i:any)=>{  
            return {ID:i.ID,NOMBRE:i.NOMBRE,TALLER_ID:i.TALLER_ID,TIPO:this._filter(i,res.body)}                  
         })
        
            console.log("servunic:",servtipo)
          this.serviciost.next(servtipo as unknown as serviciost )
          this.servicios.next(res.body)
          console.log("ifnull",this.arrayservicios)
          if(this.arrayservicios.length>0){
            this.updateArrayservicios(servtipo)
          }
        }
      })
  }
  _filter(i:any,body:any){
    return body.filter((f:any)=>f.SERVICIO_ID===i.ID)
  }

  selectedServicios(servicios: serviciost,st:(s:boolean)=>void) {
    this.arrayservicios.push(servicios)
    st(true)
   this.estiservicios.next(this.arrayservicios)
  }
  updateArrayservicios(servtipo:any){
   var servtipo2=[]
     for(let arr of this.arrayservicios){
      for(let ser of servtipo){
        if(arr.ID==ser.ID)
          servtipo2.push(ser)
      }
     }
      this.estiservicios.next(servtipo2)
    
    
  }

}
