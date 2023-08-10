import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TituloComponent } from './titulo/titulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [					
    AppComponent,
      DepartamentosComponent,
      FuncionariosComponent,
      HomeComponent,
      NavComponent,
      TituloComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
