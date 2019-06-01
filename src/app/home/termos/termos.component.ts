import { Component, OnInit } from '@angular/core';

import { TermoService } from './compartilhado/termos.service';
import { Termos } from './compartilhado/termos.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-termos',
  templateUrl: 'termos.component.html',
  providers: [ TermoService ]
})

export class TermosComponent implements OnInit {

 termosEsqLista: Termos[];
 termosDirLista: Termos[];

 constructor(private termoService: TermoService, private tostr: ToastrService) { }

  ngOnInit() {
    this.termosEsqLista = this.carregarTermos('termosEsq');
    this.termosDirLista = this.carregarTermos('termosDir');
  }

  private carregarTermos(url: string) {
    let obj: Termos[] = [];
    let x = this.termoService.getTermos(url);
    x.subscribe(itens => {
      itens.map(
        item => { obj.push({
                    $key: item.payload.doc.id,
                    ds_texto: item.payload.doc.data()['ds_texto'],
                    no_cabecalho: item.payload.doc.data()['no_cabecalho'],
                    nu_ordem: item.payload.doc.data()['nu_ordem']} as Termos);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Termos!');
                });
    });
    return obj;
  }
}
