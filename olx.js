const scrapPup = require("./pupScript.js");
const prodsAtual = require("./prodsOlxOld.json");
const fs = require("fs");

function Produto(nome, preco, tipo, url, keyword) {
    this.nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
    this.preco = preco.replace("R$ ", "").replace("R$", "");
    this.tipo = tipo;
    this.url = url;
    this.keyword = keyword.map((v) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
}

function startOLX() {
    let ArrURL = [{
            url: "https://sp.olx.com.br/sao-paulo-e-regiao/zona-norte?q=movel&sf=1",
            tipo: "Casa",
            keyword: ["casa", "apartamento", "chacara"],
        },
        {
            url: "https://sp.olx.com.br/sao-paulo-e-regiao?q=org%C3%A3o%20eletronico&sf=1",
            tipo: "instrumento musical",
            keyword: ["orgão", "eletrico"],
        },
    ];

    // scrapPup
    //   .scrape(ArrURL, getdataFuncOLX)
    //   .then((v) => {
    //     console.log(v);
    //   })

    // }

    scrapPup
        .scrape(ArrURL, getdataFuncOLX)
        .then((v) => {
            return v.map(
                (e) => new Produto(e.nome, e.preco, e.tipo, e.url, e.keyword)
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
        return (!prodsAtual.find(
                (v2) =>
                v1.nome == v2.nome &&
                v1.url == v2.url &&
                (isNaN(v1.preco) || isNaN(v2.preco) ?
                    true :
                    parseFloat(v1.preco) >= parseFloat(v2.preco))
            ) &&
            v1.keyword.reduce((acc, cv, indice, array) => {
                return acc ?
                    true :
                    !v1.nome.toLocaleLowerCase().search(cv.toLocaleLowerCase()) ?
                    true :
                    false;
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
                    preco: prodWeb.getElementsByClassName("sc-ifAKCX eoKYee")[0].innerText,
                    filtro: item.tipo,
                    url: prodWeb.href,
                    keyword: item.keyword,
                };
            }
        );
    }, item);
};

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

module.exports = { startOLX };