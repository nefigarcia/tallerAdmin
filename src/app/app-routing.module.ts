import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './home/home.component';
import { AddestimacionComponent } from './componentes/addestimacion/addestimacion.component';

const routes: Routes = [
  {path:"", component:InicioComponent},
  {path:"login", component:LoginComponent},
  {path: "home",component: HomeComponent},
  {path: "addestimacion",component: AddestimacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
