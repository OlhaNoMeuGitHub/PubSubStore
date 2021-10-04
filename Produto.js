class Preco {
  constructor(valor,data){
    this.valor = valor
    this.data = data
  }
}

class Produto {
  constructor(id,nome, preco, tipo, url, keyword) {
    this.id = id,
    this.nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.preco = preco.replace("R$ ", "").replace("R$", "");
    this.tipo = tipo;
    this.url = url;
    this.keyword = keyword.map((v) =>
      v.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
  }

  static atualizaProdsOld(prodOld, prodNew) {
    console.log("entrei");
    prodNew.slice(0).forEach((element, index) => {
      let foundIndex = prodOld.findIndex((x) => x.id == element.id);
      if(foundIndex !== -1){
       prodNew.splice(index, 1)
       prodOld[foundIndex] = element;
      }
    });
    return prodOld;
  }

  static salvaCSV(prods, nameFile) {

    const jsonStringnewprod = JSON.stringify(prods, null, 2);

    fs.writeFile("./" + nameFile + ".json", jsonStringnewprod, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }


}

class ProdutoSouB extends Produto {
  constructor(nome, preco, tipo="usado", url = "", keyword = [""]) {
    nome = nome
      .replace("USADO - ", "")
      .replace("Usado: ", "")
      .replace("USADO: ", "");
    let id = nome;
    super(id,nome, preco, tipo, url, keyword);
  }
}

class ProdutoOLX extends Produto {
  constructor(nome, preco, tipo, url = "", keyword = [""]) {
    let id = url;
    super(id,nome, preco, tipo, url, keyword);
  }
}

module.exports = {
	ProdutoSouB,
	ProdutoOLX,
};

