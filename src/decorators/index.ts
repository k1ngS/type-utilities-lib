/**
 * Decorator que mede o tempo de execução de métodos.
 *
 * Logs produzidos:
 * - argumentos recebidos
 * - valorr retornado (após await, se for async)
 * - duração em milissegundos
 *
 * Use em métodos de classes com o decorator syntax (`experimentalDecorators: true`).
 *
 * @example
 * class Service {
 *   @MeasureTime()
 *   async fetch() { ... }
 * }
 *
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 */
export function MeasureTime() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log(`[${propertyKey}] argumentos recebidos:`, args);
      const start = Date.now();

      const result = await originalMethod.apply(this, args);

      const duration = Date.now() - start;
      console.log(`[${propertyKey}] retornado:`, result);
      console.log(`[${propertyKey}] duração: ${duration}ms`);

      return result;
    };

    return descriptor;
  };
}

/**
 * Decorator que cacheia o resultado de métodos, retornando valores armazenados
 * em chamadas subsequentes com os mesmos argumentos até o TTL expirar.
 *
 * @param ttl - Tempo de vida do cache em milissegundos (ex: 5000 = 5 segundos)
 *
 * @example
 * class UserService {
 *    @Cache(60000) // Cacheia por 1 minuto
 *    async buscarUsuario(id: number) {
 *      return fetch(`/api/users/${id}`)
 *  }
 * }
 *
 * @returns {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function Cache(ttl: number) {
  const cache = new Map<string, { valor: any; expira: number }>(); // Um cache compartilhado

  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const chaveCache = `${key}:${JSON.stringify(args)}`; // Serializa argumentos

      if (cache.has(chaveCache)) {
        const item = cache.get(chaveCache);
        if (item && Date.now() < item.expira) {
          return item.valor;
        }
        cache.delete(chaveCache); // Limpa expirado
      }

      const resultado = original.apply(this, args);
      cache.set(chaveCache, {
        valor: resultado,
        expira: Date.now() + ttl,
      });
      return resultado;
    };
  };
}
