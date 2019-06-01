import { Item } from "./pedido-item.model";

export class Pedido {
    $key? : string;
    itens?: Item[];
    no_cliente?: string;
    nu_telefone?: string;
    no_email?: string;
    no_logradouro?: string;
    nu_numero?: string;
    no_bairro?: string;
    no_municipio?: string;
    sg_uf?: string;
    nu_cep?: string;
    vr_frete?: number;
    qt_itens?: number;
    vr_totalFrete?: number;
    vr_total?: number;
    vr_totalMaisFrete?: number;
    ic_situacao?: string;
    dt_pedido?: Date;

    constructor() {
        this.vr_frete = 0;
        this.qt_itens = 0;
        this.vr_totalFrete = 0;
        this.vr_total = 0;
        this.vr_totalMaisFrete = 0;
        this.ic_situacao = 'Realizado';
        this.dt_pedido = new Date();
    }
}