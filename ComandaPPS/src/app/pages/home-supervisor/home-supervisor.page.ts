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
  loading : boolean;

  constructor(private fs : FirestoreService, private mailS : MailServiceService, private toast : ToastController,
    private as : AuthService, private push : PushService) { 
    this.fs.traerClientes().subscribe(value => {
      this.clientes = value;
      this.clientes = this.clientes.filter(this.filtarHabilitado);
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
    if(!event.target.checked)
    {
      this.loading = true;
      item.habilitado = true;
      this.mailS.enviarAvisoHabilitado(item);
      setTimeout(() =>{
        this.fs.modificarCliente(item, item.id).then(()=>{
          this.loading = false;
          this.SuccessToastEncuesta();
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

}
