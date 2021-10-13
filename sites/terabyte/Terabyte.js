const scrapPup = require("../../pupScript");
const { ProdutoTeraByte } = require("./ProdutoTeraByte");

async function startTeraByte(OldProds, fileNameOld, FileNameNew, ArrURL) {
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncTeraByte);
  ProdutoTeraByte.ExecutafluxoDeTratamentoPersistencia(
    produtosObtidos,
    OldProds,
    fileNameOld,
    FileNameNew
  );
}

const getdataFuncTeraByte =  async function getdataTeraByte(page, item) {
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll("div.commerce_columns_item_inner")).reduce((accumulator, currentValue) => {
      if (
        typeof currentValue.getElementsByClassName("prod-name")[0] == "object" &&
        typeof currentValue.getElementsByClassName("prod-new-price")[0] ==
        "object"
        ) {
          
          let obj = {
            nome: currentValue.getElementsByClassName("prod-name")[0].innerText,
            preco:
            currentValue.getElementsByClassName("prod-new-price")[0].innerText,
            filtro: item.tipo,
            url: currentValue.getElementsByClassName("prod-name")[0].href,
            keyword: item.keyword,
          };
          accumulator.push(obj);
        }
        return accumulator;
      }, []);
    }, item);
  };


  module.exports = { getdataFuncTeraByte,startTeraByte };
