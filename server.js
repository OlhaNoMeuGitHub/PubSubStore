const scrapSoub = require('./souB.js')
const scrapOLX = require('./olx.js')
const prodsAtualSouB = require("./oldProducts.json");
const prodsAtualOLX = require("./prodsOlxOld.json");
const urlSouB = require("./SouBUrl.json");
const urlOLX = require("./OlxURL.json");

scrapSoub.startSoub(prodsAtualSouB,"oldProducts","newProducts",urlSouB);
scrapOLX.startOLX(prodsAtualOLX,"prodsOlxOld","prodsOlxNew",urlOLX);