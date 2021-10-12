const scrapPup = require("../../pupScript");
const { ProdutoKabum } = require("./ProdutoKabum");

async function startKabum(OldProds, fileNameOld, FileNameNew, ArrURL) {
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncKabum);
  ProdutoKabum.ExecutafluxoDeTratamentoPersistencia(
    produtosObtidos,
    OldProds,
    fileNameOld,
    FileNameNew
  );
}

const getdataFuncKabum =  async function getdataKabum(page, item) {
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll("a.sc-jeGTLq")).reduce((accumulator, currentValue) => {
      if (
        typeof currentValue.getElementsByClassName("sc-jNMcJZ izgvGc sc-ehSDrC kWEbnc nameCard")[0] == "object" &&
        typeof currentValue.getElementsByClassName("sc-iwyWTf jdSnuC priceCard")[0] ==
        "object"
        ) {
          
          let obj = {
            nome: currentValue.getElementsByClassName("sc-jNMcJZ izgvGc sc-ehSDrC kWEbnc nameCard")[0].innerText,
            preco:
            currentValue.getElementsByClassName("sc-iwyWTf jdSnuC priceCard")[0].innerText,
            filtro: item.tipo,
            url: currentValue.href,
            keyword: item.keyword,
          };
          accumulator.push(obj);
        }
        return accumulator;
      }, []);
    }, item);
  };


  module.exports = { getdataFuncKabum,startKabum };
