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
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [						
    AppComponent,
      DepartamentosComponent,
      FuncionariosComponent,
      HomeComponent,
      NavComponent,
      TituloComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    FontAwesomeModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
