import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

departamentoSelecionado: string;  

back(){
    this.departamentoSelecionado = '';
}
faBuilding = faBuilding
faUser = faUser

  constructor( public nav: NavService) { }

  ngOnInit() {
  }

}
