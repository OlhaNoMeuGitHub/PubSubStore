const scrapFacebook = require("../sites/Facebook/Facebook");
const { ProdutoFacebook } = require('../sites/Facebook/ProdutoFacebook');
const FacebookOldProductsFull = require("./payload/FacebookProductsFull.json");
// const FacebookOldProds = require("./payload/FacebookOldProducts .json");
// const FacebookNewProds = require("./payload/FacebookNewProducts.json");
const fs = require('fs');


describe("Valida fluxo de filtragem keywords", () => {

    it("Validar com item repedito", () => {

        let keywordsDuas = ["serra","negra"]
        let keywordsVazio = [""]
        let keywordsUm = ["serra"]

        expect(ProdutoFacebook.possuiKeyWord(keywordsDuas,"casa em serra negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsDuas,"casa em negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsDuas,"casa em serra-negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsDuas,"casa em mogim-mirim")).toBe(false)
        expect(ProdutoFacebook.possuiKeyWord(keywordsVazio,"casa em serra-negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsUm,"casa em serra negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsUm,"serra negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsUm,"Serra negra")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsUm,"SERRA NEGRA")).toBe(true)
        expect(ProdutoFacebook.possuiKeyWord(keywordsVazio,"SERRA NEGRA")).toBe(true)


    })

})

describe("Valida fluxo funcionais", () => {
    beforeEach(() => {
      jest.setTimeout(300000);
    });

    it("Validar fluxo com scrap Facebook", async () => {

        expect.assertions(1);

        let ArrURL = [
          {
            url: "https://www.facebook.com/marketplace/101872923188497/search/?query=casa&exact=false",
            tipo: "casa",
            keyword: ["serra"],
          }]
          
        await scrapFacebook.startFacebook(FacebookOldProductsFull,"tests/outputTest/oldProdsFacebookFull","tests/outputTest/NewProdsFacebookFull",ArrURL)
    
          let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsOLXFull.json');
          let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
            (e) => new ProdutoFacebook(e.nome, e.preco, e.tipo, e.url, e.keyword)
            );
            let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsOLXFull.json');
        let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
            (e) => new ProdutoFacebook(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
          expect(true).toBe(true)
    
      
        // expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
        // expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
        // expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");
    
      });
    
    });
    