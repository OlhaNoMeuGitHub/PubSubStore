const scrapSoub = require('./souB.js')
const scrapOLX = require('./olx.js')
const scrapKabum = require('./sites/kabum/Kabum.js')
const prodsAtualSouB = require("./oldProducts.json");
const prodsAtualOLX = require("./prodsOlxOld.json");
const prodsAtualKabum = require("./DataBaseFiles/old/oldProdsKabum.json");
const urlSouB = require("./SouBUrl.json");
const urlOLX = require("./OlxURL.json");
const urlKabum = require("./DataBaseFiles/urls/URLKabum.json");

// scrapSoub.startSoub(prodsAtualSouB,"oldProducts","newProducts",urlSouB);
// scrapOLX.startOLX(prodsAtualOLX,"prodsOlxOld","prodsOlxNew",urlOLX);
scrapKabum.startKabum(prodsAtualKabum,"DataBaseFiles/old/oldProdsKabum","DataBaseFiles/new/NewProdsKabum",urlKabum)