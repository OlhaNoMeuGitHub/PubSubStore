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
      let dataatual = new Date();
      let precoObj = new Preco({valor:"R$100,00",data: dataatual})

      expect(precoObj.valorAtual).toBe("100,00");
      expect(precoObj.valorAtual).not.toBe("00");
      expect(precoObj.dataAtual).toBe(dataatual);
    });

    it("Cria objeto preco com valor vazio e retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new Preco({valor:"",data: dataatual})

      expect(precoObj.valorAtual).toBe("");
      expect(precoObj.dataAtual).toBe(dataatual);

    });

    it("Cria objeto preco com valor vazio e retorna valor", () => {
      let dataatual = new Date();
      let precoObj = new Preco({valor:""})

      expect(typeof(precoObj.dataAtual)).not.toBe("undefined");

    });
  
  });
  