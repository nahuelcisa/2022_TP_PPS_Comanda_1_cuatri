import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  mensajes : any;
  mensaje : any;
  mensajeEnviar: any = "";
  usuariosArray : any = [];
  usuarioActual : any;

  constructor(private chat : ChatService,public as : AuthService, public fs : FirestoreService) { 
    this.mensajes = chat.items;
    console.log(this.mensajes);
    this.mensaje = {
      user: '',
      message: '',
      date: Date().toString(),
    }

    this.fs.traerUsuarios().subscribe((value) =>{
      this.usuariosArray = value;
      for (const iterator of this.usuariosArray) 
      {
        if(iterator.nombre == this.fs.usuario.nombre)
        {
          this.usuarioActual = iterator;
          break;
        }
      }
    })
  }

  ngOnInit(){
    
  }

  sendMessage()
  {
    let hora = new Date();
    let consulta : any;
     

    this.mensaje.user = this.fs.usuario.nombre;
    this.mensaje.perfil = this.fs.usuario.perfil;
    this.mensaje.receptor = "";
    this.mensaje.message = this.mensajeEnviar;

    this.mensaje.date = hora.getHours() + ':' + hora.getMinutes();
    consulta = {
      nombre : this.fs.usuario.nombre,
      date : this.mensaje.date,
      mesa : this.usuarioActual.mesa
    }
    this.chat.sendMessage(this.mensaje);
    this.mensaje.message = '';
    this.mensajeEnviar = '';
    this.fs.agregarConsulta(consulta);

  }

}
