import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push-service.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {


  loading: boolean = false;
  escaneoQR: boolean = true; 
  menuOpciones: boolean = false;
  esperaAsignacionMesa: boolean = false;
  mesaAsignada : boolean = false;
  menuOpcionesConfirma : boolean = false;
  usuariosArray : any = [];
  usuarioActual : any = "";
  numeroMesaEscaneada : string = "";
  menu : boolean = false;
  listaEspera : any = [];
  mesa : boolean = false;
  listado : boolean;
  pedido : any = [];
  pedidoArray : any = [];
  usuarioPedido : any = '';
  
  constructor(private fs : FirestoreService, private push : PushService, private sf : ScannerService, private toastController : ToastController) 
  { 
    //Busco en la coleccion de Lista de espera si esta, sino esta sigo en pantalla esperaAsignacionMesa
    console.log(this.fs.usuario);
    
  }

  ngOnInit() 
  {
    this.fs.traerUsuarios().subscribe((value) =>
    {
      this.usuariosArray = value;
      for (let item of this.usuariosArray) 
      {
        if(item.nombre == "pppp")
        {
          this.usuarioActual = item;
          break;
        }
      }
    });
    console.log(this.fs.usuario);
    this.fs.traerPedidos().subscribe(value =>{
      this.pedido = value;
      this.cargarArray();
     });
  }

  cargarArray(){
    for (const item of this.pedido) {
      this.pedidoArray.push(item);
    }
  }

  onEscanearQR(){
    this.escaneoQR = false;     
    this.menuOpciones = true;    
  }

  verEncuestas()
  {
      
  }



  entrarListaEspera()
  {
    console.log(this.fs.usuario);
    this.fs.agregarAListaDeEspera(this.fs.usuario);
    this.sendPushMetre();
    this.menuOpciones = false;

    this.loading = true;
    //this.esperaAsignacionMesa = true;
    this.mesa = true;
  }

  sendPushMetre() 
  {
    this.push
      .sendPushNotification({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        registration_ids: [
          // eslint-disable-next-line max-len
          '',
        ],
        notification: {
          title: 'Lista de Espera',
          body: 'Hay un nuevo cliente esperando una mesa',
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  escanearQRMesa()
  {
    let datos : any = [];
    
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      this.numeroMesaEscaneada = datos[0];
      this.sf.stopScan();
    })
  }

  mostrarMenu()
  {
    let fondo = document.getElementById("1");
    fondo.classList.remove("fondo");
    fondo.classList.add("fondo2")
    console.log(this.fs.usuario);
    /*     this.escanearQRMesa();
    if(this.numeroMesaEscaneada != this.fs.usuario.mesa)
    {
      this.MostrarToast(`Esta no es la mesa que se le fue asignada, esta es la ${this.numeroMesaEscaneada} y usted tiene la ${this.fs.usuario.mesa}`,"Mesa incorrecta","danger").then((toast : any) =>{
        toast.present();
      });
    }
    else */if(this.usuarioPedido != ''){
      this.menuOpcionesConfirma = true;
      this.menu = false;
      this.mesa = false;
      console.log('lalal');
    }else
    { 
      this.mesa = false;
      this.menu = true;
      this.menuOpcionesConfirma = false;
    }
  }
  
  atrasCaptura(dato : boolean){
    this.menu = dato;
    this.mesa = true;
    let test;
    setTimeout(() => {
      for (const iterator of this.pedidoArray) {
        console.log(iterator.usuario.nombre);
        console.log(this.fs.usuario.nombre);
        if(iterator.usuario.nombre == this.fs.usuario.nombre){
          test = iterator;
          console.log("entre al fi");
          break;
        }
      }
      this.usuarioPedido = test;
      console.log(this.usuarioPedido);
    }, 500);
  }

  MostrarToast(message : string, header : string, color : string)
    {
      return this.toastController.create({
              header: header,
              message: message,
              buttons: ['Ok'],
              position: 'top',
              color: color
      });
    }
}
