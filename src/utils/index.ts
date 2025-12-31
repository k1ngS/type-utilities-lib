/**
 * Tenta executar uma função assíncrona várias vezes antes de desistir.
 *
 * @template T - O tipo de dado que a função original retorna.
 * @param fn - A função que será executada (deve retornar uma Promise).
 * @param retries - Quantas vezes tentar (padrão: 3).
 * @param delay - (Optional) Tempo em ms para esperar entre tentativas.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw new Error(`[ERROR]: ${error}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Falha inesperada no retry");
}
