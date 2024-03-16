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
export interface showSignUpTaller{
    showTaller: boolean;
}