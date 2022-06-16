import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.page.html',
  styleUrls: ['./home-metre.page.scss'],
})
export class HomeMetrePage implements OnInit {

  mesasArray : any = [];
  mesas : any = [];
  listaEspera : any = [];
  mesaSeleccionada : any;
  usuariosArray : any = [];
  constructor(private fs : FirestoreService, private toastController : ToastController, public as : AuthService) 
  { 

  }

  ngOnInit() 
  {
    this.fs.traerlistaEspera().subscribe((value) =>{
      this.listaEspera = value;

      this.fs.traerMesas().subscribe((datos) =>{
        this.mesas = datos;
        this.mesasArray = [];
        this.cargarMesasLibres();

        this.fs.traerUsuarios().subscribe((value) =>{
          this.usuariosArray = value;
        });
      });
    });
  }

  
  cargarMesasLibres()
  {
    for (const item of this.mesas) {
      this.mesasArray.push(item);   
    }
    
    this.mesasArray = this.mesasArray.filter(this.filtrarMesasLibres);    
  }

  filtrarMesasLibres(item){
    if(!item.ocupada){      
      return true;
    }else{
      return false;
    }
  }


  asignarMesa(usuario : any)
  {
    console.log(this.mesaSeleccionada);
    console.log(usuario);
    let usuarioAModificar : any;
    let mesaAModificar : any;
    for (let item of this.usuariosArray) 
    {
      if(usuario.nombre == item.nombre)
      {
        usuarioAModificar = item;
        break;
      }
    }

    for (let item of this.mesasArray) 
    {
      if(item.nroMesa == this.mesaSeleccionada)
      {
        mesaAModificar = item;
        break;
      }
    }
    
    mesaAModificar.ocupada = true;
    usuarioAModificar.mesa = this.mesaSeleccionada;
    this.fs.modificarMesa(mesaAModificar,mesaAModificar.id);
    this.fs.modificarUsuario(usuarioAModificar,usuarioAModificar.id);
    this.fs.eliminarListaEspera(usuario.id);
    if(this.fs.sonido){
    this.reproducirSonido("audioBueno2");
    }
    this.MostrarToast(`La mesa ${this.mesaSeleccionada} ha sido asignada a ${usuario.nombre}`).then((toast : any) =>{
      toast.present();
    });
  }

  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Mesa asignada',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: 'success'
    });
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
}
