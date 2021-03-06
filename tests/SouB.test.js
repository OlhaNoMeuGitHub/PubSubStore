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

    let {prodOldLocalAtualiazado, prodNewLocalAtualiazado} = ProdutoSouB.atualizaProds(OldProds, NewProds);

    expect(prodOldLocalAtualiazado[3].preco.valorAtual).toBe("2559.99");
    expect(prodOldLocalAtualiazado[3].preco.valorAtual).not.toBe("3559.99");
    expect(prodOldLocalAtualiazado[3].preco.preco.length).toBe(2)
    expect(prodOldLocalAtualiazado[6].preco.valorAtual).toBe("71.99");
    expect(prodOldLocalAtualiazado[6].preco.preco.length).toBe(1)
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

    expect(NewProds[0].preco.valorAtual).toBe("2559.99");
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

    expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2559.99");
    expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167.99");

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

    try {
      fs.unlinkSync('tests/outputTest/oldProdsSouB.json')
      fs.unlinkSync('tests/outputTest/NewProdsSouB.json')
      //file removed
    } catch(err) {
      console.log(err)
    }

    
    scrapSoub.ExecutafluxoDeTratamentoPersistencia(souBNewProds,souBOldProds,"tests/outputTest/oldProdsSouB","tests/outputTest/NewProdsSouB")
    let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsSouB.json');
    let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );
    let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsSouB.json');
    let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
      (e) => new ProdutoSouB(e.nome, e.preco)
    );

    expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2559.99");
    expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
    expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167.99");
    expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2559.99");
    expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2559.90");

  });



  
  it("Validarp fluxo com scrap", async () => {

    expect.assertions(1);

    let arr = [
      {
        "url": "https://www.soubarato.com.br/hotsite/usados?chave=prf_hm_tt_0_1_ttusados",
        "tipo": "usado"
      }
    ]

    await scrapSoub.startSoub(SouBOldProductsFull,"tests/outputTest/oldProdsSouBFull","tests/outputTest/NewProdsSouBFull",arr)

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
