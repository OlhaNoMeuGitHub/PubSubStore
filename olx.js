const scrapPup = require('./pupScript.js')

function startOLX(){

    let ArrURL = [{url:'https://sp.olx.com.br/sao-paulo-e-regiao/zona-norte?q=movel&sf=1' ,tipo:"Casa"}]

    const getdataFuncOLX = async function getdataOLX(page,item) {
        return page.evaluate((tipo) => {
            return Array.from(document.querySelectorAll('div.fnmrjs-1')).map(
                prodWeb => {
                    return {
                        nome:prodWeb.getElementsByClassName('sc-1mbetcw-0')[0].innerText, 
                        preco:prodWeb.getElementsByClassName('sc-ifAKCX eoKYee')[0].innerText,
                        filtro:tipo
                    }
                })
            },item.tipo)
    }

    console.log("hello world")
    scrapPup.scrape(ArrURL,getdataFuncOLX).then((v) => {  console.log(v)})

    }



module.exports = {startOLX}