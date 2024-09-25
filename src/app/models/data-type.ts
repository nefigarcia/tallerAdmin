export interface DataType {
}
export interface login{
    email:string;
    password:string;
}
export interface signUp{
    name:string;
    apellidos:string;
    email:string;
    password:string;
}
export interface user{
    ID: number;
    NOMBRE: string;
    TALLER_ID:number;
    NOMBRET: string;
    APP:string;
}
export interface taller{
    name:string;
    id:number;
}
export interface cliente{
    name:string;
    apellidos:string;
    email:string;
    tel:number;
    tallerid:number;
}
export interface client{
    APELLIDOS:string
    EMAIL:string
    ID:number
    NA:string
    NOMBRE:string
    TALLER_ID:number
    TELEFONO:number
}
export interface carro{
    ID:number
    MARCA:string
    MODELO:string
    YEAR:number
    PLACA:string
    TALLER_ID:number
    VIN:string
}
export interface showSignUpTaller{
    showTaller: boolean;
}
export interface vehicleInfo{
    year:string
    make:string
    model:string
     engine:{
        engine:string
        engineId:string
        vehicleId:string
    }
    
}
export interface location{
    locationWebApp:string
    location:string
}
export interface records{
    contents:{
      contents:[{
        shelfPageBody:[{
            name:string
            records:[{
                brand:string,
                description:string,
                name:string,
                partNumber:string,
                productImageUrl:string,
                attributes:{
                  P_ItemPrice:[string]
                }
            }]
  
        }]
      }]
    }
} 
export interface productos{ 
        brand:string,
        description:string,
        name:string,
        partNumber:string,
        productImageUrl:string,
        attributes:{
          P_ItemPrice:[string]
        }
}
export interface servicios{
    ID:number,
    NOMBRE:string,
    DESCRIPCION:string,
    PRECIO:number,
    CANTIDAD:number,
    ESTADO:string,
    TALLER_ID:number,
    SERVICIO_ID:number
}
export interface serviciost{
    ID:number,
    NOMBRE:string,
    TALLER_ID:number,
        TIPO:{
            ID:number,
            DESCRIPCION:string,
            PRECIO:number,
            CANTIDAD:number,
            ESTADO:string,
            TALLER_ID:number,
            SERVICIO_ID:number
        }
}