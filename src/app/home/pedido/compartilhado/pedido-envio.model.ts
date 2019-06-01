import { Item } from './pedido-item.model';

export class PedidoEnvio {
    private $key?: string;
    private items?: Item[];
    private no_cliente?: string;
    private nu_telefone?: string;
    private no_email?: string;
    private no_logradouro?: string;
    private nu_numero?: string;
    private no_bairro?: string;
    private no_municipio?: string;
    private sg_uf?: string;
    private nu_cep?: string;
    private vr_frete?: number;
    private qt_itens?: number;
    private vr_totalFrete?: number;
    private vr_total?: number;
    private vr_totalMaisFrete?: number;
  
    urlPagamento = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';
    pagseguroURL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/?' +
                   'email=cortinafacil2017@gmail.com&token=A28A32CA37EF45A68551827A7414085F';
  
    constructor( items, 
                 no_cliente,
                 nu_telefone,
                 no_email,
                 no_logradouro,
                 nu_numero,
                 no_bairro,
                 no_municipio,
                 sg_uf,
                 nu_cep,
                 vr_frete,
                 qt_itens,
                 vr_totalFrete,
                 vr_totalMaisFrete ) {
    }
  
    getNomeCliente(): string {
      return this.no_cliente;
    }
  
    getEmailCliente(): string {
      return this.no_email;
    }
  
    getTotalItens(): number {
      return this.qt_itens;
    }
  
    getValorTotalPedido(): number {
      return this.vr_totalMaisFrete;
    }
  
    getUrlPagamento(): string {
      return this.urlPagamento;
    }
  
    getUrlPagseguro(): string {
      return this.pagseguroURL;
    }
    
    getObjeto(): PedidoEnvio {
      return this;
    }
  }
  