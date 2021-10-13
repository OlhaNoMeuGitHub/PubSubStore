const { Produto } = require("../../Produto");


class ProdutoFacebook extends Produto {
    constructor(nome, preco, tipo, url, keyword) {
      let id = url;
      super(id, nome, preco, tipo, url, keyword);
      


  }

    
  }
  

  module.exports = {
    ProdutoFacebook
}