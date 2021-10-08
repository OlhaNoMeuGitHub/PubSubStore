const scrapPup = require("./pupScript.js");
const prodsAtual = require("./prodsOlxOld.json");
const { ProdutoOLX } = require("./Produto");

const fs = require("fs");

async function startOLX(OldProds,fileNameOld,FileNameNew) {
  let ArrURL = [
    {
      url: "https://sp.olx.com.br/sao-paulo-e-regiao/zona-norte?q=movel&sf=1",
      tipo: "Casa",
      keyword: ["casa", "apartamento", "chacara"],
    },
    {
      url: "https://sp.olx.com.br/sao-paulo-e-regiao?q=org%C3%A3o%20eletronico&sf=1",
      tipo: "instrumento musical",
      keyword: ["orgão", "eletrico"],
    },
    {
      url: "https://sp.olx.com.br/sao-paulo-e-regiao/zona-oeste/instrumentos-musicais?pe=1000&q=baixo&sd=2918&sd=2914&sf=1",
      tipo: "instrumento musical",
      keyword: [""],
    },
    {
      url: "https://sp.olx.com.br/sao-paulo-e-regiao/zona-norte/instrumentos-musicais?pe=1000&q=baixo&sd=2799&sd=2792&sd=2787&sf=1",
      tipo: "instrumento musical",
      keyword: [""],
    },
    {
      url: "https://sp.olx.com.br/sao-paulo-e-regiao?q=clarinete&sf=1",
      tipo: "instrumento musical",
      keyword: ["clarinete"],
    },
  ];


let retornoScrapeOlx =  await scrapPup.scrape(ArrURL, getdataFuncOLX)
ExecutafluxoDeTratamentoPersistencia(retornoScrapeOlx,prodsAtual,fileNameOld,FileNameNew)

}

function filtra(arr,prodold) {
  return arr.filter((v1) => {
    return (
      !prodold.find(
        (v2) =>
          v1.nome == v2.nome &&
          v1.url == v2.url &&
          (isNaN(v1.preco.valorAtual) || isNaN(v2.preco.valorAtual)
            ? true
            : parseFloat(v1.preco.valorAtual) >= parseFloat(v2.preco.valorAtual))
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
    return Array.from(document.querySelectorAll("a.fnmrjs-0")).map(
      (prodWeb) => {
        return {
          nome: prodWeb.getElementsByClassName("sc-1mbetcw-0")[0].innerText,
          preco:
            prodWeb.getElementsByClassName("sc-ifAKCX eoKYee")[0].innerText,
          filtro: item.tipo,
          url: prodWeb.href,
          keyword: item.keyword,
        };
      }
    );
  }, item);
};

function atualizaProdsOld(prodOld, prodNew) {
  console.log("entrei");
  prodNew.slice(0).forEach((element, index) => {
    let foundIndex = prodOld.findIndex((x) => x.id == element.id);
    if(foundIndex !== -1){
     prodNew.splice(index, 1)
     prodOld[foundIndex] = element;
    }
  });
  return prodOld;
}

function ExecutafluxoDeTratamentoPersistencia(arrProducts,OldProds,fileNameOld,FileNameNew){
  arrProducts = arrProducts.map(
    (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
    );
  OldProds = OldProds.map(
    (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
      );
  let produtosfiltrados = filtra(arrProducts,OldProds);
  let produtosAntigosAtualizados = ProdutoOLX.atualizaProdsOld(OldProds,produtosfiltrados);
  ProdutoOLX.salvaCSV(produtosAntigosAtualizados, fileNameOld);
  ProdutoOLX.salvaCSV(produtosfiltrados, FileNameNew);

}


module.exports = { startOLX, filtra, atualizaProdsOld ,ExecutafluxoDeTratamentoPersistencia};
