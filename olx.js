const scrapPup = require("./pupScript.js");
const prodsAtual = require("./prodsOlxOld.json");
const { ProdutoOLX } = require("./Produto");

const fs = require("fs");

async function startOLX() {
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

  // scrapPup
  //   .scrape(ArrURL, getdataFuncOLX)
  //   .then((v) => {
  //     console.log(v);
  //   })

  // }
let retornoScrapeOlx =  await scrapPup.scrape(ArrURL, getdataFuncOLX)
retornoScrapeOlx = 
  scrapPup
    .scrape(ArrURL, getdataFuncOLX)
    .then((v) => {
      return v.map(
        (e) => new ProdutoOLX(e.nome, e.preco, e.tipo, e.url, e.keyword)
      );
    })
    .then((v) => {
      return filtra(v);
    })
    .then((v) => {
      salvaCSV(v, "prodsOlxOld", "prodsOlxNew");
    });
}

function filtra(arr) {
  return arr.filter((v1) => {
    return (
      !prodsAtual.find(
        (v2) =>
          v1.nome == v2.nome &&
          v1.url == v2.url &&
          (isNaN(v1.preco) || isNaN(v2.preco)
            ? true
            : parseFloat(v1.preco) >= parseFloat(v2.preco))
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

function salvaCSV(prods, oldname, newname) {
  // console.log(prods)

  prodsAtual.push(...prods);
  const jsonString = JSON.stringify(prodsAtual, null, 2);
  const jsonStringnewprod = JSON.stringify(prods, null, 2);
  // console.log(jsonString)

  fs.writeFile("./" + oldname + ".json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  fs.writeFile("./" + newname + ".json", jsonStringnewprod, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

module.exports = { startOLX, filtra, salvaCSV, atualizaProdsOld };
