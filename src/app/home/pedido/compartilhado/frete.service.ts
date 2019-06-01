import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Frete } from './frete.model';

@Injectable()
export class FreteService {
  
  constructor(private firestore: AngularFirestore) { }

  getFretes() {
    return this.firestore.collection('fretes', ref => ref.orderBy('sgUf')).snapshotChanges();
  }

  incluirFrete(frete: Frete){
    return this.firestore.collection('fretes').add(frete);
  }

  alterarFrete(frete: Frete){
    delete frete.$key;
    this.firestore.doc('fretes/' + frete.$key).update(frete);
  }

  excluirFrete(freteId: string){
    this.firestore.doc('fretes/' + freteId).delete();
  }
}
