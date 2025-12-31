/**
 * Tipo que permite o valor T ou null.
 *
 * @template T - Tipo original permitido.
 * @example
 * type MaybeString = Nullable<string>; // string | null
 */
export type Nullable<T> = T | null;

/**
 * Torna todas as propriedades de T opcionais recursivamente.
 *
 * Use quando quiser permitir objetos parcialmente preenchidos, incluindo campos aninhados.
 *
 * @template T - Tipo original.
 * @example
 * type PartialUser = DeepPartial<User>;
 */
export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

/**
 * Torna todas as propriedades de T obrigatórias recursivamente.
 *
 * Use quando quiser garantir que objetos parcialmente opcionais
 * passam a ter todas as propriedades obrigatórias.
 *
 * @template T - Tipo original.
 * @example
 * type RequiredUser = DeepRequired<User>;
 */
export type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;

/**
 * Torna todas as propriedades de T readonly recursivamente.
 *
 * Use para criar uma versão imutável de um tipo, incluindo objetos aninhados.
 *
 * @template T - Tipo original.
 * @example
 * type ReadonlyUser = ReadonlyDeep<User>;
 */
export type ReadonlyDeep<T> = T extends object
  ? {
      readonly [K in keyof T]: ReadonlyDeep<T[K]>;
    }
  : T;

/**
 * (Achata) tipos resultantes de interseções para melhor a legibilidade no editor
 * e mensagens de erro.
 *
 * @template T - Tipo original.
 * @remarks
 * Mantém o mesmo comportamento de tipo em tempo de compilação; é útil apenas para melhor
 * apresentação no editor/diagnósticos.
 *
 * @example
 * type P = Prettyfi<{ a: number } & { b: string }>; // { a: number; b: string }
 */
export type Prettyfi<T> = {
  [K in keyof T]: T[K];
} & {};
