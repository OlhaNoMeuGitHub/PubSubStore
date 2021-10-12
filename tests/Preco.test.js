const { listPrecos, Preco } = require('../Produto');




describe("Valida Objeto Preco passando apenas valor", () => {
    it("Cria objeto preco e retorna valor", () => {
      let precoObj = new listPrecos("R$100,00")

      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
    });
  
  });

  describe("Valida Objeto Preco passando Objeto", () => {
    it("Cria objeto preco e retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new listPrecos({valor:"R$100,00",data: dataatual})

      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
      expect(precoObj.dataAtual).toBe(dataatual);
    });

    it("Cria objeto preco com valor vazio e retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new listPrecos({valor:"",data: dataatual})

      expect(precoObj.valorAtual).toBe("");
      expect(precoObj.dataAtual).toBe(dataatual);

    });

    it("Cria objeto preco com valor vazio e retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new listPrecos({valor:""})

      expect(typeof(precoObj.dataAtual)).not.toBe("undefined");

    });
  
  });

  describe("Valida Objeto Preco passando lista de objetos", () => {
    it("Cria objeto precolist passando uma lista retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new listPrecos([{valor:"R$100,00",data: dataatual},{valor:"R$200,00",data: dataatual},{valor:"R$300,00",data: dataatual}])
      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
      expect(precoObj.dataAtual).toBe(dataatual);
  })

  it("Cria objeto precolist passando e atualiza preco com array", () => {
    let dataatual = new Date();
    let precoObj = new listPrecos([{valor:"R$200,00",data: dataatual},{valor:"R$300,00",data: dataatual}])
    precoObj.atualizaPreco([{valor:"R$100,00",data: dataatual}])

    expect(precoObj.valorAtual).toBe("100,00");
    expect(precoObj.valorAtual).not.toBe("00");
    expect(precoObj.dataAtual).toBe(dataatual);
})

it("Cria objeto precolist passando e atualiza preco com objeto", () => {
  let dataatual = new Date();
  let precoObj = new listPrecos([{valor:"R$200,00",data: dataatual},{valor:"R$300,00",data: dataatual}])
  precoObj.atualizaPreco({valor:"R$100,00",data: dataatual})

  expect(precoObj.valorAtual).toBe("100,00");
  expect(precoObj.valorAtual).not.toBe("00");
  expect(precoObj.dataAtual).toBe(dataatual);
})



it("Cria objeto precolist passando e atualiza preco como objeto de preco", () => {
  let dataatual = new Date();
  let precoObj = new listPrecos({preco:[{preco:{valor:"R$200,00",data: dataatual}},{preco:{valor:"R$300,00",data: dataatual}}]})
  precoObj.atualizaPreco("R$100,00")
  expect(precoObj.valorAtual).toBe("100,00");
  expect(precoObj.valorAtual).not.toBe("00");
})

it("Cria objeto precolist passando e atualiza preco como objeto de preco e atualiza via objeto preco", () => {
  let dataatual = new Date();
  let precoObj = new listPrecos({preco:[{preco:{valor:"R$200,00",data: dataatual}},{preco:{valor:"R$300,00",data: dataatual}}]})
  precoObj.atualizaPreco({preco:{valor:"R$100,00",data: dataatual}})
  expect(precoObj.valorAtual).toBe("100,00");
  expect(precoObj.valorAtual).not.toBe("00");
})
it("Cria objeto precolist passando um objeto preco com lista de valores e datas", () => {
  let dataatual = new Date();
  let precoObj = new listPrecos({preco:[{valor:"R$100,00",data: dataatual},{valor:"R$300,00",data: dataatual}]})
  expect(precoObj.valorAtual).toBe("100,00");
  expect(precoObj.valorAtual).not.toBe("00");
})

})
  