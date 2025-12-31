import { retry } from "../utils";

describe("Retry Utility", () => {
  it("deve retornar o valor na primeira tentativa se tudo der certo", async () => {
    // 1. Criar uma função que sempre retorna "Sucesso"
    const mockFunc = jest.fn().mockResolvedValue("Sucesso");

    // 2. Rodar o retry
    const resultado = await retry(mockFunc, 3, 10); // delay curto para teste rapido

    // 3. Verificação
    expect(resultado).toBe("Sucesso");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("deve tentar novamente se falhar na primeira vez", async () => {
    // 1. Criar função que falha 1 vez e funciona na segunda
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("Falha 1"))
      .mockResolvedValue("Sucesso na 2");

    const resultado = await retry(mockFunc, 3, 10);

    expect(resultado).toBe("Sucesso na 2");
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it("deve lançar erro se todas as tentativas falharem", async () => {
    // 1. Criar função que sempre falha
    const mockFunc = jest.fn().mockRejectedValue(new Error("Erro Fatal"));

    // 2. Esperamos que o retry jogue o erro pra cima
    await expect(retry(mockFunc, 3, 10)).rejects.toThrow("Erro Fatal");

    // 3. Confirmamos que ele tentou exatamente 3 vezes
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });
});
