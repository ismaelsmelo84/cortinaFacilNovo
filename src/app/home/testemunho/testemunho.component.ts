import { Component, OnInit } from '@angular/core';

import { TestemunhoService } from './compartilhado/testemunho.service';
import { Testemunho } from './compartilhado/testemunho.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-testemunho',
  templateUrl: 'testemunho.component.html',
  providers: [TestemunhoService]
})

export class TestemunhoComponent implements OnInit {

  testemunhosLista: Testemunho[];
  testemunhosRef;
  
  constructor(private testemunhoService: TestemunhoService, private tostr: ToastrService) { }

  ngOnInit() {
    this.testemunhosLista = this.carregarTestemunhos();
  }

  private carregarTestemunhos() {
    let obj: Testemunho[] = [];
    let x = this.testemunhoService.getTestemunhos();
    x.subscribe(itens => {
      itens.map(
        item => { obj.push({
                    $key: item.payload.doc.id,
                    no_autor: item.payload.doc.data()['no_autor'],
                    ds_frase1: item.payload.doc.data()['ds_frase1'],
                    ds_frase2: item.payload.doc.data()['ds_frase2'],
                    ic_default: item.payload.doc.data()['ic_default']} as Testemunho);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Fretes!');
                });
    });
    (this).testemunhosRef = x;
    return obj;
  }
}



