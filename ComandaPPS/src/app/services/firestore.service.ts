import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuariosCollectionReference: any;
  usuarios : Observable<any>;
  usuariosArray : any = [];

  clientesCollectionReference: any;
  clientes: Observable<any>;

  clientesArray : any = [];

  productosCollectionReference: any;
  productos: Observable<any>;

  productosArray : any = [];

  encuestasClientesCollectionReference: any;
  encuestasClientes: Observable<any>;

  encuestasClientesArray : any = [];

  duenSupCollectionReference: any;
  duenSup: Observable<any>;

  duenSupArray : any = [];

  empleadoCollectionReference: any;
  empleados: Observable<any>;

  empleadoArray : any = [];

  
  mesaCollectionReference: any;
  mesas: Observable<any>;

  mesaArray : any = [];


  encuestaEmpleadoCollectionReference: any;
  encuestasEmpleados: Observable<any>;

  encuestaArray : any = [];
  
  constructor(private angularF : AngularFirestore) 
  {
    this.usuariosCollectionReference = this.angularF.collection<any>('usuarios');
    this.usuarios = this.usuariosCollectionReference.valueChanges({idField: 'id'});

    this.traerUsuarios().subscribe(value =>{
      this.usuariosArray = value;
    });

    this.clientesCollectionReference = this.angularF.collection<any>('clientes');
    this.clientes = this.clientesCollectionReference.valueChanges({idField: 'id'});

    this.traerClientes().subscribe(value => {
      this.clientesArray = value;
    });

    this.productosCollectionReference = this.angularF.collection<any>('productos');
    this.productos = this.productosCollectionReference.valueChanges({idField: 'id'});

    this.traerProductos().subscribe(value => {
      this.productosArray = value;
    });

    this.encuestasClientesCollectionReference = this.angularF.collection<any>('encuestasClientes');
    this.encuestasClientes = this.encuestasClientesCollectionReference.valueChanges({idField: 'id'});

    this.traerEncuestasClientes().subscribe(value => {
      this.encuestasClientesArray = value;
    });

    this.duenSupCollectionReference = this.angularF.collection<any>('duenSups');
    this.duenSup = this.duenSupCollectionReference.valueChanges({idField: 'id'});

    this.traerDuenSups().subscribe(value => {
      this.duenSupArray = value;
    });

    this.empleadoCollectionReference = this.angularF.collection<any>('empleados');
    this.empleados = this.empleadoCollectionReference.valueChanges({idField: 'id'});

    this.traerempleados().subscribe(value => {
      this.empleadoArray = value;
    });

    this.mesaCollectionReference = this.angularF.collection<any>('mesas');
    this.mesas = this.mesaCollectionReference.valueChanges({idField: 'id'});

    this.traerMesas().subscribe(value => {
      this.mesaArray = value;
    });

    this.encuestaEmpleadoCollectionReference = this.angularF.collection<any>('encuestasEmpleados');
    this.encuestasEmpleados = this.encuestaEmpleadoCollectionReference.valueChanges({idField: 'id'});

    this.traerEncuestasEmpleados().subscribe(value => {
      this.encuestaArray = value;
    });
  }

  traerClientes()
  {
    return this.clientes;
  }

  traerUsuarios()
  {
    return this.usuarios;
  }
 
  traerProductos()
  {
    return this.productos;
  }

  traerEncuestasClientes()
  {
    return this.encuestasClientes;
  }

  traerDuenSups()
  {
    return this.duenSup;
  }

  traerempleados()
  {
    return this.empleados;
  }

  traerMesas()
  {
    return this.mesas;
  }

  traerEncuestasEmpleados()
  {
    return this.encuestasEmpleados;
  }

/*   modificarFoto(foto : any, id : any, coleccion : string)
  {
    return this.angularF.collection(coleccion).doc(id).update(foto);
  } */

  modificarCliente(objeto: any, id_objeto: any){
    return this.angularF.collection('clientes').doc(id_objeto).update(objeto);
  }
  modificarUsuario(objeto: any, id_objeto: any){
    return this.angularF.collection('usuarios').doc(id_objeto).update(objeto);
  }

  agregarCliente(cliente : any)
  {
      this.clientesCollectionReference.add({...cliente});
      this.usuariosCollectionReference.add({...cliente});
  }

  agregarEmpleado(empleado : any)
  {     
    this.empleadoCollectionReference.add({...empleado});
    this.usuariosCollectionReference.add({...empleado});
  }

  agregarProducto(producto : any)
  {
    this.productosCollectionReference.add({...producto});
  }

  agregarEncuestaCliente(ec : any)
  {
    this.encuestasClientesCollectionReference.add({...ec});
  }

  agregarDuenSup(duenSup : any)
  {
    this.duenSupCollectionReference.add({...duenSup});
    this.usuariosCollectionReference.add({...duenSup});
  }

  agregarMesa(mesa : any)
  {
      this.mesaCollectionReference.add({...mesa});
  }

  agregarEncuestaEmpleado(encuesta : any)
  {
      this.encuestaEmpleadoCollectionReference.add({...encuesta});
  }

  guardarToken(user:any, token:any){
    console.log(user);
    this.angularF.collection('usuarios').doc(user.id).update({token:token});
  }
}
