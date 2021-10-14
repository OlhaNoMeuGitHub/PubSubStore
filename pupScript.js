const puppeteer = require("puppeteer");
const fs = require("fs");
const prodsAtual = require("./oldProducts.json");

async function scrape(Itens, getdata, personalfunction = () => {}) {
  var result = [];

  for (let item of Itens) {
    let confDebug = { headless: false }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    console.log(item.url);
    // page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
    await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 0 });
    await page.setViewport({
      width: 1200,
      height: 800
  });
    await waitTillHTMLRendered(page)
    // const data = await page.content()
    prodsite = await getdata(page,item,personalfunction);
    prodsite.length == 0
      ? console.log("ERRO " + item.url)
      : console.log(" TAMANHO " + prodsite.length + "Da URL" + item.url);
    result = [...result, ...prodsite];
    await browser.close();
  }

  return result;
}


const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while(checkCounts++ <= maxChecks){
    let html = await page.content();
    let currentHTMLSize = html.length; 

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    // console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

    if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
      countStableSizeIterations++;
    else 
      countStableSizeIterations = 0; //reset the counter

    if(countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }  
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

module.exports = {
  salvaCSV,
  scrape,
};
