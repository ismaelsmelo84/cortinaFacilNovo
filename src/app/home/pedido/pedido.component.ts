import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

// Modelos e Serviços
import { Pedido } from './compartilhado/pedido.model';
import { Item } from './compartilhado/pedido-item.model';
import { PedidoService } from './compartilhado/pedido.service';
import { Frete } from './compartilhado/frete.model';
import { FreteService } from './compartilhado/frete.service';
import { Produto } from './compartilhado/produto.model';
import { ProdutoService } from './compartilhado/produto.service';
import { ValidationService } from '../../_components/validator/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ PedidoService, ProdutoService, FreteService ]
})

export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  
  pedido: Pedido = new Pedido;
  itens: Item[] = [];
  
  produto: Produto = new Produto;
  produtosLista: Produto[] = [];
  produtosRef = null;
  
  frete: Frete = new Frete;
  fretesLista: Frete[] = [];
  fretesRef = null;

  urlPagamento = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';
  pagseguroURL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/?' +
                 'email=cortinafacil2017@gmail.com&token=A28A32CA37EF45A68551827A7414085F';

  constructor( private formBuilder: FormBuilder,
               private pedidoService: PedidoService,
               private freteService: FreteService,
               private produtoService: ProdutoService,
               private tostr: ToastrService ) {

    // Carrega listas de produtos e fretes
    this.produtosLista = this.carregarProdutos();
    this.fretesLista = this.carregarFretes();

    // Monta formulário
    this.createOrderForm();
    const orderFormGroups = this.itens.map( item => this.formBuilder.group( item ) );
    const orderFormArray = this.formBuilder.array( orderFormGroups );
    this.orderForm.setControl('itens', orderFormArray);

    // Adiona uma instância de grupo para criar o primeiro item do pedido
    this.incluirItemFormulario();
  }

  ngOnInit() {}

  /* ----------------------------------------------------------------/
     MÉTODOS PÚBLICOS: "ATUALIZA FORMULÁRIO"
  /---------------------------------------------------------------- */

  atualizaFormItem(i: number) {
    
    let itens: Item[] = this.orderForm.controls.itens.value;
    let vrUnit: number = 0;
    let area: number = 0;
    
    if(itens.length > 0) {
      
      let produto: Produto = this.getProdutoSelecionado(itens[i].idProduto);
      
      if( produto != undefined ) {

        // Calcula área do material vinculado ao item
        if ( (itens[i].idProduto != 'NENHUM') && ( itens[i].height > 0) && (itens[i].width > 0) ) {
            
          //Obtém dados básicos para os cálculos
          this.orderForm.controls.itens.value[i].noCortina = produto.nome;
          this.orderForm.controls.itens.value[i].tpProduto = produto.tipo;
          this.orderForm.controls.itens.value[i].vrMetro = produto.preco;
          
          const qt: number = this.orderForm.controls.itens.value[i].qt;
          let h: number = this.orderForm.controls.itens.value[i].height;
          let w: number = this.orderForm.controls.itens.value[i].width;
          
          // Altura mínima e máxima para efeito de cobrança/ despesa com material
          if( this.orderForm.controls.itens.value[i].height <= 30 ) {
            this.orderForm.controls.itens.value[i].height = 30;
            h = 30;
          } else if (this.orderForm.controls.itens.value[i].height >= 300) {
            this.orderForm.controls.itens.value[i].height = 300;
            h = 300;
          }
          
          // Largura mínima e máxima para efeito de cobrança/ despesa com material
          if( this.orderForm.controls.itens.value[i].width <= 100 ) {
            if( this.orderForm.controls.itens.value[i].width <= 50 ) {
              this.orderForm.controls.itens.value[i].width = 50;
            }
            w = 100;
          } else if (this.orderForm.controls.itens.value[i].width >= 1000) {
            this.orderForm.controls.itens.value[i].width = 1000;
            w = 1000;
          }

          if (produto.tipo === 'Voal') {
            if ( h <= 280 ) {
              area = w / 100 * 2.5;
            } else if ( ( h > 280 ) && ( h <= 300 ) ) {
              area = (h / 100 + 0.30) * (Math.round(w / 120));
            }
          } else if (produto.tipo === 'Blackout') {
            if ( h <= 280 ) {
              area = w / 100 * 2.3;
            } else if (( h > 280 ) && ( h <= 300 ) ) {
              area = (h / 100 + 0.30) * (Math.round(w / 150))
            }            
          }
          
          this.orderForm.controls.itens.value[i].area = area;
          
          // Calcula preço unitário e total do item
          vrUnit = area * produto.preco;
          this.orderForm.controls.itens.value[i].priceUnit = vrUnit;
          this.orderForm.controls.itens.value[i].totalItem = this.orderForm.controls.itens.value[i].priceUnit * qt;          

          console.log('Altura: ' + this.orderForm.controls.itens.value[i].height + '; ' +
          'Largura: ' + this.orderForm.controls.itens.value[i].width + ' - ' +
          'H: ' + h + '; ' +
          'W: ' + w + ' - ' +
          area);
        } else {
          this.orderForm.controls.itens.value[i].totalItem = 0;
        }
      }
    };

    this.atualizaForm();
  }

  atualizaForm() {

    let itens: Item[] = this.orderForm.controls.itens.value;
    let qt: number = 0;
    let vr_frete: number = 0;
    let total: number = 0;
    
    // Calcula quantidade de itens
    for ( var i = 0; i < itens.length; i++ ) { 
      qt += Number(itens[i].qt); 
    }

    this.orderForm.controls.qt_itens.setValue(Number(qt));
    
    // Calcula valor total dos itens
    for ( var i = 0; i < itens.length; i++ ) { 
      total += Number(itens[i].totalItem); 
    }
    
    this.orderForm.controls.vr_total.setValue(total);

    // Calcula frete
    let sgUfKey = this.orderForm.controls.sg_uf.value;
    if(sgUfKey) {
      let frete: Frete = this.getFreteSelecionado(sgUfKey);
      if( frete != undefined ) {
        if( qt < 5 ) {
          vr_frete = Number(frete.price);
        } else {
          vr_frete = 0;
        }
      }
    };

    this.orderForm.controls.vr_frete.setValue(vr_frete);

    // Calcula total com frete
    this.orderForm.controls.vr_totalMaisFrete = this.orderForm.controls.vr_total.value + this.orderForm.controls.vr_frete.value;
  }

  /* ----------------------------------------------------------------/
     MÉTODOS PÚBLICOS: "VALORES ESPECÍFICOS"
  /---------------------------------------------------------------- */

  public getTotalItem(l: number): number {
    let i: number = this.orderForm.controls.itens.value[l].totalItem;
    if (i != undefined) { return i } else { return 0; };
  }
  
  public getQtItens(): number {
    let i: number = this.orderForm.controls.qt_itens.value;
    if (i != undefined) { return i } else { return 0; };
  }

  public getVrTotalItens(): number {
    let i: number = this.orderForm.controls.vr_total.value;
    if (i != undefined) { return i } else { return 0; };
  }

  public getVrFrete(): number {
    let i: number = this.orderForm.controls.vr_frete.value;
    if (i != undefined) { return i } else { return 0; };
  }

  public getVrTotalMaisFrete(): number {
    let i: number = Number(this.orderForm.controls.vr_totalMaisFrete);
    if (i != undefined) { return i } else { return 0; };
  }

  /* ----------------------------------------------------------------/
     MÉTODOS PÚBLICOS: "ENVIO DO PEDIDO E LIMPEZA DO FORMULÁRIO"
  /---------------------------------------------------------------- */

  // Enviar pedido
  public onFormSubmit() {
    let pedido: any;
    if ( this.orderForm.dirty ) {
        pedido = {
          itens: this.orderForm.controls.itens.value,
          no_cliente: this.orderForm.controls.no_cliente.value,
          nu_telefone: this.orderForm.controls.nu_telefone.value,
          no_email: this.orderForm.controls.no_email.value,
          no_logradouro: this.orderForm.controls.no_logradouro.value,
          nu_numero: this.orderForm.controls.nu_numero.value,
          no_bairro: this.orderForm.controls.no_bairro.value,
          no_municipio: this.orderForm.controls.no_municipio.value,
          sg_uf: this.getFreteSelecionado(this.orderForm.controls.sg_uf.value).sgUf,
          qt_itens: this.getQtItens(),
          vr_total: this.getVrTotalItens(),
          vr_frete: this.getVrFrete(),
          vr_totalMaisFrete: this.getVrTotalMaisFrete(),
          ic_realizado: 'Realizado',
          dt_pedido: new Date() 
        }

        this.pedidoService.incluirPedido(pedido);
        this.tostr.success('Pedido registrado. Enviando para pagamento...', 'Registro do pedido');
        
        this.onReset();
    }
  }

  // Limpar formulário de pedido
  public onReset() {
    this.createOrderForm();
    this.incluirItemFormulario();
  }

  /* ----------------------------------------------------------------/
     MÉTODOS PRIVADOS: "LISTA DE PRODUTOS E FRETES"
  /---------------------------------------------------------------- */

  private carregarProdutos(): Produto[] {
    let obj: Produto[] = [];
    let x = this.produtoService.getProdutos();
    x.subscribe(itens => {
      itens.map(
        item => { obj.push({
                    $key: item.payload.doc.id,
                    nome: item.payload.doc.data()['nome'],
                    preco: item.payload.doc.data()['preco'],
                    ordem: item.payload.doc.data()['ordem'],
                    tipo: item.payload.doc.data()['tipo']} as Produto);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Produtos!');
                });
    });
    (this).produtosRef = x;
    return obj;
  }

  private carregarFretes(): Frete[] {
    let obj: Frete[] = [];
    let x = this.freteService.getFretes();
    x.subscribe(itens => {
      itens.map(
        item => { obj.push({
                    $key: item.payload.doc.id,
                    nameUf: item.payload.doc.data()['nameUf'],
                    price: item.payload.doc.data()['price'],
                    sgUf: item.payload.doc.data()['sgUf']} as Frete);
                }, error => {
                    console.error('Erro na captura de dados do serviço de Fretes!');
                });
    });
    (this).fretesRef = x;
    return obj;
  }

  private getFreteSelecionado($key: string): Frete {
    let frete: Frete;
    this.fretesLista.forEach(item => {
      if( item.$key === $key ) {
        frete = { sgUf: item.sgUf,
                  nameUf: item.nameUf,
                  price: item.price }
        }
    });
    return frete;
  }

  private getProdutoSelecionado($key: string): Produto {
    let produto: Produto;
    this.produtosLista.forEach(item => {
      if( item.$key == $key ) {
        produto = { $key: item.$key,
                    nome: item.nome,
                    ordem: item.ordem,
                    preco: item.preco,
                    tipo: item.tipo }
      }
    });
    return produto;
  }

  /* ----------------------------------------------------------------/
     MÉTODOS GERAIS: "FORMULÁRIO DE PEDIDOS"
  /---------------------------------------------------------------- */

  // Instancia o formulário padrão e validações
  private createOrderForm() {
    this.orderForm = this.formBuilder.group({
      itens: this.formBuilder.array([]),
      no_cliente: [ '', [ Validators.required, Validators.minLength(3) ] ],
      nu_telefone: [ '', [ Validators.required, Validators.minLength(9) ] ],
      no_email: [ '', [ Validators.required, ValidationService.emailValidator ] ],
      no_logradouro: [ '', [ Validators.required, Validators.minLength(3) ] ],
      nu_numero: [ '', Validators.required ],
      no_bairro: [ '', [ Validators.required, Validators.minLength(3) ] ],
      no_municipio: [ '', [ Validators.required, Validators.minLength(3) ] ],
      sg_uf: [ 'NENHUM', Validators.required],
      nu_cep: [ '', [ Validators.required, Validators.minLength(2) ] ],
      qt_itens: 0,
      vr_frete: 0,
      vr_total: 0
    });
  }
  
  // Inclui um item no formulário
  public incluirItemFormulario() {
    const fg = this.formBuilder.group(new Item());
    this.itemFormArray.push(fg);
  }

  // Exclui um item do formulário
  public excluirItemFormulario(index: any) {
    const it: any = this.orderForm.controls['itens'];
    it.removeAt(index);
  }
  
  // Obtem formulário
  public get itemFormArray(): FormArray{
    return this.orderForm.get('itens') as FormArray;
  }
}
