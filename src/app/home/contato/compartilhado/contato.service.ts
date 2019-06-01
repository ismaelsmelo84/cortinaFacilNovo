import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Contato} from './contato.model';

@Injectable()
export class ContatoService {
  constructor( private firestore: AngularFirestore ) { }

  getContatos() {
    return this.firestore.collection('contato').snapshotChanges();
  }

  incluirContato(contato: Contato){
    return this.firestore.collection('contato').add(contato);
  }
  
  alterarContato(contato: Contato){
    delete contato.$key;
    this.firestore.doc('contato/' + contato.$key).update(contato);
  }

  excluirContato(contatoId: string){
    this.firestore.doc('contato/' + contatoId).delete();
  }
}
