const fs = require("fs");


class Preco {
  constructor() {
    if ( typeof(arguments[0]) == "object"){
      this.valor = arguments[0].valor.replace("R$ ", "").replace("R$", "");
      this.data = typeof(arguments[0].data) !== "undefined"?  arguments[0].data : new Date()
    }
    else{
      this.valor = arguments[0].replace("R$ ", "").replace("R$", "");
      this.data = new Date();
    }
  }

  get valorAtual() {
    return this.valor;
  }

  get dataAtual() {
    return this.data;
  }
}

class Produto {
  constructor(id, nome, preco, tipo, url, keyword) {
    (this.id = id),
      (this.nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    this.preco = new Preco(preco);
    this.tipo = tipo;
    this.url = url;
    this.keyword = keyword.map((v) =>
      v.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
  }

  static atualizaProdsOld(prodOld, prodNew) {
    const prodOldLocal = [].concat(prodOld);
    console.log("entrei");
    prodNew.slice(0).forEach((element, index) => {
      let foundIndex = prodOld.findIndex((x) => x.id == element.id);
      if (foundIndex !== -1) {
        // const prodNewLocal = [].concat(prodNew);
        // prodNewLocal.splice(index, 1);
        prodOldLocal[foundIndex] = element;
      }
      else{
        prodOldLocal.push(element)

      }
    });
    return prodOldLocal;
  }

  static async salvaCSV(prods, nameFile) {
    const jsonStringnewprod = JSON.stringify(prods, null, 2);

    fs.writeFileSync("./" + nameFile + ".json", jsonStringnewprod)
    console.log("File written successfully\n");
  }
}

class ProdutoSouB extends Produto {
  constructor(nome, preco, tipo = "usado", url = "", keyword = [""]) {
    nome = nome
      .replace("USADO - ", "")
      .replace("Usado: ", "")
      .replace("USADO: ", "");
    let id = nome;
    super(id, nome, preco, tipo, url, keyword);
  }
}

class ProdutoOLX extends Produto {
  constructor(nome, preco, tipo, url = "", keyword = [""]) {
    let id = url;
    super(id, nome, preco, tipo, url, keyword);
  }
}

module.exports = {
  ProdutoSouB,
  ProdutoOLX,
  Preco,
};
