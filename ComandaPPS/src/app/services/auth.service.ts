import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loading : boolean = false;
  logeado : any;
  constructor(public auth : AngularFireAuth, public router : Router, private toastController : ToastController) { }

  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top'
    });
  }

  MostrarToastSuccess(message : string)
  {
    return this.toastController.create({
            header: 'Registrado',
            message: message,
            buttons: ['Ok'],
            position: 'top'
    });
  }


  login(email : string, password : string)
  {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(email,password).then(() =>
    {
      setTimeout(() => {
        this.loading = false;
        this.logeado = {
          email : email,
          password : password,
        }
        this.router.navigate(['/main']);
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

  logOut()
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
    return this.auth.createUserWithEmailAndPassword(usuario.email,usuario.password);
  }
}


