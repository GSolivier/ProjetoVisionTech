import { Component, OnInit } from '@angular/core';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titulo = 'Página principal'
  constructor(public nav: NavService) { }

  faBuilding = faBuilding

  ngOnInit() {
    this.nav.show();
  }

}
