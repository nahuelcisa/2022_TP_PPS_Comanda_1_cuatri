// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fcmUrl: 'https://fcm.googleapis.com/fcm/send',
  fcmServerKey:
    // eslint-disable-next-line max-len
    'AAAAx9Hbj30:APA91bHfPOGThQH-vG4a8e21aNoWVa3Qgtesqde_aWl6k8qILomnsQyHoktIZLTf-g4N1mXGRJR80oL1qmwDDRFj_x-RnA5lyBQ2X4aB1g4TV3t19p-8W-bWbFUsTWTg7Z2VnmC96O7y',
  firebaseConfig : {
    apiKey: "AIzaSyC1k0bfLOYlXuD0u_FAYHw60gzl9xI6E7M",
    authDomain: "comanda-pps-62f45.firebaseapp.com",
    projectId: "comanda-pps-62f45",
    storageBucket: "comanda-pps-62f45.appspot.com",
    messagingSenderId: "858219319165",
    appId: "1:858219319165:web:26cbd583a6bde28dd20614"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
