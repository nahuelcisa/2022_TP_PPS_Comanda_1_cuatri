import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  escaneoQR: boolean = false; 
  menuOpciones: boolean = false;
  esperaAsignacionMesa: boolean = false;
  mesaAsignada : boolean = false;
  menuOpcionesConfirma : boolean = false;
  usuariosArray : any = [];
  usuarioActual : any = "";
  numeroMesaEscaneada : number;
  menu : boolean = false;
  listaEspera : any = [];
  mesa : boolean = false;
  listado : boolean;
  pedido : any = [];
  pedidoArray : any = [];
  usuarioPedido : any = '';
  tateti : boolean = false;
  ppt : boolean = false;
  aproxima2 : boolean = false;
  estadoPedido : boolean = false;
  juegos : boolean = false;
  encuesta : boolean = false;
  todasEncuestas : boolean = false;
  cuenta : boolean = false;
  chat : boolean = false;
  encuestaCargada : boolean = false;
  esperarPago : boolean = false;
  variableNormal : boolean = true;

  constructor(private fs : FirestoreService, private push : PushService, private sf : ScannerService, private toastController : ToastController, private router : Router) 
  { 
    //Busco en la coleccion de Lista de espera si esta, sino esta sigo en pantalla esperaAsignacionMesa
    console.log(this.fs.usuario);
    this.escaneoQR = true;
  }

  ngOnInit() 
  {
    this.fs.traerUsuarios().subscribe((value) =>
    {
      this.usuariosArray = value;
      for (let item of this.usuariosArray) 
      {
        if(item.nombre == this.fs.usuario.nombre)
        {
          console.log("EN EL IF DEL PRIMER SUBSCRIBE");
          this.usuarioActual = item;
          if(this.usuarioActual.mesa != 0){
            this.mesa = true;
            this.variableNormal = false;
          }
          break;
        }
      }
    });
    
    this.fs.traerPedidos().subscribe(value =>{
      this.pedido = value;
      this.cargarArray();

      console.log(this.fs.usuario.nombre);
      for (const iterator of this.pedidoArray) 
      {
        console.log(iterator.usuario.nombre);
        if(iterator.usuario.nombre == this.fs.usuario.nombre)
        {
          console.log("pedidos");
          this.usuarioPedido = iterator;
          
          if(iterator.estado == "pagado")
          {
            this.cuenta = false;
          }  
          else
          {
            console.log("iterator.pagoConfirmado");
            console.log(iterator.pagoConfirmado);
            if(iterator.pagoConfirmado)
            {
              this.esperarPago = false;
              console.log("holaaaa");
            }
          }  
        }
      }
     });
  }

  cargarArray(){
    for (const item of this.pedido) {
      this.pedidoArray.push(item);
    }
  }

  onEscanearQR(){

    let datoAComparar : any;

    this.sf.test().then((data) => {

      datoAComparar = data;
      this.sf.stopScan();
      if(datoAComparar == "@Local")
      {
        this.escaneoQR = false;
        this.menuOpciones = true;
      }
      else
      {
        if(this.fs.sonido){
        this.reproducirSonido("audioError");
        }
        this.MostrarToast("Este no es el QR de este local","QR incorrecto","danger").then((toast : any) =>{
          toast.present();
        });
      }
    })

  }

  reproducirSonido(dato : string)
    {
      let ruta : string = '../../../assets/sonidos/';
      let nombreArchivo : string = "";
      let audioNombre : string = "";

      audioNombre = dato + ".mp3"; 
      nombreArchivo = ruta + audioNombre;

      this.reproducir(nombreArchivo);

    }

    reproducir(ruta : string)
    {
      let audio = new Audio(ruta);
      audio.play();
    }

  verEncuestas()
  {
    this.todasEncuestas = true;
    this.menuOpciones = false;
    this.menuOpcionesConfirma = false;
  }

  esconderEncuestas()
  {
    this.todasEncuestas = false;

    if(this.usuarioPedido != '')
    {
      this.menuOpcionesConfirma = true;
    }
    else{

      this.menuOpciones = true;
    }
  }

  entrarListaEspera()
  {
    console.log(this.fs.usuario);
    this.fs.agregarAListaDeEspera(this.fs.usuario);
    this.sendPushMetre();
    this.menuOpciones = false;

    this.loading = true;
    //this.esperaAsignacionMesa = true;
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
    
    this.sf.test().then((data) => {
      
      this.numeroMesaEscaneada = parseInt(data);
      this.sf.stopScan();
    })
  }

  mostrarMenu()
  {
    let fondo = document.getElementById("1");

    this.estadoPedido = false;
    console.log(this.usuarioPedido);
    console.log(this.usuarioActual);
   
    //this.escanearQRMesa();

    this.sf.test().then((data) => {
      
      this.numeroMesaEscaneada = parseInt(data);
      this.sf.stopScan();

      if(this.numeroMesaEscaneada != this.usuarioActual.mesa)
      {
        if(this.usuarioActual.mesa == 0){
          if(this.fs.sonido){
          this.reproducirSonido("audioError");
          }
          this.MostrarToast("Usted no tiene una mesa asignada.","Error.","danger").then((toast : any) =>{
          toast.present();
        });
        }else{
          if(this.fs.sonido){
          this.reproducirSonido("audioError");
          }
          this.MostrarToast(`Esta no es la mesa que se le fue asignada, esta es la ${this.numeroMesaEscaneada} y usted tiene la ${this.usuarioActual.mesa}`,"Mesa incorrecta","danger").then((toast : any) =>{
            toast.present();
          });
        }
      }
      else if(this.usuarioPedido != ''){
        this.menuOpcionesConfirma = true;
        this.menu = false;
        this.mesa = false;
        }
        else 
        {
          if(this.usuarioPedido.estado == "en preparación")
          {
            this.menuOpcionesConfirma = true;
            this.mesa = false;
            this.menu = false;
            this.estadoPedido = false;
          }
          else
          { 
            this.mesa = false;
            this.menu = true;
            this.menuOpcionesConfirma = false;
          }
        }

    });

  }
  
  atrasCaptura(dato : boolean){
    this.menu = dato;
    this.mesa = true;
    let test;
    setTimeout(() => {
      for (const iterator of this.pedidoArray) {
        
        console.log(iterator);;
        if(iterator.usuario.nombre == this.fs.usuario.nombre){
          test = iterator;
          break;
        }
      }
      this.usuarioPedido = test;
      console.log(this.usuarioPedido);
    }, 500);
  }

  irJuegos()
  {
    this.juegos = true;
    this.menuOpcionesConfirma = false;
  }

  mostrarJuego(dato : number)
  {
    switch(dato)
    {
      case 1:
        this.tateti = true;
        this.juegos = false;
        break;

      case 2:
        this.ppt = true;
        this.juegos = false;
        break;

      case 3:
        this.aproxima2 = true;
        this.juegos = false;
        break;
    }
  }

  mostrarEstadoPedido()
  {
    this.estadoPedido = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  mostrarEncuesta()
  {
    this.encuesta = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
    this.usuarioPedido.pagoConfirmado = false;
    this.esperarPago = false;
  }

  volverAtras(dato : boolean)
  {
    this.encuesta = dato;
    this.menuOpcionesConfirma = true;
    this.encuestaCargada = true;
    this.escaneoQR = false;
  }

  terminar(dato : boolean)
  {
    if(this.tateti)
    {
      this.tateti = dato;
      this.menuOpcionesConfirma = true;
    }
    else
    {
      if(this.ppt)
      {
        this.ppt = dato
        this.menuOpcionesConfirma = true;
      }
      else
      {
        this.aproxima2 = dato;
        this.menuOpcionesConfirma = true;
      }
    }
  }

  confirmarEntrega()
  {
    this.usuarioPedido.entregaConfirmada = true;
    this.fs.modificarEstadoPedido(this.usuarioPedido,this.usuarioPedido.id);
    this.estadoPedido = false;
    this.mesa = true;
    this.escaneoQR = false;
  }

  consultarMozo()
  {
    this.chat = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  esconderChat()
  {
    this.chat = false;
    this.menuOpcionesConfirma = true;
    this.escaneoQR = false;
  }

  pedirCuenta()
  {
    this.cuenta = true;
    this.menuOpcionesConfirma = false;
    this.escaneoQR = false;
  }

  pagadoAtras(dato : boolean)
  {
    this.cuenta = dato;
    this.escaneoQR = false;
    this.menuOpcionesConfirma = false;
    this.esperarPago = true;
  }

  salir()
  {
    this.esperarPago = false;
    this.router.navigate(['/login']);
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
