import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Pedido } from './pedido.model';

@Injectable()
export class PedidoService {
  
  constructor(private firestore: AngularFirestore) { }

  getPedidos() {
    return this.firestore.collection('pedidos').snapshotChanges();
  }

  getPedidosPorEmail(email: string) {
    return this.firestore.collection('pedidos', ref => ref.where('no_email', '==', email)).snapshotChanges();
  }

  incluirPedido(pedido: Pedido){
    return this.firestore.collection('pedidos').add(pedido);
  }
  
  alterarPedido(pedido: Pedido){
    delete pedido.$key;
    this.firestore.doc('pedidos/' + pedido.$key).update(pedido);
  }

  excluirPedido(pedidoId: string){
    this.firestore.doc('pedidos/' + pedidoId).delete();
  }
}
