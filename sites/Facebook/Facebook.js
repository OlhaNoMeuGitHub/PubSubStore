const scrapPup = require("../../pupScript");
const { ProdutoFacebook } = require("./ProdutoFacebook");

async function startFacebook(OldProds, fileNameOld, FileNameNew, ArrURL) {
  let produtosObtidos = await scrapPup.scrape(ArrURL, getdataFuncFacebook);
  ProdutoFacebook.ExecutafluxoDeTratamentoPersistencia(
    produtosObtidos,
    OldProds,
    fileNameOld,
    FileNameNew
  );
}

const getdataFuncFacebook =  async function getdataFacebook(page, item) {
  await scrollDown(5,page)
  return page.evaluate((item) => {
    return Array.from(document.querySelectorAll(".b3onmgus.ph5uu5jm.g5gj957u.buofh1pr.cbu4d94t.rj1gh0hx.j83agx80.rq0escxv.fnqts5cd.fo9g3nie.n1dktuyu.e5nlhep0.ecm0bbzt")).reduce((accumulator, currentValue) => {
      if (
        typeof currentValue.getElementsByClassName("a8nywdso e5nlhep0 rz4wbd8a ecm0bbzt btwxx1t3 j83agx80")[0] == "object" &&
        typeof currentValue.getElementsByClassName("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7")[0] == "object" &&
        typeof currentValue.getElementsByClassName("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5")[0] == "object" &&
        typeof currentValue.getElementsByClassName("oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 p8dawk7l")[0] == "object"
        ) {
          
          let obj = {
            nome: currentValue.getElementsByClassName("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7")[0].innerText + " " + currentValue.getElementsByClassName("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5")[0].innerText,
            preco:
            currentValue.getElementsByClassName("a8nywdso e5nlhep0 rz4wbd8a ecm0bbzt btwxx1t3 j83agx80")[0].innerText,
            filtro: item.tipo,
            url: currentValue.getElementsByClassName("oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 p8dawk7l")[0].href,
            keyword: item.keyword,
          };
          accumulator.push(obj);
        }
        return accumulator;
      }, []);
    }, item);
  };

  async function scrollDown(qtd,page){
    await page.evaluate(async (qtd) => {
        await new Promise((resolve, reject) => {
            var totalvezes = 0;
            var distance = 1500;
            var timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalvezes += 1;

                if(totalvezes >= qtd){
                    clearInterval(timer);
                    resolve();
                }
            }, 1500);
        });
    },qtd);
}



  module.exports = { getdataFuncFacebook,startFacebook };
