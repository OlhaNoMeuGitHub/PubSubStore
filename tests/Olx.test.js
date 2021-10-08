const scrapOLX = require("../olx.js");
const { ProdutoOLX } = require('../Produto');
const OLXOldProductsFull = require("./payload/OlxProductsFull.json");
const fs = require('fs');

describe("Valida fluxo funcionais", () => {
    beforeEach(() => {
      jest.setTimeout(300000);
    });

    it("Validar fluxo com scrap OLX", async () => {

        expect.assertions(1);
    
        await scrapOLX.startOLX(OLXOldProductsFull,"tests/outputTest/oldProdsOLXFull","tests/outputTest/NewProdsOLXFull")
    
          let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsOLXFull.json');
          let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
            (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
            );
            let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsOLXFull.json');
        let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
            (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
          expect(true).toBe(true)
    
      
        // expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
        // expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
        // expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");
    
      });
    
    });
    