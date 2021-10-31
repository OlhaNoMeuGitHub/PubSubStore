const scrapPup = require("../../pupScript");
const { ProdutoPichau } = require("./ProdutoPichau");

async function startPichau(OldProds, fileNameOld, FileNameNew, ArrURL) {
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncPichau);
  ProdutoPichau.ExecutafluxoDeTratamentoPersistencia(
    produtosObtidos,
    OldProds,
    fileNameOld,
    FileNameNew
  );
}

const getdataFuncPichau =  async function getdataPichau(page, item) {
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll("div.MuiPaper-root.MuiCard-root")).reduce((accumulator, currentValue) => {

      
      const procuratexto = (el) => {
        if(el.children.length > 0){
            for (let elem of el.children){
                    ve = procuratexto(elem)
                    if(ve != "") return ve;
            }
        }
        return el.innerText.toLowerCase().includes("r$")?el.innerText:""
        

        }

        textolocalizado = procuratexto(currentValue)
      if (
        typeof currentValue.getElementsByClassName("MuiTypography-h6")[0] == "object" &&
        textolocalizado != ""
        ) {
          
          let obj = {
            nome: currentValue.getElementsByClassName("MuiTypography-h6")[0].innerText,
            preco:
            textolocalizado,
            filtro: item.tipo,
            url: currentValue.parentNode.href,
            keyword: item.keyword,
          };
          accumulator.push(obj);
        }
        return accumulator;
      }, []);
    }, item);
  };


  module.exports = { getdataFuncPichau,startPichau };



