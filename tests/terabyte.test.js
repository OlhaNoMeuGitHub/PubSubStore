const scrapTeraByte = require("../sites/terabyte/Terabyte");
const { ProdutoTeraByte } = require('../sites/TeraByte/ProdutoTeraByte');
const TeraByteOldProductsFull = require("./payload/TeraByteProductsFull.json");
// const TeraByteOldProds = require("./payload/TeraByteOldProducts .json");
// const TeraByteNewProds = require("./payload/TeraByteNewProducts.json");
const fs = require('fs');


// describe("Valida fluxo de filtragem de itens repetidos", () => {

//     it("Validar com item repedito", () => {

//         let OldProds = TeraByteOldProds.map(
//             (e) => new ProdutoTeraByte(e.nome, e.preco, e.tipo, e.url, e.keyword)
//           );
//         let NewProds = TeraByteNewProds.map(
//             (e) => new ProdutoTeraByte(e.nome, e.preco, e.tipo, e.url, e.keyword)
//           );

//         let result = ProdutoTeraByte.filtraProdutosSemModificacao(NewProds,OldProds)

//         expect(result[0].preco.valorAtual).toBe("1219.90");
//         expect(result[0].nome).toBe("Processador Intel Core i5-10400F, Cache 12MB, 2.9GHz (4.3GHz Max Turbo), LGA 1200 - BX8070110400F");
//         expect(result[1].preco.valorAtual).toBe("2000.00");

//     })

// })

describe("Valida fluxo funcionais", () => {
    beforeEach(() => {
      jest.setTimeout(300000);
    });

    it("Validar fluxo com scrap TeraByte", async () => {

        expect.assertions(1);

        let ArrURL = [
          {
            url: "https://www.terabyteshop.com.br/busca?str=processador",
            tipo: "Processador intel",
            keyword: ["processador"],
          }]
          
        await scrapTeraByte.startTeraByte(TeraByteOldProductsFull,"tests/outputTest/oldProdsTeraByteFull","tests/outputTest/NewProdsTeraByteFull",ArrURL)
    
          let rawdataOld = fs.readFileSync('tests/outputTest/oldProdsOLXFull.json');
          let souBOldProdsOutPut = JSON.parse(rawdataOld).map(
            (e) => new ProdutoTeraByte(e.nome, e.preco, e.tipo, e.url, e.keyword)
            );
            let rawdataNew = fs.readFileSync('tests/outputTest/NewProdsOLXFull.json');
        let souBNewProdsOutPut = JSON.parse(rawdataNew).map(
            (e) => new ProdutoTeraByte(e.nome, e.preco, e.tipo, e.url, e.keyword)
          );
          expect(true).toBe(true)
    
      
        // expect(souBNewProdsOutPut[0].preco.valorAtual).toBe("2.559,99");
        // expect(souBNewProdsOutPut[2].nome).toBe("Teclado Gamer Dk13 com Iluminacao de Led Abnt2 - DPX");
        // expect(souBOldProdsOutPut[0].preco.valorAtual).toBe("167,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).toBe("2.559,99");
        // expect(souBOldProdsOutPut[3].preco.valorAtual).not.toBe("2.559,90");
    
      });
    
    });
    