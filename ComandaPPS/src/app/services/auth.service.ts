import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loading : boolean = false;
  logeado : any;
  usuarios : any;
  usuariosArray : any = [];
  objUsuarioLogeado : any;

  constructor(public auth : AngularFireAuth, public router : Router, private toastController : ToastController, private fs : FirestoreService) 
  { 
    this.fs.traerUsuarios().subscribe(value => {
      this.usuarios = value;
      this.cargarArray();
    }); 
  }

  cargarArray(){
    for (const item of this.usuarios) {
      this.usuariosArray.push(item);
    }
  }
  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: "danger"
    });
  }

  MostrarToastSuccess(message : string)
  {
    return this.toastController.create({
            header: 'Registrado',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: "success"
    });
  }


  login(email : string, password : string)
  {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(email,password).then(() =>
    {
      for (const item of this.usuariosArray) {
        if(item.email == email && item.clave == password){
         this.logeado = item;
       } 
     }    
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/home']);
      }, 2500); 
    }).catch(response =>{
      
      this.loading = false;
      if(response.code == 'auth/user-not-found')
      {
          this.MostrarToast('La contraseña o el email son incorrectos').then((toast : any) => {
            toast.present();
          })
      }
      else{
        
        if(response.code == 'auth/wrong-password' || response.code == 'auth/wrong-email')
        {
          this.MostrarToast('La contraseña o el email son incorrectos').then((toast : any) => {
            toast.present();
          })
        }
        else{
          if(response.code == 'auth/missing-email' || response.code == 'auth/missing-password')
          {
            this.MostrarToast('No puede haber ningún campo vacío').then((toast : any) => {
              toast.present();
            })
          }
          else
          {
            if(response.code == 'auth/invalid-email' || response.code == 'auth/invalid-password')
            {
              this.MostrarToast('La contraseña o el email son incorrectos').then((toast : any) => {
                toast.present();
              })
            }
          }
        }
      }
    })
  }

  logout()
  {
    this.loading = true;
    this.auth.signOut();

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);    
    }, 2000);
  }

  registro(usuario : any)
  {
    return this.auth.createUserWithEmailAndPassword(usuario.email,usuario.clave);
  }
}


