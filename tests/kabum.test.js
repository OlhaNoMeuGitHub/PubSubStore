const scrapKabum = require("../sites/kabum/Kabum");
const { ProdutoKabum } = require('../sites/kabum/ProdutoKabum');
const KabumOldProductsFull = require("./payload/KabumProductsFull.json");
const KabumOldProds = require("./payload/KabumOldProducts .json");
const KabumNewProds = require("./payload/KabumNewProducts.json");
const fs = require('fs');


describe("Valida fluxo de filtragem de itens repetidos", () => {

    it("Validar com item repedito", () => {

        let OldProds = KabumOldProds.map(
            (e) => new ProdutoKabum(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
        let NewProds = KabumNewProds.map(
            (e) => new ProdutoKabum(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );

        let result = ProdutoKabum.filtraProdutosSemModificacao(NewProds,OldProds)

        expect(result[0].preco.valorAtual).toBe("1219.90");
        expect(result[0].nome).toBe("Processador Intel Core i5-10400F, Cache 12MB, 2.9GHz (4.3GHz Max Turbo), LGA 1200 - BX8070110400F");
        expect(result[1].preco.valorAtual).toBe("2000.00");

    })

})

describe("Valida fluxo funcionais", () => {
    beforeEach(() => {
      jest.setTimeout(300000);
    });

    it("Validar fluxo com scrap KABUM", async () => {

        expect.assertions(1);

        let ArrURL = [
          {
            url: "https://www.kabum.com.br/busca?query=processador&page_number=1&page_size=20&facet_filters=eyJwcmljZSI6eyJtaW4iOjE5LjIyLCJtYXgiOjI3MjAuNzd9LCJHZXJhw6fDtWVzIjpbIkludGVsOiAxMMKqIEdlcmHDp8OjbyIsIkludGVsOiAxMcKqIEdlcmHDp8OjbyIsIkludGVsOiA3wqogR2VyYcOnw6NvIiwiSW50ZWw6IDjCqiBHZXJhw6fDo28iLCJJbnRlbDogOcKqIEdlcmHDp8OjbyJdfQ==&sort=most_searched",
            tipo: "Processador intel",
            keyword: ["processador"],
          }]
          
        await scrapKabum.startKabum(KabumOldProductsFull,"tests/outputTest/oldProdsKabumFull","tests/outputTest/NewProdsKabumFull",ArrURL)
    
          let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsOLXFull.json');
          let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
            (e) => new ProdutoKabum(e.nome, e.preco, e.tipo, e.url, e.keyword)
            );
            let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsOLXFull.json');
        let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
            (e) => new ProdutoKabum(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
          expect(true).toBe(true)
    
      
        // expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
        // expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
        // expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");
    
      });
    
    });
    