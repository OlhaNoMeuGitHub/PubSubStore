const scrapOLX = require("../olx.js");
const { ProdutoSouB } = require('../Produto');
const souBOldProds = require("./payload/SouBoldProducts.json");
const souBNewProds = require("./payload/SouBnewProducts.json");


describe("atualizaCSV", () => {
  it("retorna a diferanca", () => {
    let OldProds = souBOldProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let NewProds = souBNewProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );

    OldProds = ProdutoSouB.atualizaProdsOld(OldProds, NewProds);

    expect(OldProds[3].preco).toBe("2.559,99");
  });
});
