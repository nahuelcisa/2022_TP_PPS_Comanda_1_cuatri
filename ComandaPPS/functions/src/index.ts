import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.pushClienteNuevo = functions.firestore.document('usuarios/{usuarioId}').onCreate((snap:any,context:any)=>{
    let usuario = snap.data();
    const promises: any = [];
    if(usuario.rol == 'cliente'){
        let query = admin.firestore().collection('usuarios').where('rol', '==', 'supervisor');
        query.get().then((snapshot)=>{
            if(!snapshot.empty){
                snapshot.forEach(sup => {
                    let data = sup.data();
                    let payload = {
                        token: data.token,
                        notification: {
                            title: 'Ingreso nuevo cliente',
                            body: 'Habilita el nuevo cliente'
                        },
                        data:{
                            ruta: '/home/home-supervisor'
                        }
                    };
                    let p = admin.messaging().send(payload);
                    promises.push(p);
                });
                return Promise.all(promises);
            }
        return null;
        });
    }
    return null;
});


exports.pushListadeEspera = functions.firestore.document('usuarios/{usuarioId}').onUpdate((snap:any,context:any)=>{
    let usuario = snap.data();
    const promises: any = [];
    if( (usuario.rol == 'cliente' || usuario.rol == 'clienteAnonimo' ) && usuario.espera == 'true'){        //CONDICION PARA MANDAR EL NOTIFICATION
        let query = admin.firestore().collection('usuarios').where('rol', '==', 'empleado');                   //A QUIEN LE MANDA
        query.get().then((snapshot)=>{
            if(!snapshot.empty){
                snapshot.forEach(sup => {
                    let data = sup.data();
                    if(data.tipo == 'metre'){
                        let payload = {
                            token: data.token,
                            notification: {
                                title: 'Cliente en espera',
                                body: 'Hay un nuevo cliente en la lista de espera'
                            },
                            data:{
                                ruta: '/home/home-metre'
                            }
                        };
                        let p = admin.messaging().send(payload);
                        promises.push(p);
                    }

                });
                return Promise.all(promises);
            }
        return null;
        });
    }
    return null;
});


exports.nuevoMensaje = functions.database.ref('/general/{pushID}')
    .onCreate( (snapshot:any, context:any) =>{              //Cada vez que se crea un registro en el realtimeDatabase en /general/
        const mensaje = snapshot.val();
        const promises: any = [];
        if(mensaje.tipo === 'cliente')                      //Si el mensaje lo mando el cliente paso a enviar la notificacion 
        {
            let query = admin.firestore().collection('usuarios').where('rol', '==', 'empleado');      //La notificacion se la envio a todos los mozos
            query.get().then(snapshot =>{
                if(!snapshot.empty)
                {
                    snapshot.forEach(doc =>{
                        let data = doc.data();
                        if(data.tipo == 'mozo'){
                            let message = mensaje.text;
                            const payload = {
                                token: data.pushToken,
                                notification: {
                                    title: 'Nuevo mensaje mesa 5',
                                    body: `${message}`, 
                                },
                                data:{
                                    ruta: '/home/chat'
                                }
                            };
                            const p = admin.messaging().send(payload);
                            promises.push(p);
                        }
                    });
                    return Promise.all(promises);
                }
                else
                {
                    return null;
                }
            });
        }
        return null;
    });

exports.cocinaPush = functions.firestore.document('pedidos/{pedidoId}').onUpdate((snap:any,context:any)=>{
    let pedido = snap.data();
    const promises: any = [];
    if(pedido.estado == 'aprobado'){        //CONDICION PARA MANDAR EL NOTIFICATION
        let query = admin.firestore().collection('usuarios').where('rol', '==', 'empleado');                   //A QUIEN LE MANDA
        query.get().then((snapshot)=>{
            if(!snapshot.empty){
                snapshot.forEach(sup => {
                    let data = sup.data();
                    if(data.tipo == 'cocinero' || data.tipo == 'bartender'){
                        let payload = {
                            token: data.token,
                            notification: {
                                title: 'Pedido realizado',
                                body: 'Nuevo pedido a realizar'
                            },
                            data:{
                                ruta: '/home/home-cocina'
                            }
                        };
                        let p = admin.messaging().send(payload);
                        promises.push(p);
                    }
                });
                return Promise.all(promises);
            }
        return null;
        });
    }
    return null;
});

exports.pedidoRealizadoPush = functions.firestore.document('pedidos/{pedidoId}').onUpdate((snap:any,context:any)=>{
    let pedido = snap.data();
    const promises: any = [];
    if(pedido.estado == 'realizado'){        //CONDICION PARA MANDAR EL NOTIFICATION
        let query = admin.firestore().collection('usuarios').where('rol', '==', 'empleado');                   //A QUIEN LE MANDA
        query.get().then((snapshot)=>{
            if(!snapshot.empty){
                snapshot.forEach(sup => {
                    let data = sup.data();
                    if(data.tipo == 'mozo'){
                        let payload = {
                            token: data.token,
                            notification: {
                                title: 'Pedido realizado',
                                body: 'Nuevo pedido realizado'
                            },
                            data:{
                                ruta: '/home/home-cocina'
                            }
                        };
                        let p = admin.messaging().send(payload);
                        promises.push(p);
                    }
                });
                return Promise.all(promises);
            }
        return null;
        });
    }
    return null;
});