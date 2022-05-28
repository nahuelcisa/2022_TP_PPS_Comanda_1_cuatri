import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  clientesCollectionReference: any;
  clientes: Observable<any>;

  clientesArray : any = [];

  duenSupCollectionReference: any;
  duenSup: Observable<any>;

  duenSupArray : any = [];

  empleadoCollectionReference: any;
  empleados: Observable<any>;

  empleadoArray : any = [];

  
  mesaCollectionReference: any;
  mesas: Observable<any>;

  mesaArray : any = [];
  
  constructor(private angularF : AngularFirestore) 
  {
    this.clientesCollectionReference = this.angularF.collection<any>('clientes');
    this.clientes = this.clientesCollectionReference.valueChanges({idField: 'id'});

    this.traerClientes().subscribe(value => {
      this.clientesArray = value;
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
  }

  traerClientes()
  {
    return this.clientes;
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

/*   modificarFoto(foto : any, id : any, coleccion : string)
  {
    return this.angularF.collection(coleccion).doc(id).update(foto);
  } */

  agregarCliente(cliente : any)
  {
      this.clientesCollectionReference.add({...cliente});
  }

  agregarEmpleado(empleado : any)
  {
      this.empleadoCollectionReference.add({...empleado});
  }

  agregarDuenSup(duenSup : any)
  {
      this.duenSupCollectionReference.add({...duenSup});
  }

  agregarMesa(mesa : any)
  {
      this.mesaCollectionReference.add({...mesa});
  }
}
