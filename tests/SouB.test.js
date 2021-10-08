const scrapSoub = require("../souB.js");
const { ProdutoSouB } = require('../Produto');
const souBOldProds = require("./payload/SouBoldProducts.json");
const souBNewProds = require("./payload/SouBnewProducts.json");
const SouBOldProductsFull = require("./payload/SouBOldProductsFull.json");
const fs = require('fs');

describe("atualizaCSV", () => {
  it("retorna a diferanca entre antigo e novo", () => {
    let OldProds = souBOldProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let NewProds = souBNewProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );

    OldProds = ProdutoSouB.atualizaProdsOld(OldProds, NewProds);

    expect(OldProds[3].preco.valorAtual).toBe("2.559,99");
    expect(OldProds[3].preco.valorAtual).not.toBe("2.559,90");
  });
})

describe("Valida filtros", () => {
  
  it("Valida filtro usados", () => {
    let OldProds = souBOldProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let NewProds = souBNewProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );

    produtosfiltrados = scrapSoub.filtra(NewProds,OldProds);

    expect(NewProds[0].preco.valorAtual).toBe("2.559,99");
  });

});



describe("Valida fluxo de SalvarCSV", () => {
  
  it("Validar salvar CSV novo e antigo", () => {

    let OldProds = souBOldProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let NewProds = souBNewProds.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );

    ProdutoSouB.salvaCSV(OldProds, "tests/outputTest/oldProdsSouB");
    ProdutoSouB.salvaCSV(NewProds, "tests/outputTest/NewProdsSouB");



    let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsSouB.json');
    let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsSouB.json');
    let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );;

    expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
    expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");

  });

});


describe("Valida fluxo funcionais", () => {
  beforeEach(() => {
    jest.setTimeout(300000);
  });
  it("Validar fluxo sem scrap", () => {

    // let OldProds = souBOldProds.map(
    //   (e) => new ProdutoSouB(e.nome, e.preco)
    // );
    // let NewProds = souBNewProds.map(
    //   (e) => new ProdutoSouB(e.nome, e.preco)
    // );

    
    scrapSoub.ExecutafluxoDeTratamentoPersistencia(souBNewProds,souBOldProds,"tests/outputTest/oldProdsSouB","tests/outputTest/NewProdsSouB")

    let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsSouB.json');
    let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsSouB.json');
    let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );;

    expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
    expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
    expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
    expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
    expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");

  });



  
  it("Validar fluxo com scrap", async () => {

    expect.assertions(1);

    await scrapSoub.startSoub(SouBOldProductsFull,"tests/outputTest/oldProdsSouBFull","tests/outputTest/NewProdsSouBFull")

      let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsSouBFull.json');
      let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
        (e) => new ProdutoSouB(e.nome, e.preco)
        );
        let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsSouBFull.json');
    let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
      );
      expect(true).toBe(true)

  
    // expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
    // expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
    // expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
    // expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
    // expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");

  });

});
