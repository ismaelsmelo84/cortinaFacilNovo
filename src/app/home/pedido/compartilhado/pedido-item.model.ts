export class Item {
    idCortina: number;
    noCortina: string;
    vrMetro: number;
    idProduto: string;
    tpProduto: string;
    height: number;
    width: number;
    qt: number;
    area: number;
    priceUnit: number;
    totalItem: number;
  
    constructor() {
      this.idCortina = 0;
      this.noCortina = '';
      this.vrMetro = 0;
      this.idProduto = 'NENHUM';
      this.tpProduto = '';
      this.height = 0;
      this.width = 0;
      this.qt = 0;
      this.area = 0;
      this.priceUnit = 0;
      this.totalItem = 0;
    }
  }