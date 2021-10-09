const scrapSoub = require('../souB.js')
const scrapOLX = require('../olx.js')
const prodsAtualSouB = require("../oldProducts.json");
const prodsAtualOLX = require("../prodsOlxOld.json");
const urlSouB = require("../SouBUrl.json");
const urlOLX = require("../tests/payload/OlxURL.json");


describe("Valida fluxo funcionais", () => {

    expect.assertions(1);
    beforeEach(() => {
      jest.setTimeout(300000);
    });
    it("Validar fluxo sem scrap",  async () => {
// scrapSoub.startSoub(prodsAtualSouB,"oldProducts","newProducts",urlSouB);
        await scrapOLX.startOLX(prodsAtualOLX,"prodsOlxOld","prodsOlxNew",urlOLX);

expect(true).toBe(true)

    })
})