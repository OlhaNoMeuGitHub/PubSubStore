const puppeteer = require('puppeteer');
const fs = require('fs');
const prodsAtual = require("./oldProducts.json");

function Produto(nome, preco) {
  this.nome = nome.replace("USADO - ","").replace("Usado: ","").replace("USADO: ","")
  this.preco = preco.replace("R$ ","")
}


let scrape = async (URLsSite) => {
  var result = [];   

  
  for( let url of URLsSite){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    console.log(url)
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    prodsite = await getDataSB(page);
    prodsite.length == 0? console.log("ERRO " + url):console.log(" TAMANHO " + prodsite.length + "Da URL" + url)
    result = [...result, ...prodsite]
    await browser.close();
    }
    
    return result
  };

  async function getDataSB(page){
    return page.evaluate(() => {
      return Array.from(document.querySelectorAll('div.RippleContainer-sc-1rpenp9-0')).map(
        prodWeb => {
          return {
                  preco:prodWeb.getElementsByClassName('price')[0].innerText, 
                  nome:prodWeb.getElementsByClassName('product-name')[0].innerText
                }
        })
    })
  }

  produtos = []
  ArrURL = [
    "https://www.soubarato.com.br/hotsite/usados/pagina-5",
    "https://www.soubarato.com.br/hotsite/usados/pagina-2",
    "https://www.soubarato.com.br/hotsite/usados/pagina-3",
    "https://www.soubarato.com.br/hotsite/usados/pagina-4",
    "https://www.soubarato.com.br/hotsite/usados/pagina-6",
    "https://www.soubarato.com.br/hotsite/usados/pagina-7",
    "https://www.soubarato.com.br/hotsite/usados?chave=prf_hm_tt_0_1_ttusados",

  ]

  scrape(ArrURL).then((v) => {  return v.map(e => new Produto(e.nome,e.preco))})
                .then((v) => {  return filtra(v)})
                .then((v) => { salvaCSV(v)})




  
  function salvaCSV(prods){
    // console.log(prods)

    prodsAtual.push(...prods)
    const jsonString = JSON.stringify(prodsAtual, null, 2)
    const jsonStringnewprod = JSON.stringify(prods, null, 2)
    // console.log(jsonString)

    fs.writeFile('./oldProducts.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })

    fs.writeFile('./newProducts.json', jsonStringnewprod, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
  }

var prod1=[  {
  "nome": "PEQUENAS AVARIAS: Sanduicheira Britânia Crome Inox 750W - 110V",
  "preco": "69,99"
},
{
  "nome": "Tablet Samsung Galaxy S6 Lite 64GB Wi-Fi 4G Tela 10.4\" Android Octa-Core - Cinza",
  "preco": "2.399,99"
},
{
  "nome": "Escova Rotativa Philco Ceramic Spin Íon Brush Pec05v - 1100W",
  "preco": "2,69"
},
{
  "nome": "SOSO",
  "preco": "1.299,99"
}]

// console.log(filtra(prod1))

function filtra(arr){
  return arr.filter((v1) => {return !prodsAtual.find((v2) => v1.nome == v2.nome && parseFloat(v1.preco) >= parseFloat(v2.preco))})
}
  // prods1= prods1.map(e => new Produto(e.nome,e.preco))
  // prods2= prods2.map(e => new Produto(e.nome,e.preco))

  // filtred = prods2.filter((v1) => {return !prodsAtual.find((v2) => v1.nome == v2.nome)})


  // // {return typeof prods1.find((v2) => v1.nome == v2.nome) === "undefined" ? true : false}

  // console.log(filtred)

// for(let element of value){
//   console.log(element)
// }
// console.log(value.length)
  // page.on('console', msg => {
  //   for (let i = 0; i < msg._args.length; ++i)
  //       console.log(`${i}: ${msg._args[i]}`);
  //   });