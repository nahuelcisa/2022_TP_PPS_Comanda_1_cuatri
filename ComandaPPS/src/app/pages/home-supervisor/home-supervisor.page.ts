import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MailServiceService } from 'src/app/services/mail-service.service';
import { PushService } from 'src/app/services/push-service.service';

@Component({
  selector: 'app-home-supervisor',
  templateUrl: './home-supervisor.page.html',
  styleUrls: ['./home-supervisor.page.scss'],
})
export class HomeSupervisorPage implements OnInit {

  clientes : any = [];
  usuarios : any = [];
  loading : boolean;

  constructor(private fs : FirestoreService, private mailS : MailServiceService, private toast : ToastController,
    private as : AuthService,private push : PushService) { 
    this.fs.traerClientes().subscribe(value => {
      this.clientes = value;
      this.clientes = this.clientes.filter(this.filtarHabilitado);
    });
    this.fs.traerUsuarios().subscribe(value =>{
      this.usuarios = value;
    });
  }

  ngOnInit() {
  }

  filtarHabilitado(item){
    if(item.habilitado){
      return false;
    }else{
      return true;
    }
  }

  habilitar(event, item){
    let usu : any;
    if(!event.target.checked)
    {
      for (const iterator of this.usuarios) {
        if(iterator.DNI == item.DNI){
          usu = iterator;
          console.log(usu);
          break;
        }
      }
      this.loading = true;
      item.habilitado = true;
      usu.habilitado = true;
      this.mailS.enviarAvisoHabilitado(item);
      setTimeout(() =>{
        this.fs.modificarCliente(item, item.id).then(()=>{
          this.fs.modificarUsuario(usu,usu.id).then(()=>{
            this.loading = false;
            this.as.registro(item);
            console.log(item);
            if(this.fs.sonido){
            this.reproducirSonido("audioBueno2");
            }
            this.SuccessToastEncuesta();
          });
        });
      },2500);
    }
  }

  async SuccessToastEncuesta() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Cliente habilitado!!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
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
