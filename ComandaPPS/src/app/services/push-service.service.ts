import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import{
  LocalNotifications,
  ActionPerformed as localNotificationActionPerformed
} from '@capacitor/local-notifications'

import { Platform } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private platform: Platform, private fs: FirestoreService, private authS: AuthService, private router: Router) {
    console.log(authS.logeado);
    this.inicializar();
  }
  
  inicializar(){
    if(this.platform.is('capacitor'))
    {
      PushNotifications.register();
      this.addListeners();
    }
  }
  
  addListeners(){
    PushNotifications.addListener('registration', (token: Token) => {
      this.fs.guardarToken(this.authS.logeado, token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
       
        LocalNotifications.schedule({
          notifications:[
            {
            title: notification.title,
            body: notification.body,
            id: 1,
            extra:{
              data: notification.data
            }
          }
        ]})
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.router.navigate([notification.notification.data.ruta]);

      },
    );

    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notification: localNotificationActionPerformed) => {
        this.router.navigate([notification.notification.extra.data.ruta]);
      },
    );
  }

}