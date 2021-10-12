const { Produto } = require("../../Produto");


class ProdutoKabum extends Produto {
    constructor(nome, preco, tipo, url, keyword) {
      let id = nome;
      super(id, nome, preco, tipo, url, keyword);
      


  }

    
  }
  

  module.exports = {
    ProdutoKabum
}