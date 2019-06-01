import { Component, OnInit } from '@angular/core';

import { PromocaoService } from './compartilhado/promocao.service';
import { Promocao } from './compartilhado/promocao.model';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-home-promocao',
  templateUrl: 'promocao.component.html',
  providers: [PromocaoService]
})

export class PromocaoComponent implements OnInit {
  
  promocoesLista: Promocao[] = [];

  constructor( private promocaoService: PromocaoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.promocoesLista = this.carregarPromocoes();
  }

  private carregarPromocoes() {
    let obj: Promocao[] = [];
    let x = this.promocaoService.getPromocoes();
    x.subscribe(itens => {
      itens.forEach(
        item => { obj.push({
                    $key: item.payload.doc.id,
                    no_botao: item.payload.doc.data()['no_botao'],
                    no_link: item.payload.doc.data()['no_link'],
                    tx_promocao: item.payload.doc.data()['tx_promocao']} as Promocao);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Promoções!');
                });
    });
    return obj;
  }
}
