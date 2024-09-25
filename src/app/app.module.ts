import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import { AddestimacionComponent } from './componentes/addestimacion/addestimacion.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog,MatDialogRef,MatDialogActions,MatDialogClose,MatDialogTitle,MatDialogContent,MatDialogModule} from '@angular/material/dialog';
import { ModaladdestimacionComponent } from './componentes/modaladdestimacion/modaladdestimacion.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddclienteComponent } from './componentes/addcliente/addcliente.component';
import { AddcarroComponent } from './componentes/addcarro/addcarro.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatSort } from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AddestimacionComponent,
    ModaladdestimacionComponent,
    AddclienteComponent,
    AddcarroComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,MatIconModule, MatToolbarModule, BrowserAnimationsModule, HttpClientModule,
    MatMenuModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,
    MatTabsModule,MatDialogModule,MatExpansionModule,MatSelectModule,MatCardModule,MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
