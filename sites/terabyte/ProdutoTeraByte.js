const { Produto } = require("../../Produto");


class ProdutoTeraByte extends Produto {
    constructor(nome, preco, tipo, url, keyword) {
      let id = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      super(id, nome, preco, tipo, url, keyword);
      


  }

    
  }
  

  module.exports = {
    ProdutoTeraByte
}