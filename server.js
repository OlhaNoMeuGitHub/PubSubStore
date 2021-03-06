
//SCRAP
const scrapSoub = require('./souB.js')
const scrapOLX = require('./olx.js')
const scrapKabum = require('./sites/kabum/Kabum.js')
const scrapTeraByte = require('./sites/terabyte/Terabyte.js')
const scrapFacebook = require('./sites/Facebook/Facebook.js')
const scrapImobiliariaGlaucia = require('./sites/ImobiliariaGlaucia/ImobiliariaGlaucia.js')
const scrapPichau = require('./sites/pichau/Pichau.js')

//PROD
const prodsAtualSouB = require("./oldProducts.json");
const prodsAtualOLX = require("./prodsOlxOld.json");
const prodsAtualKabum = require("./DataBaseFiles/old/oldProdsKabum.json");
const prodsAtualTerabyte = require("./DataBaseFiles/old/oldProdsTeraByte.json");
const prodsAtualFacebook = require("./DataBaseFiles/old/oldProdsFacebook.json");
const prodsAtualImobiliariaGlaucia = require("./DataBaseFiles/old/oldProdsImobiliariaGlaucia.json");
const prodsAtualPichau = require("./DataBaseFiles/old/oldProdsPichau.json");

//URL
const urlSouB = require("./SouBUrl.json");
const urlOLX = require("./OlxURL.json");
const urlKabum = require("./DataBaseFiles/urls/URLKabum.json");
const urlTeraByte = require("./DataBaseFiles/urls/URLTeraByte.json");
const URLFacebook = require("./DataBaseFiles/urls/URLFacebook.json");
const URLlImobiliariaGlaucia = require("./DataBaseFiles/urls/URLImobiliariaGlaucia.json");
const URLlPichau = require("./DataBaseFiles/urls/URLPichau.json");

scrapSoub.startSoub(prodsAtualSouB,"oldProducts","newProducts",urlSouB);
scrapOLX.startOLX(prodsAtualOLX,"prodsOlxOld","prodsOlxNew",urlOLX);
scrapKabum.startKabum(prodsAtualKabum,"DataBaseFiles/old/oldProdsKabum","DataBaseFiles/new/NewProdsKabum",urlKabum)
scrapTeraByte.startTeraByte(prodsAtualTerabyte,"DataBaseFiles/old/oldProdsTeraByte","DataBaseFiles/new/NewProdsTeraByte",urlTeraByte)
scrapFacebook.startFacebook(prodsAtualFacebook,"DataBaseFiles/old/oldProdsFacebook","DataBaseFiles/new/NewProdsFacebook",URLFacebook)
scrapImobiliariaGlaucia.startImobiliariaGlaucia(prodsAtualImobiliariaGlaucia,"DataBaseFiles/old/oldProdsImobiliariaGlaucia","DataBaseFiles/new/NewProdsImobiliariaGlaucia",URLlImobiliariaGlaucia)
scrapPichau.startPichau(prodsAtualPichau,"DataBaseFiles/old/oldProdsPichau","DataBaseFiles/new/NewProdsPichau",URLlPichau)