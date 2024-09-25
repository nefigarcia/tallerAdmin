import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { location, records, vehicleInfo } from '../models/data-type';


@Injectable({
  providedIn: 'root'
})
export class AutozoneService {
  private apiUrl=environment.apiUrl
  private apurl=environment.apiUrl+"/Autozone"
  private apiAuto="https://www.autozone.com.mx/ecomm/b2c/v1/searchresult"
  
  private marcas=new BehaviorSubject<any[]>([]) 
  public marcas$=this.marcas.asObservable();

  private modelos=new BehaviorSubject<any[]>([])
  public modelos$=this.modelos.asObservable();

  private motores=new BehaviorSubject<any>([])
  public motores$=this.motores.asObservable()

  public vehicle=new BehaviorSubject<vehicleInfo>({year:"",make:"",model:"",engine:{engine:"",engineId:"",vehicleId:""}})
  public vehicle$=this.vehicle.asObservable()

  public location=new BehaviorSubject<location>({locationWebApp:"",location:""})
  public location$=this.location.asObservable()

  public prodRecords=new BehaviorSubject<records | null>(
    {
      contents:{
       contents:[{
        shelfPageBody:[{
          name:"",
          records:[{
              brand:"",
              description:"",
              name:"",
              partNumber:"",
              productImageUrl:"",
              attributes:{
                P_ItemPrice:[""]
              }
          }]
         
        }]
       }]
      }
    }
  ) 
  public prodRecords$= this.prodRecords.asObservable() 
  public y:number=0
  constructor(private http:HttpClient) { }

  getMarcas(y:number){
    this.http.get<any>(this.apiUrl+`makes/`+y, {observe:'response'} )
      .subscribe((result)=>{
        if(Array.isArray(result)){
          this.marcas=result.body;
          console.log(this.marcas$)

        }
      })
  }

  getMarcass(y:number){
    this.http.get<any>(this.apurl+`?y=${y}`, {observe:'response'} )
      .subscribe((result)=>{
        console.log("Marcas",result)
        this.y=y
        if(Array.isArray(result.body) && result.ok){
          this.marcas.next(result.body);
        }
      })
  }
  getModelos(m:any){
    this.http.get<any>(this.apiUrl+'/Modelos'+`?m=${m.make}&y=${this.y}&id=${m.makeId}`,{observe:'response'})
      .subscribe((res)=>{
        if(res.ok && Array.isArray(res.body)){
          this.modelos.next(res.body)
        }
      })
  }
  getMotores(m:any){
    this.http.get<any>(this.apiUrl+'/Motores'+`?modId=${m.modelId}`,{observe:'response'})
      .subscribe((res)=>{
        if(res.ok && Array.isArray(res.body)){
          console.log("MOTORES",res.body)
          this.motores.next(res.body)

        }
      })
  }
  
  getLocation(i:any,val:string){
   console.log("vehicleId",val)
    this.http.get<location>(this.apiUrl+'/Location'+`?vehicleId=${i}&searchText=${val}`,{observe:'response'})
      .subscribe((res)=>{
        if(res.ok && res.body?.location!=null){
          this.location.next(res.body)
          this.getCategory(res.body.location,i)
          console.log("loc",res.body.location)
        }        
      })
  }
  getCategory(location:string,veId:any){
    this.http.get<records>(this.apiUrl+'/Category'+`?vehicleId=${veId}&location=${location}`,{observe:'response'}) 
      .subscribe((resp)=>{
        if(resp.ok && Array.isArray( resp.body?.contents.contents)){
          console.log(resp.body)
          this.prodRecords.next(resp.body) 
          console.log(resp.body?.contents.contents.map((i)=>{console.log("records",i.shelfPageBody)}))
        }
      })
  }
}

