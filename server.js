const scrapSoub = require('./souB.js')
const scrapOLX = require('./olx.js')
const prodsAtualSouB = require("./oldProducts.json");
const prodsAtualOLX = require("./prodsOlxOld.json");

scrapSoub.startSoub(prodsAtualSouB,"oldProducts","newProducts");
scrapOLX.startOLX(prodsAtualOLX,"prodsOlxOld","prodsOlxNew");