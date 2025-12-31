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
