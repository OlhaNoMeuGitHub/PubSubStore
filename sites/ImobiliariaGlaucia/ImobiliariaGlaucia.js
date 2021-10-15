const scrapPup = require("../../pupScript");
const { ProdutoImobiliariaGlaucia } = require("./ProdutoImobiliariaGlaucia");

async function startImobiliariaGlaucia(OldProds, fileNameOld, FileNameNew, ArrURL) {
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncImobiliariaGlaucia);
  ProdutoImobiliariaGlaucia.ExecutafluxoDeTratamentoPersistencia(
    produtosObtidos,
    OldProds,
    fileNameOld,
    FileNameNew
  );
}

const getdataFuncImobiliariaGlaucia =  async function getdataImobiliariaGlaucia(page, item) {
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll("div.col-md-4.col-sm-6.col-xs-12")).reduce((accumulator, currentValue) => {
      if (
        typeof currentValue.getElementsByClassName("property-content")[0] == "object" &&
        typeof currentValue.getElementsByClassName("property-price")[0] ==
        "object"
        ) {
          
          let obj = {
            nome: currentValue.getElementsByClassName("property-content")[0].innerText,
            preco:
            currentValue.getElementsByClassName("property-price")[0].innerText,
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


  module.exports = { getdataFuncImobiliariaGlaucia,startImobiliariaGlaucia };
