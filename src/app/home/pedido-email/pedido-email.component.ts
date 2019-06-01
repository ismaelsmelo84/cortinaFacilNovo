/* Recursos nativos ou de terceiros */
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/* Recursos customizados */
import { Pedido } from '../pedido/compartilhado/pedido.model';
import { PedidoService } from '../pedido/compartilhado/pedido.service';
import { ValidationService } from '../../_components/validator/validation.service';

@Component({
  selector: 'app-home-pedido-email',
  templateUrl: 'pedido-email.component.html',
  styleUrls: ['./pedido-email.component.css'],
  providers: [ PedidoService ]
})

export class PedidoEmailComponent implements OnInit {

  searchForm: any;
  searchOrder: any;

  pedidosLista: Pedido[];

  constructor( private fb: FormBuilder,
               private pedidoService: PedidoService ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      no_emailBusca: [ '', [ Validators.required, ValidationService.emailValidator ] ]
    });
  }

  public onFormSubmit() {
    if ( this.searchForm.dirty && this.searchForm.valid ) {
      this.pedidosLista = this.carregarPedidosPorEmail(this.searchForm.controls.no_emailBusca.value);
    }
  }

  public getFilter(): string {
    return this.searchForm.controls.no_emailBusca.value;
  }

  public getResultados(): boolean {
    let b: boolean = false;
    if (this.pedidosLista != undefined) {
      if (this.pedidosLista.length > 0) {
        b = true;
      }
    }
    return b;
  }

  private carregarPedidosPorEmail(no_email: string): Pedido[] {
    let obj: Pedido[] = [];
    let x = this.pedidoService.getPedidosPorEmail(no_email);
    x.subscribe(itens => {
      itens.map(
        item => { obj.push({ $key : item.payload.doc.id,
                             itens: item.payload.doc.data()['itens'],
                             no_cliente: item.payload.doc.data()['no_cliente'],
                             nu_telefone: item.payload.doc.data()['nu_telefone'],
                             no_email: item.payload.doc.data()['no_email'],
                             no_logradouro: item.payload.doc.data()['no_logradouro'],
                             nu_numero: item.payload.doc.data()['no_numero'],
                             no_bairro: item.payload.doc.data()['no_bairro'],
                             no_municipio: item.payload.doc.data()['no_municipio'],
                             sg_uf: item.payload.doc.data()['sg_uf'],
                             nu_cep: item.payload.doc.data()['nu_cep'],
                             vr_frete: item.payload.doc.data()['vr_frete'],
                             qt_itens: item.payload.doc.data()['qt_itens'],
                             vr_totalFrete: item.payload.doc.data()['vr_totalFrete'],
                             vr_total: item.payload.doc.data()['vr_total'],
                             vr_totalMaisFrete: item.payload.doc.data()['vr_totalMaisFrete'],
                             dt_pedido: item.payload.doc.data()['dt_pedido'],
                             ic_situacao: item.payload.doc.data()['ic_situacao']} as Pedido);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Pedidos!');
                });
    });
    return obj;
  }
}
