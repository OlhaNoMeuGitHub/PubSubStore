const puppeteer = require("puppeteer");
const fs = require("fs");
const prodsAtual = require("./oldProducts.json");

async function scrape(Itens, getdata, personalfunction = () => {}) {
  var result = [];

  for (let item of Itens) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    console.log(item.url);
    await page.goto(item.url, { waitUntil: "load", timeout: 0 });
    prodsite = await getdata(page,item,personalfunction);
    prodsite.length == 0
      ? console.log("ERRO " + item.url)
      : console.log(" TAMANHO " + prodsite.length + "Da URL" + item.url);
    result = [...result, ...prodsite];
    await browser.close();
  }

  return result;
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

module.exports = {
  salvaCSV,
  scrape,
};
