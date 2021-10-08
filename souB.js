const scrapPup = require("./pupScript.js");

const { ProdutoSouB } = require("./Produto");
const fs = require("fs");

var prod1 = [
  {
    nome: "PEQUENAS AVARIAS: Sanduicheira Britânia Crome Inox 750W - 110V",
    preco: "69,99",
  },
  {
    nome: 'Tablet Samsung Galaxy S6 Lite 64GB Wi-Fi 4G Tela 10.4" Android Octa-Core - Cinza',
    preco: "2.399,99",
  },
  {
    nome: "Escova Rotativa Philco Ceramic Spin Íon Brush Pec05v - 1100W",
    preco: "2,69",
  },
  {
    nome: "SOSO",
    preco: "1.299,99",
  },
];

async function startSoub(OldProds,fileNameOld,FileNameNew) {
  let ArrURL = [
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-5",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-3",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-2",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-4",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-6",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados/pagina-7",
      tipo: "usado",
    },
    {
      url: "https://www.soubarato.com.br/hotsite/usados?chave=prf_hm_tt_0_1_ttusados",
      tipo: "usado",
    },
  ];

  const getdataFuncSB = async function getDataSB(page) {
    return page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("div.RippleContainer-sc-1rpenp9-0")
      ).map((prodWeb) => {
        return {
          preco: prodWeb.getElementsByClassName("price")[0].innerText,
          nome: prodWeb.getElementsByClassName("product-name")[0].innerText,
        };
      });
    });
  };
  
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncSB)
  ExecutafluxoDeTratamentoPersistencia(produtosObtidos,OldProds,fileNameOld,FileNameNew)


  }
  
  
  
  function ExecutafluxoDeTratamentoPersistencia(arrProducts,OldProds,fileNameOld,FileNameNew){

    arrProducts = arrProducts.map(
      (e) => new ProdutoSouB(e.nome, e.preco)
      );
    OldProds = OldProds.map(
        (e) => new ProdutoSouB(e.nome, e.preco)
        );
    let produtosfiltrados = filtra(arrProducts,OldProds);
    let produtosAntigosAtualizados = ProdutoSouB.atualizaProdsOld(OldProds,produtosfiltrados);
    ProdutoSouB.salvaCSV(produtosAntigosAtualizados, fileNameOld);
    ProdutoSouB.salvaCSV(produtosfiltrados, FileNameNew);

}

function filtra(arr, prodold) {
  return arr.filter((v1) => {
    return !prodold.find(
      (v2) =>
        v1.nome == v2.nome &&
        parseFloat(v1.preco.valorAtual) >= parseFloat(v2.preco.valorAtual)
    );
  });
}

module.exports = { startSoub, filtra,ExecutafluxoDeTratamentoPersistencia };
