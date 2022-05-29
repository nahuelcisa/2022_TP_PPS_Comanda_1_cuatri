import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pregunta3',
  templateUrl: './pregunta3.page.html',
  styleUrls: ['./pregunta3.page.scss'],
})
export class Pregunta3Page implements OnInit {

  @Output() respuesta3 = new EventEmitter();

  valor_respuesta: any; // Capturo el valor de respuesta

  constructor() { }

  ngOnInit() {
  }

  respuestaRadioGroup(event: any){   

    switch (event.value) {
      case "1":        
        this.valor_respuesta = "Si";
        break;
      case "2":        
        this.valor_respuesta = "No";
        break;
      case "3":        
        this.valor_respuesta = "Mas o menos";
        break;
      default:
        this.valor_respuesta = "";
      break;
    }
    
    this.respuesta3.emit(this.valor_respuesta);
    this.valor_respuesta = "";
  }
}
