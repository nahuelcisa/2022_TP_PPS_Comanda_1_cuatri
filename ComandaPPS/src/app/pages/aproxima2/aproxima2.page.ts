import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-aproxima2',
  templateUrl: './aproxima2.page.html',
  styleUrls: ['./aproxima2.page.scss'],
})
export class Aproxima2Page implements OnInit {

  @Output() terminadoEvent = new EventEmitter<boolean>();
  numeros : Array<number> = [];
  aAproximarse : number = 0;  
  operandos : Array<number> = [];
  numeroActual : number = 0;
  operaciones : number = 7;
  operando : number = 0;
  disabled : boolean = false;
  disabledOperador : boolean = true;
  puntaje : number = 0;
  usuarioActual : any;
  usuarios : any = [];
  descuento : number = 0;

  
  constructor(private toast : ToastController, private fs : FirestoreService, private as : AuthService) {
    this.numeros = [1,2,3,4,5,6,7,8,9,10,
                    11,12,13,14,15,16,17,18,
                    19,20];
    
    this.inicializar();

    this.fs.traerUsuarios().subscribe((value) =>
    {
      this.usuarios = value;

      for(let item of this.usuarios) 
      {
        if(this.fs.usuario.nombre == item.nombre)
        {
          this.usuarioActual = item;
          break;
        }
      }
    })
   }

  ngOnInit(): void {
  }

  inicializar()
  {
    this.operaciones = 7;
    this.disabledOperador = true;
    this.disabled = false;
    this.numeroActual = 0;
    this.aAproximarse = Math.floor(Math.random() * (501 - 100)) + 100;
    
    let random : number = 0;

    for (let i = 0; i < 6; i++) { 
      random = Math.floor(Math.random() * this.numeros.length);
      this.operandos.push(this.numeros[random]);
      this.numeros = this.numeros.filter((numero : number) => numero != this.numeros[random]);   
    }
  }

  asignarOperando(numero : number)
  {
    this.operando = numero;
    this.disabled = true;
    this.disabledOperador = false;
  }

  asignaciones()
  {
    this.operando = 0;
    this.disabled = false;
    this.operaciones--;
    this.disabledOperador = true;

    if(this.operaciones == 0)
    {
      this.analisis();
    }
  }

  operar(operador : string)
  {
    switch(operador)
    {
        case '+':
          this.numeroActual = Math.floor(this.numeroActual + this.operando);
          this.asignaciones();
          break;
        case '-':
          this.numeroActual = Math.floor(this.numeroActual - this.operando);
          this.asignaciones();
          break;
        case '*':
          this.numeroActual = Math.floor(this.numeroActual * this.operando);
          this.asignaciones();
          break;
        case '/':
          this.numeroActual = Math.floor(this.numeroActual / this.operando);
          this.asignaciones();
          break;
    }
  }

  analisis()
  {
    let resultado : number = this.aAproximarse - this.numeroActual;

    if(resultado == 0)
    {
      this.puntaje = 10;
      this.descuento = 20;
      this.MostrarToast("Has igualado el numero, tu puntaje es: " + this.puntaje,"Te haz aproximado","success").then((toast : any) =>{
        toast.present();
      });
    }
    else
    {
      if(this.numeroActual > this.aAproximarse)
      {
        this.puntaje = 0;
        this.descuento = 0;
        this.MostrarToast("Te haz pasado, tu puntaje es: " + this.puntaje,"No te has aproximado","danger").then((toast : any) =>{
          toast.present();
        });
      }
      else
      { 
        if(this.numeroActual < this.aAproximarse)
        {
          this.puntaje = 0;
          this.descuento = 0;
          this.MostrarToast("Te haz quedado en el camino, tu puntaje es: " + this.puntaje,"No te haz aproximado","danger").then((toast : any) =>{
            toast.present();
          });
        }
      }  
    }
    this.as.loading = true;
    this.usuarioActual.juegoJugado = true;
    this.usuarioActual.descuento = this.descuento;

    this.fs.modificarUsuario(this.usuarioActual,this.usuarioActual.id);
    this.fs.modificarCliente(this.usuarioActual,this.usuarioActual.id);

    this.disabledOperador = true;
    this.disabled = true;
    setTimeout(() => {
      this.as.loading = false;
      this.terminadoEvent.emit(false);
    }, 3000);
  }

  MostrarToast(message : string, header : string, color : string)
  {
    return this.toast.create({
            header: header,
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: color
    });
  }


}

