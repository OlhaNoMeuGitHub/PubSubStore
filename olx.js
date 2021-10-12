const scrapPup = require("./pupScript.js");
const prodsAtual = require("./prodsOlxOld.json");
const { ProdutoOLX } = require("./Produto");

const fs = require("fs");

async function startOLX(OldProds,fileNameOld,FileNameNew,ArrURL) {

let retornoScrapeOlx =  await scrapPup.scrape(ArrURL, getdataFuncOLX)
ExecutafluxoDeTratamentoPersistencia(retornoScrapeOlx,OldProds,fileNameOld,FileNameNew)

}

function filtra(arr,prodold) {
  return arr.filter((v1) => {
    return (
      !prodold.find(
        (v2) =>
          v1.nome == v2.nome &&
          v1.url == v2.url &&
          ((isNaN(v1.preco.valorAtual) || isNaN(v2.preco.valorAtual) || v2.preco.valorAtual == "")
            ? true
            : parseFloat(v1.preco.valorAtual) == parseFloat(v2.preco.valorAtual))
      ) &&
      v1.keyword.reduce((acc, cv, indice, array) => {
        return acc
          ? true
          : !v1.nome.toLocaleLowerCase().search(cv.toLocaleLowerCase())
          ? true
          : false;
      }, false)
    );
  });
}

const getdataFuncOLX = async function getdataOLX(page, item) {
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll("a.fnmrjs-0")).reduce((accumulator, currentValue) => {
      if (
        typeof currentValue.getElementsByClassName("sc-ifAKCX eoKYee")[0] == "object" &&
        typeof currentValue.getElementsByClassName("sc-1mbetcw-0")[0] ==
          "object"
      ) {
        
        let obj = {
          nome: currentValue.getElementsByClassName("sc-1mbetcw-0")[0].innerText,
          preco:
          currentValue.getElementsByClassName("sc-ifAKCX eoKYee")[0].innerText,
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


function ExecutafluxoDeTratamentoPersistencia(arrProducts,OldProds,fileNameOld,FileNameNew){
  arrProducts = arrProducts.map(
    (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
    );
  OldProds = OldProds.map(
    (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
      );
  let produtosfiltrados = filtra(arrProducts,OldProds);
  let {prodOldLocalAtualiazado, prodNewLocalAtualiazado} = ProdutoOLX.atualizaProds(OldProds,produtosfiltrados);
  ProdutoOLX.salvaCSV(prodOldLocalAtualiazado, fileNameOld);
  ProdutoOLX.salvaCSV(prodNewLocalAtualiazado, FileNameNew);

}


module.exports = { startOLX, filtra ,ExecutafluxoDeTratamentoPersistencia};
