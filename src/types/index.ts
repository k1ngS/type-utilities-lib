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

/**
 * Tipo que permite o valor T ou undefined em contexto que o null nao é usado
 *
 * @template T - Tipo original
 * @example
 * type UserData = Maybe<string>; // string | undefined
 */
export type Maybe<T> = T | undefined;

/**
 * Combina T com null e undefined.
 *
 * Representa valores que podem estar ausentes de qualquer forma.
 *
 * @template T - Tipo original permitido.
 * @example
 * type OptionalString = Optional<string>; // string | null | undefined
 */
export type Optional<T> = T | undefined | null;

/**
 * Seleciona apenas as propriedades de T cujo tipo estende U.
 *
 * Use quando quiser filtrar um tipo para conter apenas propriedades
 * de um tipo específico (ex: apenas strings, apenas números, etc).
 *
 * @template T - Tipo original.
 * @template U - Tipo usado como filtro para selecionar propriedades.
 * @example
 * type User = { name: string; age: number; active: boolean };
 * type StringProps = PickByType<User, string>; // { name: string }
 * type NumberProps = PickByType<User, number>; // { age: number }
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * Remove as propriedades de T cujo tipo estende U.
 *
 * Use quando quiser excluir propriedades de um tipo específico
 * (ex: remover todas as strings, números, funções, etc).
 *
 * @template T - Tipo original.
 * @template U - Tipo usado como filtro para remover propriedades.
 * @example
 * type User = { name: string; age: number; active: boolean };
 * type NoStrings = OmitByType<User, string>; // { age: number; active: boolean }
 * type NoNumbers = OmitByType<User, number>; // { name: string; active: boolean }
 */
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};