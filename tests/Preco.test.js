const { Preco } = require('../Produto');




describe("Valida Objeto Preco passando apenas valor", () => {
    it("Cria objeto preco e retorna valor", () => {
      let precoObj = new Preco("R$100,00")

      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
    });
  
  });

  describe("Valida Objeto Preco passando Objeto", () => {
    it("Cria objeto preco e retorna valor", () => {
      let precoObj = new Preco({valor:"R$100,00",data: new Date()})

      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
    });
  
  });
  