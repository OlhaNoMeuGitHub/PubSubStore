const fs = require("fs");

class Preco {
  constructor() {
    if (typeof arguments[0] == "object") {
      if (arguments[0].hasOwnProperty("preco"))
        arguments[0] = arguments[0].preco;
        
      this.valor = isNaN(arguments[0].valor)?arguments[0].valor.replace("R$ ", "").replace("R$", "").replace(" ","").replace(' ','').replace(".","").replace(",","."):arguments[0].valor;
      this.data =
        typeof arguments[0].data !== "undefined"
          ? arguments[0].data
          : new Date();
    } else {
      this.valor = isNaN(arguments[0])?arguments[0].replace("R$ ", "").replace("R$", "").replace(" ","").replace(' ','').replace(".","").replace(",","."):arguments[0];
      this.data = new Date();
    }
  }
}

class listPrecos {
  constructor(precoParan) {
    if (precoParan.hasOwnProperty("preco")) {
      if (Array.isArray(precoParan.preco)) {
        this.preco = precoParan.preco.map((v) => {
          return v.hasOwnProperty("preco") ? new Preco(v.preco) : new Preco(v);
        });
      }
    } else if (Array.isArray(precoParan)) {
      this.preco = [].concat(
        precoParan.map((v) => {
          return new Preco(v);
        })
      );
    } else {
      this.preco = [new Preco(precoParan)];
    }
  }

  get valorAtual() {
    return this.preco[0].valor;
  }

  get dataAtual() {
    return this.preco[0].data;
  }

  atualizaPreco(novoPreco) {
    if (Array.isArray(novoPreco)) {
      novoPreco = novoPreco.map((v) => {
        return new Preco(v);
      });
      let newarr = novoPreco.concat(this.preco);
      this.preco = newarr;
    } else {
      this.preco.splice(0, 0, new Preco(novoPreco));
    }
    return this.preco;
  }
}

class Produto {
  constructor(id, nome, preco, tipo, url, keyword) {
    (this.id = id),
      (this.nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    this.preco = new listPrecos(preco);
    this.tipo = tipo;
    this.url = url;
    this.keyword = keyword.map((v) =>
      v.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
  }

  static atualizaProds(prodOld, prodNew) {
    const prodOldLocalAtualiazado = [].concat(prodOld);
    const prodNewLocalAtualiazado = [].concat(prodNew);
    console.log("entrei");
    prodNewLocalAtualiazado.slice(0).forEach((element, index) => {
      let foundIndex = prodOld.findIndex((x) => x.id == element.id);
      if (foundIndex !== -1) {
        let valorElement = element.preco.valorAtual ;
        if (valorElement >= prodOldLocalAtualiazado[foundIndex].preco.valorAtual)
        prodNewLocalAtualiazado.splice(index, 1);
          prodOldLocalAtualiazado[foundIndex].preco.atualizaPreco(valorElement);
      } else {
        prodOldLocalAtualiazado.push(element);
      }
    });
    return {prodOldLocalAtualiazado, prodNewLocalAtualiazado};
  }

  static async salvaCSV(prods, nameFile) {
    const jsonStringnewprod = JSON.stringify(prods, null, 2);

    fs.writeFileSync("./" + nameFile + ".json", jsonStringnewprod);
    console.log("File written successfully\n");
  }

  
  static filtraProdutosSemModificacao(arr, prodold) {
    return arr.filter((v1) => {
        return (
          !prodold.find(
            (v2) =>
              v1.nome == v2.nome &&
              v1.url == v2.url &&
              ((isNaN(v1.preco.valorAtual) || isNaN(v2.preco.valorAtual) || v2.preco.valorAtual == "")
                ? true
                : parseFloat(v1.preco.valorAtual) == parseFloat(v2.preco.valorAtual))
          ) &&
          v1.keyword.reduce((acc, cv, indice, array) => {
            return acc
              ? true
              : !v1.nome.toLocaleLowerCase().search(cv.toLocaleLowerCase())
              ? true
              : false;
          }, false)
        );
      });
  }

  static ExecutafluxoDeTratamentoPersistencia(
    arrProducts,
    OldProds,
    fileNameOld,
    FileNameNew
  ) {
    arrProducts = arrProducts.map(
        (e) => new this(e.nome, e.preco, e.tipo, e.url, e.keyword)
        );
      OldProds = OldProds.map(
        (e) => new this(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
      let produtosfiltrados = this.filtraProdutosSemModificacao(arrProducts,OldProds);
      let {prodOldLocalAtualiazado, prodNewLocalAtualiazado} = this.atualizaProds(OldProds,produtosfiltrados);
      this.salvaCSV(prodOldLocalAtualiazado, fileNameOld);
      this.salvaCSV(prodNewLocalAtualiazado, FileNameNew);
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
  Produto,
  listPrecos,
};
