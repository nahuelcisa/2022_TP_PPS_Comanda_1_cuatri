import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {


  pagado : boolean = false;
  scaneo : boolean = true;
  constructor() { }

  ngOnInit() {
  }

}