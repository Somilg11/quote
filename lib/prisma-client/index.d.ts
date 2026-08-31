
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Workspace
 * 
 */
export type Workspace = $Result.DefaultSelection<Prisma.$WorkspacePayload>
/**
 * Model WorkspaceMember
 * 
 */
export type WorkspaceMember = $Result.DefaultSelection<Prisma.$WorkspaceMemberPayload>
/**
 * Model WorkspaceInvite
 * 
 */
export type WorkspaceInvite = $Result.DefaultSelection<Prisma.$WorkspaceInvitePayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model PageUpdate
 * 
 */
export type PageUpdate = $Result.DefaultSelection<Prisma.$PageUpdatePayload>
/**
 * Model PagePresence
 * 
 */
export type PagePresence = $Result.DefaultSelection<Prisma.$PagePresencePayload>
/**
 * Model ApiToken
 * 
 */
export type ApiToken = $Result.DefaultSelection<Prisma.$ApiTokenPayload>
/**
 * Model OAuthClient
 * A client registered through RFC 7591 dynamic client registration.
 */
export type OAuthClient = $Result.DefaultSelection<Prisma.$OAuthClientPayload>
/**
 * Model OAuthAuthorizationCode
 * A single-use authorization code, hashed at rest like every other secret here.
 */
export type OAuthAuthorizationCode = $Result.DefaultSelection<Prisma.$OAuthAuthorizationCodePayload>
/**
 * Model OAuthToken
 * An issued access token plus its refresh token. Rotating a refresh token
 * replaces the row's hashes rather than creating a second grant.
 */
export type OAuthToken = $Result.DefaultSelection<Prisma.$OAuthTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspaceMember`: Exposes CRUD operations for the **WorkspaceMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceMembers
    * const workspaceMembers = await prisma.workspaceMember.findMany()
    * ```
    */
  get workspaceMember(): Prisma.WorkspaceMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workspaceInvite`: Exposes CRUD operations for the **WorkspaceInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceInvites
    * const workspaceInvites = await prisma.workspaceInvite.findMany()
    * ```
    */
  get workspaceInvite(): Prisma.WorkspaceInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pageUpdate`: Exposes CRUD operations for the **PageUpdate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PageUpdates
    * const pageUpdates = await prisma.pageUpdate.findMany()
    * ```
    */
  get pageUpdate(): Prisma.PageUpdateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pagePresence`: Exposes CRUD operations for the **PagePresence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PagePresences
    * const pagePresences = await prisma.pagePresence.findMany()
    * ```
    */
  get pagePresence(): Prisma.PagePresenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiToken`: Exposes CRUD operations for the **ApiToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiTokens
    * const apiTokens = await prisma.apiToken.findMany()
    * ```
    */
  get apiToken(): Prisma.ApiTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthClient`: Exposes CRUD operations for the **OAuthClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthClients
    * const oAuthClients = await prisma.oAuthClient.findMany()
    * ```
    */
  get oAuthClient(): Prisma.OAuthClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthAuthorizationCode`: Exposes CRUD operations for the **OAuthAuthorizationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthAuthorizationCodes
    * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany()
    * ```
    */
  get oAuthAuthorizationCode(): Prisma.OAuthAuthorizationCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthToken`: Exposes CRUD operations for the **OAuthToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthTokens
    * const oAuthTokens = await prisma.oAuthToken.findMany()
    * ```
    */
  get oAuthToken(): Prisma.OAuthTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    User: 'User',
    Workspace: 'Workspace',
    WorkspaceMember: 'WorkspaceMember',
    WorkspaceInvite: 'WorkspaceInvite',
    Page: 'Page',
    PageUpdate: 'PageUpdate',
    PagePresence: 'PagePresence',
    ApiToken: 'ApiToken',
    OAuthClient: 'OAuthClient',
    OAuthAuthorizationCode: 'OAuthAuthorizationCode',
    OAuthToken: 'OAuthToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "session" | "verificationToken" | "user" | "workspace" | "workspaceMember" | "workspaceInvite" | "page" | "pageUpdate" | "pagePresence" | "apiToken" | "oAuthClient" | "oAuthAuthorizationCode" | "oAuthToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Workspace: {
        payload: Prisma.$WorkspacePayload<ExtArgs>
        fields: Prisma.WorkspaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceMember: {
        payload: Prisma.$WorkspaceMemberPayload<ExtArgs>
        fields: Prisma.WorkspaceMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findFirst: {
            args: Prisma.WorkspaceMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findMany: {
            args: Prisma.WorkspaceMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          create: {
            args: Prisma.WorkspaceMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          createMany: {
            args: Prisma.WorkspaceMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          delete: {
            args: Prisma.WorkspaceMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          update: {
            args: Prisma.WorkspaceMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          aggregate: {
            args: Prisma.WorkspaceMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceMember>
          }
          groupBy: {
            args: Prisma.WorkspaceMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceMemberCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceInvite: {
        payload: Prisma.$WorkspaceInvitePayload<ExtArgs>
        fields: Prisma.WorkspaceInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          findMany: {
            args: Prisma.WorkspaceInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>[]
          }
          create: {
            args: Prisma.WorkspaceInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          createMany: {
            args: Prisma.WorkspaceInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          update: {
            args: Prisma.WorkspaceInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkspaceInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>[]
          }
          upsert: {
            args: Prisma.WorkspaceInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceInvitePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceInvite>
          }
          groupBy: {
            args: Prisma.WorkspaceInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceInviteCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceInviteCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      PageUpdate: {
        payload: Prisma.$PageUpdatePayload<ExtArgs>
        fields: Prisma.PageUpdateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageUpdateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageUpdateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          findFirst: {
            args: Prisma.PageUpdateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageUpdateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          findMany: {
            args: Prisma.PageUpdateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>[]
          }
          create: {
            args: Prisma.PageUpdateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          createMany: {
            args: Prisma.PageUpdateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageUpdateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>[]
          }
          delete: {
            args: Prisma.PageUpdateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          update: {
            args: Prisma.PageUpdateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          deleteMany: {
            args: Prisma.PageUpdateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>[]
          }
          upsert: {
            args: Prisma.PageUpdateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageUpdatePayload>
          }
          aggregate: {
            args: Prisma.PageUpdateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePageUpdate>
          }
          groupBy: {
            args: Prisma.PageUpdateGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageUpdateGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageUpdateCountArgs<ExtArgs>
            result: $Utils.Optional<PageUpdateCountAggregateOutputType> | number
          }
        }
      }
      PagePresence: {
        payload: Prisma.$PagePresencePayload<ExtArgs>
        fields: Prisma.PagePresenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagePresenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagePresenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          findFirst: {
            args: Prisma.PagePresenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagePresenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          findMany: {
            args: Prisma.PagePresenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>[]
          }
          create: {
            args: Prisma.PagePresenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          createMany: {
            args: Prisma.PagePresenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagePresenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>[]
          }
          delete: {
            args: Prisma.PagePresenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          update: {
            args: Prisma.PagePresenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          deleteMany: {
            args: Prisma.PagePresenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagePresenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PagePresenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>[]
          }
          upsert: {
            args: Prisma.PagePresenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePresencePayload>
          }
          aggregate: {
            args: Prisma.PagePresenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagePresence>
          }
          groupBy: {
            args: Prisma.PagePresenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagePresenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagePresenceCountArgs<ExtArgs>
            result: $Utils.Optional<PagePresenceCountAggregateOutputType> | number
          }
        }
      }
      ApiToken: {
        payload: Prisma.$ApiTokenPayload<ExtArgs>
        fields: Prisma.ApiTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findFirst: {
            args: Prisma.ApiTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findMany: {
            args: Prisma.ApiTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          create: {
            args: Prisma.ApiTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          createMany: {
            args: Prisma.ApiTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          delete: {
            args: Prisma.ApiTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          update: {
            args: Prisma.ApiTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          deleteMany: {
            args: Prisma.ApiTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          upsert: {
            args: Prisma.ApiTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          aggregate: {
            args: Prisma.ApiTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiToken>
          }
          groupBy: {
            args: Prisma.ApiTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenCountAggregateOutputType> | number
          }
        }
      }
      OAuthClient: {
        payload: Prisma.$OAuthClientPayload<ExtArgs>
        fields: Prisma.OAuthClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          findFirst: {
            args: Prisma.OAuthClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          findMany: {
            args: Prisma.OAuthClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          create: {
            args: Prisma.OAuthClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          createMany: {
            args: Prisma.OAuthClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          delete: {
            args: Prisma.OAuthClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          update: {
            args: Prisma.OAuthClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          deleteMany: {
            args: Prisma.OAuthClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          upsert: {
            args: Prisma.OAuthClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          aggregate: {
            args: Prisma.OAuthClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthClient>
          }
          groupBy: {
            args: Prisma.OAuthClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthClientCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthClientCountAggregateOutputType> | number
          }
        }
      }
      OAuthAuthorizationCode: {
        payload: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>
        fields: Prisma.OAuthAuthorizationCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthAuthorizationCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          findFirst: {
            args: Prisma.OAuthAuthorizationCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          findMany: {
            args: Prisma.OAuthAuthorizationCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          create: {
            args: Prisma.OAuthAuthorizationCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          createMany: {
            args: Prisma.OAuthAuthorizationCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          delete: {
            args: Prisma.OAuthAuthorizationCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          update: {
            args: Prisma.OAuthAuthorizationCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          deleteMany: {
            args: Prisma.OAuthAuthorizationCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthAuthorizationCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          upsert: {
            args: Prisma.OAuthAuthorizationCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          aggregate: {
            args: Prisma.OAuthAuthorizationCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthAuthorizationCode>
          }
          groupBy: {
            args: Prisma.OAuthAuthorizationCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthAuthorizationCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthAuthorizationCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthAuthorizationCodeCountAggregateOutputType> | number
          }
        }
      }
      OAuthToken: {
        payload: Prisma.$OAuthTokenPayload<ExtArgs>
        fields: Prisma.OAuthTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          update: {
            args: Prisma.OAuthTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthToken>
          }
          groupBy: {
            args: Prisma.OAuthTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    user?: UserOmit
    workspace?: WorkspaceOmit
    workspaceMember?: WorkspaceMemberOmit
    workspaceInvite?: WorkspaceInviteOmit
    page?: PageOmit
    pageUpdate?: PageUpdateOmit
    pagePresence?: PagePresenceOmit
    apiToken?: ApiTokenOmit
    oAuthClient?: OAuthClientOmit
    oAuthAuthorizationCode?: OAuthAuthorizationCodeOmit
    oAuthToken?: OAuthTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    workspaces: number
    workspaceMemberships: number
    pages: number
    apiTokens: number
    oauthGrants: number
    oauthTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    workspaces?: boolean | UserCountOutputTypeCountWorkspacesArgs
    workspaceMemberships?: boolean | UserCountOutputTypeCountWorkspaceMembershipsArgs
    pages?: boolean | UserCountOutputTypeCountPagesArgs
    apiTokens?: boolean | UserCountOutputTypeCountApiTokensArgs
    oauthGrants?: boolean | UserCountOutputTypeCountOauthGrantsArgs
    oauthTokens?: boolean | UserCountOutputTypeCountOauthTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspaceMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }


  /**
   * Count Type WorkspaceCountOutputType
   */

  export type WorkspaceCountOutputType = {
    members: number
    pages: number
    invites: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | WorkspaceCountOutputTypeCountMembersArgs
    pages?: boolean | WorkspaceCountOutputTypeCountPagesArgs
    invites?: boolean | WorkspaceCountOutputTypeCountInvitesArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceInviteWhereInput
  }


  /**
   * Count Type PageCountOutputType
   */

  export type PageCountOutputType = {
    children: number
    updates: number
    presence: number
  }

  export type PageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | PageCountOutputTypeCountChildrenArgs
    updates?: boolean | PageCountOutputTypeCountUpdatesArgs
    presence?: boolean | PageCountOutputTypeCountPresenceArgs
  }

  // Custom InputTypes
  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     */
    select?: PageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageUpdateWhereInput
  }

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountPresenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagePresenceWhereInput
  }


  /**
   * Count Type OAuthClientCountOutputType
   */

  export type OAuthClientCountOutputType = {
    codes: number
    tokens: number
  }

  export type OAuthClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    codes?: boolean | OAuthClientCountOutputTypeCountCodesArgs
    tokens?: boolean | OAuthClientCountOutputTypeCountTokensArgs
  }

  // Custom InputTypes
  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClientCountOutputType
     */
    select?: OAuthClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    workspaces?: boolean | User$workspacesArgs<ExtArgs>
    workspaceMemberships?: boolean | User$workspaceMembershipsArgs<ExtArgs>
    pages?: boolean | User$pagesArgs<ExtArgs>
    apiTokens?: boolean | User$apiTokensArgs<ExtArgs>
    oauthGrants?: boolean | User$oauthGrantsArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    workspaces?: boolean | User$workspacesArgs<ExtArgs>
    workspaceMemberships?: boolean | User$workspaceMembershipsArgs<ExtArgs>
    pages?: boolean | User$pagesArgs<ExtArgs>
    apiTokens?: boolean | User$apiTokensArgs<ExtArgs>
    oauthGrants?: boolean | User$oauthGrantsArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      workspaces: Prisma.$WorkspacePayload<ExtArgs>[]
      workspaceMemberships: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      pages: Prisma.$PagePayload<ExtArgs>[]
      apiTokens: Prisma.$ApiTokenPayload<ExtArgs>[]
      oauthGrants: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>[]
      oauthTokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workspaces<T extends User$workspacesArgs<ExtArgs> = {}>(args?: Subset<T, User$workspacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workspaceMemberships<T extends User$workspaceMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$workspaceMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pages<T extends User$pagesArgs<ExtArgs> = {}>(args?: Subset<T, User$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiTokens<T extends User$apiTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$apiTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthGrants<T extends User$oauthGrantsArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthGrantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthTokens<T extends User$oauthTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.workspaces
   */
  export type User$workspacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    cursor?: WorkspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * User.workspaceMemberships
   */
  export type User$workspaceMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * User.pages
   */
  export type User$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * User.apiTokens
   */
  export type User$apiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    cursor?: ApiTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * User.oauthGrants
   */
  export type User$oauthGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * User.oauthTokens
   */
  export type User$oauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Workspace
   */

  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithAggregationInput | WorkspaceOrderByWithAggregationInput[]
    by: WorkspaceScalarFieldEnum[] | WorkspaceScalarFieldEnum
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }

  export type WorkspaceGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Workspace$membersArgs<ExtArgs>
    pages?: boolean | Workspace$pagesArgs<ExtArgs>
    invites?: boolean | Workspace$invitesArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkspaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["workspace"]>
  export type WorkspaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Workspace$membersArgs<ExtArgs>
    pages?: boolean | Workspace$pagesArgs<ExtArgs>
    invites?: boolean | Workspace$invitesArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkspacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workspace"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      pages: Prisma.$PagePayload<ExtArgs>[]
      invites: Prisma.$WorkspaceInvitePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workspace"]>
    composites: {}
  }

  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceDefaultArgs> = $Result.GetResult<Prisma.$WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceFindUniqueArgs>(args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workspace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceFindFirstArgs>(args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workspace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceFindManyArgs>(args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
     */
    create<T extends WorkspaceCreateArgs>(args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workspaces.
     * @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceCreateManyArgs>(args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workspaces and returns the data saved in the database.
     * @param {WorkspaceCreateManyAndReturnArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceDeleteArgs>(args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceUpdateArgs>(args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceDeleteManyArgs>(args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceUpdateManyArgs>(args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces and returns the data updated in the database.
     * @param {WorkspaceUpdateManyAndReturnArgs} args - Arguments to update many Workspaces.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceUpsertArgs>(args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workspace model
   */
  readonly fields: WorkspaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Workspace$membersArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pages<T extends Workspace$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invites<T extends Workspace$invitesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$invitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Workspace model
   */
  interface WorkspaceFieldRefs {
    readonly id: FieldRef<"Workspace", 'String'>
    readonly name: FieldRef<"Workspace", 'String'>
    readonly slug: FieldRef<"Workspace", 'String'>
    readonly description: FieldRef<"Workspace", 'String'>
    readonly ownerId: FieldRef<"Workspace", 'String'>
    readonly createdAt: FieldRef<"Workspace", 'DateTime'>
    readonly updatedAt: FieldRef<"Workspace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workspace findUnique
   */
  export type WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findFirst
   */
  export type WorkspaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }

  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace createManyAndReturn
   */
  export type WorkspaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
  }

  /**
   * Workspace updateManyAndReturn
   */
  export type WorkspaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }

  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
    /**
     * Limit how many Workspaces to delete.
     */
    limit?: number
  }

  /**
   * Workspace.members
   */
  export type Workspace$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * Workspace.pages
   */
  export type Workspace$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Workspace.invites
   */
  export type Workspace$invitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    where?: WorkspaceInviteWhereInput
    orderBy?: WorkspaceInviteOrderByWithRelationInput | WorkspaceInviteOrderByWithRelationInput[]
    cursor?: WorkspaceInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceInviteScalarFieldEnum | WorkspaceInviteScalarFieldEnum[]
  }

  /**
   * Workspace without action
   */
  export type WorkspaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workspace
     */
    omit?: WorkspaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceMember
   */

  export type AggregateWorkspaceMember = {
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  export type WorkspaceMemberMinAggregateOutputType = {
    id: string | null
    userId: string | null
    workspaceId: string | null
    role: string | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    workspaceId: string | null
    role: string | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberCountAggregateOutputType = {
    id: number
    userId: number
    workspaceId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type WorkspaceMemberMinAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberCountAggregateInputType = {
    id?: true
    userId?: true
    workspaceId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type WorkspaceMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMember to aggregate.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceMembers
    **/
    _count?: true | WorkspaceMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type GetWorkspaceMemberAggregateType<T extends WorkspaceMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceMember[P]>
      : GetScalarType<T[P], AggregateWorkspaceMember[P]>
  }




  export type WorkspaceMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithAggregationInput | WorkspaceMemberOrderByWithAggregationInput[]
    by: WorkspaceMemberScalarFieldEnum[] | WorkspaceMemberScalarFieldEnum
    having?: WorkspaceMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceMemberCountAggregateInputType | true
    _min?: WorkspaceMemberMinAggregateInputType
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type WorkspaceMemberGroupByOutputType = {
    id: string
    userId: string
    workspaceId: string
    role: string
    joinedAt: Date
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  type GetWorkspaceMemberGroupByPayload<T extends WorkspaceMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    workspaceId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type WorkspaceMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "workspaceId" | "role" | "joinedAt", ExtArgs["result"]["workspaceMember"]>
  export type WorkspaceMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $WorkspaceMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      workspace: Prisma.$WorkspacePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      workspaceId: string
      role: string
      joinedAt: Date
    }, ExtArgs["result"]["workspaceMember"]>
    composites: {}
  }

  type WorkspaceMemberGetPayload<S extends boolean | null | undefined | WorkspaceMemberDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceMemberPayload, S>

  type WorkspaceMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceMemberCountAggregateInputType | true
    }

  export interface WorkspaceMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceMember'], meta: { name: 'WorkspaceMember' } }
    /**
     * Find zero or one WorkspaceMember that matches the filter.
     * @param {WorkspaceMemberFindUniqueArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceMemberFindUniqueArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkspaceMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceMemberFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceMemberFindFirstArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkspaceMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany()
     * 
     * // Get first 10 WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceMemberWithIdOnly = await prisma.workspaceMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceMemberFindManyArgs>(args?: SelectSubset<T, WorkspaceMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkspaceMember.
     * @param {WorkspaceMemberCreateArgs} args - Arguments to create a WorkspaceMember.
     * @example
     * // Create one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.create({
     *   data: {
     *     // ... data to create a WorkspaceMember
     *   }
     * })
     * 
     */
    create<T extends WorkspaceMemberCreateArgs>(args: SelectSubset<T, WorkspaceMemberCreateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkspaceMembers.
     * @param {WorkspaceMemberCreateManyArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceMemberCreateManyArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceMembers and returns the data saved in the database.
     * @param {WorkspaceMemberCreateManyAndReturnArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceMembers and only return the `id`
     * const workspaceMemberWithIdOnly = await prisma.workspaceMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkspaceMember.
     * @param {WorkspaceMemberDeleteArgs} args - Arguments to delete one WorkspaceMember.
     * @example
     * // Delete one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceMember
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceMemberDeleteArgs>(args: SelectSubset<T, WorkspaceMemberDeleteArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkspaceMember.
     * @param {WorkspaceMemberUpdateArgs} args - Arguments to update one WorkspaceMember.
     * @example
     * // Update one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceMemberUpdateArgs>(args: SelectSubset<T, WorkspaceMemberUpdateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkspaceMembers.
     * @param {WorkspaceMemberDeleteManyArgs} args - Arguments to filter WorkspaceMembers to delete.
     * @example
     * // Delete a few WorkspaceMembers
     * const { count } = await prisma.workspaceMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceMemberDeleteManyArgs>(args?: SelectSubset<T, WorkspaceMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceMemberUpdateManyArgs>(args: SelectSubset<T, WorkspaceMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceMembers and returns the data updated in the database.
     * @param {WorkspaceMemberUpdateManyAndReturnArgs} args - Arguments to update many WorkspaceMembers.
     * @example
     * // Update many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkspaceMembers and only return the `id`
     * const workspaceMemberWithIdOnly = await prisma.workspaceMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkspaceMember.
     * @param {WorkspaceMemberUpsertArgs} args - Arguments to update or create a WorkspaceMember.
     * @example
     * // Update or create a WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.upsert({
     *   create: {
     *     // ... data to create a WorkspaceMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceMember we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceMemberUpsertArgs>(args: SelectSubset<T, WorkspaceMemberUpsertArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberCountArgs} args - Arguments to filter WorkspaceMembers to count.
     * @example
     * // Count the number of WorkspaceMembers
     * const count = await prisma.workspaceMember.count({
     *   where: {
     *     // ... the filter for the WorkspaceMembers we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceMemberCountArgs>(
      args?: Subset<T, WorkspaceMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceMemberAggregateArgs>(args: Subset<T, WorkspaceMemberAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceMemberAggregateType<T>>

    /**
     * Group by WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceMemberGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceMember model
   */
  readonly fields: WorkspaceMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkspaceMember model
   */
  interface WorkspaceMemberFieldRefs {
    readonly id: FieldRef<"WorkspaceMember", 'String'>
    readonly userId: FieldRef<"WorkspaceMember", 'String'>
    readonly workspaceId: FieldRef<"WorkspaceMember", 'String'>
    readonly role: FieldRef<"WorkspaceMember", 'String'>
    readonly joinedAt: FieldRef<"WorkspaceMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceMember findUnique
   */
  export type WorkspaceMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findUniqueOrThrow
   */
  export type WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findFirst
   */
  export type WorkspaceMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findFirstOrThrow
   */
  export type WorkspaceMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findMany
   */
  export type WorkspaceMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMembers to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember create
   */
  export type WorkspaceMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
  }

  /**
   * WorkspaceMember createMany
   */
  export type WorkspaceMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceMember createManyAndReturn
   */
  export type WorkspaceMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceMember update
   */
  export type WorkspaceMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceMember to update.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember updateMany
   */
  export type WorkspaceMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceMembers.
     */
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceMembers to update
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to update.
     */
    limit?: number
  }

  /**
   * WorkspaceMember updateManyAndReturn
   */
  export type WorkspaceMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * The data used to update WorkspaceMembers.
     */
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceMembers to update
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceMember upsert
   */
  export type WorkspaceMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceMember to update in case it exists.
     */
    where: WorkspaceMemberWhereUniqueInput
    /**
     * In case the WorkspaceMember found by the `where` argument doesn't exist, create a new WorkspaceMember with this data.
     */
    create: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
    /**
     * In case the WorkspaceMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
  }

  /**
   * WorkspaceMember delete
   */
  export type WorkspaceMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceMember to delete.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember deleteMany
   */
  export type WorkspaceMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMembers to delete
     */
    where?: WorkspaceMemberWhereInput
    /**
     * Limit how many WorkspaceMembers to delete.
     */
    limit?: number
  }

  /**
   * WorkspaceMember without action
   */
  export type WorkspaceMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceMember
     */
    omit?: WorkspaceMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceInvite
   */

  export type AggregateWorkspaceInvite = {
    _count: WorkspaceInviteCountAggregateOutputType | null
    _min: WorkspaceInviteMinAggregateOutputType | null
    _max: WorkspaceInviteMaxAggregateOutputType | null
  }

  export type WorkspaceInviteMinAggregateOutputType = {
    id: string | null
    email: string | null
    workspaceId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type WorkspaceInviteMaxAggregateOutputType = {
    id: string | null
    email: string | null
    workspaceId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type WorkspaceInviteCountAggregateOutputType = {
    id: number
    email: number
    workspaceId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type WorkspaceInviteMinAggregateInputType = {
    id?: true
    email?: true
    workspaceId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type WorkspaceInviteMaxAggregateInputType = {
    id?: true
    email?: true
    workspaceId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type WorkspaceInviteCountAggregateInputType = {
    id?: true
    email?: true
    workspaceId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type WorkspaceInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceInvite to aggregate.
     */
    where?: WorkspaceInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvites to fetch.
     */
    orderBy?: WorkspaceInviteOrderByWithRelationInput | WorkspaceInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceInvites
    **/
    _count?: true | WorkspaceInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceInviteMaxAggregateInputType
  }

  export type GetWorkspaceInviteAggregateType<T extends WorkspaceInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceInvite[P]>
      : GetScalarType<T[P], AggregateWorkspaceInvite[P]>
  }




  export type WorkspaceInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceInviteWhereInput
    orderBy?: WorkspaceInviteOrderByWithAggregationInput | WorkspaceInviteOrderByWithAggregationInput[]
    by: WorkspaceInviteScalarFieldEnum[] | WorkspaceInviteScalarFieldEnum
    having?: WorkspaceInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceInviteCountAggregateInputType | true
    _min?: WorkspaceInviteMinAggregateInputType
    _max?: WorkspaceInviteMaxAggregateInputType
  }

  export type WorkspaceInviteGroupByOutputType = {
    id: string
    email: string
    workspaceId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: WorkspaceInviteCountAggregateOutputType | null
    _min: WorkspaceInviteMinAggregateOutputType | null
    _max: WorkspaceInviteMaxAggregateOutputType | null
  }

  type GetWorkspaceInviteGroupByPayload<T extends WorkspaceInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceInviteGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceInviteGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    workspaceId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvite"]>

  export type WorkspaceInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    workspaceId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvite"]>

  export type WorkspaceInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    workspaceId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceInvite"]>

  export type WorkspaceInviteSelectScalar = {
    id?: boolean
    email?: boolean
    workspaceId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type WorkspaceInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "workspaceId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["workspaceInvite"]>
  export type WorkspaceInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }
  export type WorkspaceInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
  }

  export type $WorkspaceInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceInvite"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      workspaceId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["workspaceInvite"]>
    composites: {}
  }

  type WorkspaceInviteGetPayload<S extends boolean | null | undefined | WorkspaceInviteDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceInvitePayload, S>

  type WorkspaceInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkspaceInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkspaceInviteCountAggregateInputType | true
    }

  export interface WorkspaceInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceInvite'], meta: { name: 'WorkspaceInvite' } }
    /**
     * Find zero or one WorkspaceInvite that matches the filter.
     * @param {WorkspaceInviteFindUniqueArgs} args - Arguments to find a WorkspaceInvite
     * @example
     * // Get one WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceInviteFindUniqueArgs>(args: SelectSubset<T, WorkspaceInviteFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkspaceInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkspaceInviteFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceInvite
     * @example
     * // Get one WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteFindFirstArgs} args - Arguments to find a WorkspaceInvite
     * @example
     * // Get one WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceInviteFindFirstArgs>(args?: SelectSubset<T, WorkspaceInviteFindFirstArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkspaceInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteFindFirstOrThrowArgs} args - Arguments to find a WorkspaceInvite
     * @example
     * // Get one WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkspaceInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceInvites
     * const workspaceInvites = await prisma.workspaceInvite.findMany()
     * 
     * // Get first 10 WorkspaceInvites
     * const workspaceInvites = await prisma.workspaceInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceInviteWithIdOnly = await prisma.workspaceInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceInviteFindManyArgs>(args?: SelectSubset<T, WorkspaceInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkspaceInvite.
     * @param {WorkspaceInviteCreateArgs} args - Arguments to create a WorkspaceInvite.
     * @example
     * // Create one WorkspaceInvite
     * const WorkspaceInvite = await prisma.workspaceInvite.create({
     *   data: {
     *     // ... data to create a WorkspaceInvite
     *   }
     * })
     * 
     */
    create<T extends WorkspaceInviteCreateArgs>(args: SelectSubset<T, WorkspaceInviteCreateArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkspaceInvites.
     * @param {WorkspaceInviteCreateManyArgs} args - Arguments to create many WorkspaceInvites.
     * @example
     * // Create many WorkspaceInvites
     * const workspaceInvite = await prisma.workspaceInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceInviteCreateManyArgs>(args?: SelectSubset<T, WorkspaceInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceInvites and returns the data saved in the database.
     * @param {WorkspaceInviteCreateManyAndReturnArgs} args - Arguments to create many WorkspaceInvites.
     * @example
     * // Create many WorkspaceInvites
     * const workspaceInvite = await prisma.workspaceInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceInvites and only return the `id`
     * const workspaceInviteWithIdOnly = await prisma.workspaceInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkspaceInvite.
     * @param {WorkspaceInviteDeleteArgs} args - Arguments to delete one WorkspaceInvite.
     * @example
     * // Delete one WorkspaceInvite
     * const WorkspaceInvite = await prisma.workspaceInvite.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceInvite
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceInviteDeleteArgs>(args: SelectSubset<T, WorkspaceInviteDeleteArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkspaceInvite.
     * @param {WorkspaceInviteUpdateArgs} args - Arguments to update one WorkspaceInvite.
     * @example
     * // Update one WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceInviteUpdateArgs>(args: SelectSubset<T, WorkspaceInviteUpdateArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkspaceInvites.
     * @param {WorkspaceInviteDeleteManyArgs} args - Arguments to filter WorkspaceInvites to delete.
     * @example
     * // Delete a few WorkspaceInvites
     * const { count } = await prisma.workspaceInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceInviteDeleteManyArgs>(args?: SelectSubset<T, WorkspaceInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceInvites
     * const workspaceInvite = await prisma.workspaceInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceInviteUpdateManyArgs>(args: SelectSubset<T, WorkspaceInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceInvites and returns the data updated in the database.
     * @param {WorkspaceInviteUpdateManyAndReturnArgs} args - Arguments to update many WorkspaceInvites.
     * @example
     * // Update many WorkspaceInvites
     * const workspaceInvite = await prisma.workspaceInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkspaceInvites and only return the `id`
     * const workspaceInviteWithIdOnly = await prisma.workspaceInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkspaceInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkspaceInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkspaceInvite.
     * @param {WorkspaceInviteUpsertArgs} args - Arguments to update or create a WorkspaceInvite.
     * @example
     * // Update or create a WorkspaceInvite
     * const workspaceInvite = await prisma.workspaceInvite.upsert({
     *   create: {
     *     // ... data to create a WorkspaceInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceInvite we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceInviteUpsertArgs>(args: SelectSubset<T, WorkspaceInviteUpsertArgs<ExtArgs>>): Prisma__WorkspaceInviteClient<$Result.GetResult<Prisma.$WorkspaceInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkspaceInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteCountArgs} args - Arguments to filter WorkspaceInvites to count.
     * @example
     * // Count the number of WorkspaceInvites
     * const count = await prisma.workspaceInvite.count({
     *   where: {
     *     // ... the filter for the WorkspaceInvites we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceInviteCountArgs>(
      args?: Subset<T, WorkspaceInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceInviteAggregateArgs>(args: Subset<T, WorkspaceInviteAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceInviteAggregateType<T>>

    /**
     * Group by WorkspaceInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceInviteGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceInvite model
   */
  readonly fields: WorkspaceInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkspaceInvite model
   */
  interface WorkspaceInviteFieldRefs {
    readonly id: FieldRef<"WorkspaceInvite", 'String'>
    readonly email: FieldRef<"WorkspaceInvite", 'String'>
    readonly workspaceId: FieldRef<"WorkspaceInvite", 'String'>
    readonly token: FieldRef<"WorkspaceInvite", 'String'>
    readonly expiresAt: FieldRef<"WorkspaceInvite", 'DateTime'>
    readonly createdAt: FieldRef<"WorkspaceInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceInvite findUnique
   */
  export type WorkspaceInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvite to fetch.
     */
    where: WorkspaceInviteWhereUniqueInput
  }

  /**
   * WorkspaceInvite findUniqueOrThrow
   */
  export type WorkspaceInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvite to fetch.
     */
    where: WorkspaceInviteWhereUniqueInput
  }

  /**
   * WorkspaceInvite findFirst
   */
  export type WorkspaceInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvite to fetch.
     */
    where?: WorkspaceInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvites to fetch.
     */
    orderBy?: WorkspaceInviteOrderByWithRelationInput | WorkspaceInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceInvites.
     */
    cursor?: WorkspaceInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvites.
     */
    distinct?: WorkspaceInviteScalarFieldEnum | WorkspaceInviteScalarFieldEnum[]
  }

  /**
   * WorkspaceInvite findFirstOrThrow
   */
  export type WorkspaceInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvite to fetch.
     */
    where?: WorkspaceInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvites to fetch.
     */
    orderBy?: WorkspaceInviteOrderByWithRelationInput | WorkspaceInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceInvites.
     */
    cursor?: WorkspaceInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvites.
     */
    distinct?: WorkspaceInviteScalarFieldEnum | WorkspaceInviteScalarFieldEnum[]
  }

  /**
   * WorkspaceInvite findMany
   */
  export type WorkspaceInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceInvites to fetch.
     */
    where?: WorkspaceInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceInvites to fetch.
     */
    orderBy?: WorkspaceInviteOrderByWithRelationInput | WorkspaceInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceInvites.
     */
    cursor?: WorkspaceInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceInvites.
     */
    distinct?: WorkspaceInviteScalarFieldEnum | WorkspaceInviteScalarFieldEnum[]
  }

  /**
   * WorkspaceInvite create
   */
  export type WorkspaceInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceInvite.
     */
    data: XOR<WorkspaceInviteCreateInput, WorkspaceInviteUncheckedCreateInput>
  }

  /**
   * WorkspaceInvite createMany
   */
  export type WorkspaceInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceInvites.
     */
    data: WorkspaceInviteCreateManyInput | WorkspaceInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceInvite createManyAndReturn
   */
  export type WorkspaceInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * The data used to create many WorkspaceInvites.
     */
    data: WorkspaceInviteCreateManyInput | WorkspaceInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceInvite update
   */
  export type WorkspaceInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceInvite.
     */
    data: XOR<WorkspaceInviteUpdateInput, WorkspaceInviteUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceInvite to update.
     */
    where: WorkspaceInviteWhereUniqueInput
  }

  /**
   * WorkspaceInvite updateMany
   */
  export type WorkspaceInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceInvites.
     */
    data: XOR<WorkspaceInviteUpdateManyMutationInput, WorkspaceInviteUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceInvites to update
     */
    where?: WorkspaceInviteWhereInput
    /**
     * Limit how many WorkspaceInvites to update.
     */
    limit?: number
  }

  /**
   * WorkspaceInvite updateManyAndReturn
   */
  export type WorkspaceInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * The data used to update WorkspaceInvites.
     */
    data: XOR<WorkspaceInviteUpdateManyMutationInput, WorkspaceInviteUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceInvites to update
     */
    where?: WorkspaceInviteWhereInput
    /**
     * Limit how many WorkspaceInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceInvite upsert
   */
  export type WorkspaceInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceInvite to update in case it exists.
     */
    where: WorkspaceInviteWhereUniqueInput
    /**
     * In case the WorkspaceInvite found by the `where` argument doesn't exist, create a new WorkspaceInvite with this data.
     */
    create: XOR<WorkspaceInviteCreateInput, WorkspaceInviteUncheckedCreateInput>
    /**
     * In case the WorkspaceInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceInviteUpdateInput, WorkspaceInviteUncheckedUpdateInput>
  }

  /**
   * WorkspaceInvite delete
   */
  export type WorkspaceInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceInvite to delete.
     */
    where: WorkspaceInviteWhereUniqueInput
  }

  /**
   * WorkspaceInvite deleteMany
   */
  export type WorkspaceInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceInvites to delete
     */
    where?: WorkspaceInviteWhereInput
    /**
     * Limit how many WorkspaceInvites to delete.
     */
    limit?: number
  }

  /**
   * WorkspaceInvite without action
   */
  export type WorkspaceInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceInvite
     */
    select?: WorkspaceInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkspaceInvite
     */
    omit?: WorkspaceInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInviteInclude<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageAvgAggregateOutputType = {
    ydocSeq: number | null
    version: number | null
  }

  export type PageSumAggregateOutputType = {
    ydocSeq: bigint | null
    version: number | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    content: string | null
    icon: string | null
    coverImage: string | null
    workspaceId: string | null
    createdById: string | null
    parentId: string | null
    shareType: string | null
    shareToken: string | null
    ydoc: Bytes | null
    ydocSeq: bigint | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    content: string | null
    icon: string | null
    coverImage: string | null
    workspaceId: string | null
    createdById: string | null
    parentId: string | null
    shareType: string | null
    shareToken: string | null
    ydoc: Bytes | null
    ydocSeq: bigint | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    content: number
    icon: number
    coverImage: number
    workspaceId: number
    createdById: number
    parentId: number
    shareType: number
    shareToken: number
    ydoc: number
    ydocSeq: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageAvgAggregateInputType = {
    ydocSeq?: true
    version?: true
  }

  export type PageSumAggregateInputType = {
    ydocSeq?: true
    version?: true
  }

  export type PageMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    icon?: true
    coverImage?: true
    workspaceId?: true
    createdById?: true
    parentId?: true
    shareType?: true
    shareToken?: true
    ydoc?: true
    ydocSeq?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    icon?: true
    coverImage?: true
    workspaceId?: true
    createdById?: true
    parentId?: true
    shareType?: true
    shareToken?: true
    ydoc?: true
    ydocSeq?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    icon?: true
    coverImage?: true
    workspaceId?: true
    createdById?: true
    parentId?: true
    shareType?: true
    shareToken?: true
    ydoc?: true
    ydocSeq?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _avg?: PageAvgAggregateInputType
    _sum?: PageSumAggregateInputType
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: string
    title: string
    slug: string
    content: string | null
    icon: string | null
    coverImage: string | null
    workspaceId: string
    createdById: string | null
    parentId: string | null
    shareType: string
    shareToken: string | null
    ydoc: Bytes | null
    ydocSeq: bigint
    version: number
    createdAt: Date
    updatedAt: Date
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    icon?: boolean
    coverImage?: boolean
    workspaceId?: boolean
    createdById?: boolean
    parentId?: boolean
    shareType?: boolean
    shareToken?: boolean
    ydoc?: boolean
    ydocSeq?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
    children?: boolean | Page$childrenArgs<ExtArgs>
    updates?: boolean | Page$updatesArgs<ExtArgs>
    presence?: boolean | Page$presenceArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    icon?: boolean
    coverImage?: boolean
    workspaceId?: boolean
    createdById?: boolean
    parentId?: boolean
    shareType?: boolean
    shareToken?: boolean
    ydoc?: boolean
    ydocSeq?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    icon?: boolean
    coverImage?: boolean
    workspaceId?: boolean
    createdById?: boolean
    parentId?: boolean
    shareType?: boolean
    shareToken?: boolean
    ydoc?: boolean
    ydocSeq?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    icon?: boolean
    coverImage?: boolean
    workspaceId?: boolean
    createdById?: boolean
    parentId?: boolean
    shareType?: boolean
    shareToken?: boolean
    ydoc?: boolean
    ydocSeq?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "content" | "icon" | "coverImage" | "workspaceId" | "createdById" | "parentId" | "shareType" | "shareToken" | "ydoc" | "ydocSeq" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
    children?: boolean | Page$childrenArgs<ExtArgs>
    updates?: boolean | Page$updatesArgs<ExtArgs>
    presence?: boolean | Page$presenceArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    createdBy?: boolean | Page$createdByArgs<ExtArgs>
    parent?: boolean | Page$parentArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      parent: Prisma.$PagePayload<ExtArgs> | null
      children: Prisma.$PagePayload<ExtArgs>[]
      updates: Prisma.$PageUpdatePayload<ExtArgs>[]
      presence: Prisma.$PagePresencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      content: string | null
      icon: string | null
      coverImage: string | null
      workspaceId: string
      createdById: string | null
      parentId: string | null
      shareType: string
      shareToken: string | null
      ydoc: Prisma.Bytes | null
      ydocSeq: bigint
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends Page$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Page$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parent<T extends Page$parentArgs<ExtArgs> = {}>(args?: Subset<T, Page$parentArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Page$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Page$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updates<T extends Page$updatesArgs<ExtArgs> = {}>(args?: Subset<T, Page$updatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    presence<T extends Page$presenceArgs<ExtArgs> = {}>(args?: Subset<T, Page$presenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'String'>
    readonly title: FieldRef<"Page", 'String'>
    readonly slug: FieldRef<"Page", 'String'>
    readonly content: FieldRef<"Page", 'String'>
    readonly icon: FieldRef<"Page", 'String'>
    readonly coverImage: FieldRef<"Page", 'String'>
    readonly workspaceId: FieldRef<"Page", 'String'>
    readonly createdById: FieldRef<"Page", 'String'>
    readonly parentId: FieldRef<"Page", 'String'>
    readonly shareType: FieldRef<"Page", 'String'>
    readonly shareToken: FieldRef<"Page", 'String'>
    readonly ydoc: FieldRef<"Page", 'Bytes'>
    readonly ydocSeq: FieldRef<"Page", 'BigInt'>
    readonly version: FieldRef<"Page", 'Int'>
    readonly createdAt: FieldRef<"Page", 'DateTime'>
    readonly updatedAt: FieldRef<"Page", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page.createdBy
   */
  export type Page$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Page.parent
   */
  export type Page$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
  }

  /**
   * Page.children
   */
  export type Page$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page.updates
   */
  export type Page$updatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    where?: PageUpdateWhereInput
    orderBy?: PageUpdateOrderByWithRelationInput | PageUpdateOrderByWithRelationInput[]
    cursor?: PageUpdateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageUpdateScalarFieldEnum | PageUpdateScalarFieldEnum[]
  }

  /**
   * Page.presence
   */
  export type Page$presenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    where?: PagePresenceWhereInput
    orderBy?: PagePresenceOrderByWithRelationInput | PagePresenceOrderByWithRelationInput[]
    cursor?: PagePresenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagePresenceScalarFieldEnum | PagePresenceScalarFieldEnum[]
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model PageUpdate
   */

  export type AggregatePageUpdate = {
    _count: PageUpdateCountAggregateOutputType | null
    _avg: PageUpdateAvgAggregateOutputType | null
    _sum: PageUpdateSumAggregateOutputType | null
    _min: PageUpdateMinAggregateOutputType | null
    _max: PageUpdateMaxAggregateOutputType | null
  }

  export type PageUpdateAvgAggregateOutputType = {
    seq: number | null
  }

  export type PageUpdateSumAggregateOutputType = {
    seq: bigint | null
  }

  export type PageUpdateMinAggregateOutputType = {
    seq: bigint | null
    pageId: string | null
    update: Bytes | null
    clientId: string | null
    createdAt: Date | null
  }

  export type PageUpdateMaxAggregateOutputType = {
    seq: bigint | null
    pageId: string | null
    update: Bytes | null
    clientId: string | null
    createdAt: Date | null
  }

  export type PageUpdateCountAggregateOutputType = {
    seq: number
    pageId: number
    update: number
    clientId: number
    createdAt: number
    _all: number
  }


  export type PageUpdateAvgAggregateInputType = {
    seq?: true
  }

  export type PageUpdateSumAggregateInputType = {
    seq?: true
  }

  export type PageUpdateMinAggregateInputType = {
    seq?: true
    pageId?: true
    update?: true
    clientId?: true
    createdAt?: true
  }

  export type PageUpdateMaxAggregateInputType = {
    seq?: true
    pageId?: true
    update?: true
    clientId?: true
    createdAt?: true
  }

  export type PageUpdateCountAggregateInputType = {
    seq?: true
    pageId?: true
    update?: true
    clientId?: true
    createdAt?: true
    _all?: true
  }

  export type PageUpdateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageUpdate to aggregate.
     */
    where?: PageUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageUpdates to fetch.
     */
    orderBy?: PageUpdateOrderByWithRelationInput | PageUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PageUpdates
    **/
    _count?: true | PageUpdateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageUpdateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageUpdateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageUpdateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageUpdateMaxAggregateInputType
  }

  export type GetPageUpdateAggregateType<T extends PageUpdateAggregateArgs> = {
        [P in keyof T & keyof AggregatePageUpdate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePageUpdate[P]>
      : GetScalarType<T[P], AggregatePageUpdate[P]>
  }




  export type PageUpdateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageUpdateWhereInput
    orderBy?: PageUpdateOrderByWithAggregationInput | PageUpdateOrderByWithAggregationInput[]
    by: PageUpdateScalarFieldEnum[] | PageUpdateScalarFieldEnum
    having?: PageUpdateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageUpdateCountAggregateInputType | true
    _avg?: PageUpdateAvgAggregateInputType
    _sum?: PageUpdateSumAggregateInputType
    _min?: PageUpdateMinAggregateInputType
    _max?: PageUpdateMaxAggregateInputType
  }

  export type PageUpdateGroupByOutputType = {
    seq: bigint
    pageId: string
    update: Bytes
    clientId: string
    createdAt: Date
    _count: PageUpdateCountAggregateOutputType | null
    _avg: PageUpdateAvgAggregateOutputType | null
    _sum: PageUpdateSumAggregateOutputType | null
    _min: PageUpdateMinAggregateOutputType | null
    _max: PageUpdateMaxAggregateOutputType | null
  }

  type GetPageUpdateGroupByPayload<T extends PageUpdateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageUpdateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageUpdateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageUpdateGroupByOutputType[P]>
            : GetScalarType<T[P], PageUpdateGroupByOutputType[P]>
        }
      >
    >


  export type PageUpdateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seq?: boolean
    pageId?: boolean
    update?: boolean
    clientId?: boolean
    createdAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageUpdate"]>

  export type PageUpdateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seq?: boolean
    pageId?: boolean
    update?: boolean
    clientId?: boolean
    createdAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageUpdate"]>

  export type PageUpdateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seq?: boolean
    pageId?: boolean
    update?: boolean
    clientId?: boolean
    createdAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageUpdate"]>

  export type PageUpdateSelectScalar = {
    seq?: boolean
    pageId?: boolean
    update?: boolean
    clientId?: boolean
    createdAt?: boolean
  }

  export type PageUpdateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seq" | "pageId" | "update" | "clientId" | "createdAt", ExtArgs["result"]["pageUpdate"]>
  export type PageUpdateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PageUpdateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PageUpdateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }

  export type $PageUpdatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PageUpdate"
    objects: {
      page: Prisma.$PagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      seq: bigint
      pageId: string
      update: Prisma.Bytes
      clientId: string
      createdAt: Date
    }, ExtArgs["result"]["pageUpdate"]>
    composites: {}
  }

  type PageUpdateGetPayload<S extends boolean | null | undefined | PageUpdateDefaultArgs> = $Result.GetResult<Prisma.$PageUpdatePayload, S>

  type PageUpdateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageUpdateCountAggregateInputType | true
    }

  export interface PageUpdateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PageUpdate'], meta: { name: 'PageUpdate' } }
    /**
     * Find zero or one PageUpdate that matches the filter.
     * @param {PageUpdateFindUniqueArgs} args - Arguments to find a PageUpdate
     * @example
     * // Get one PageUpdate
     * const pageUpdate = await prisma.pageUpdate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageUpdateFindUniqueArgs>(args: SelectSubset<T, PageUpdateFindUniqueArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PageUpdate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageUpdateFindUniqueOrThrowArgs} args - Arguments to find a PageUpdate
     * @example
     * // Get one PageUpdate
     * const pageUpdate = await prisma.pageUpdate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageUpdateFindUniqueOrThrowArgs>(args: SelectSubset<T, PageUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageUpdate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateFindFirstArgs} args - Arguments to find a PageUpdate
     * @example
     * // Get one PageUpdate
     * const pageUpdate = await prisma.pageUpdate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageUpdateFindFirstArgs>(args?: SelectSubset<T, PageUpdateFindFirstArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageUpdate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateFindFirstOrThrowArgs} args - Arguments to find a PageUpdate
     * @example
     * // Get one PageUpdate
     * const pageUpdate = await prisma.pageUpdate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageUpdateFindFirstOrThrowArgs>(args?: SelectSubset<T, PageUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PageUpdates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PageUpdates
     * const pageUpdates = await prisma.pageUpdate.findMany()
     * 
     * // Get first 10 PageUpdates
     * const pageUpdates = await prisma.pageUpdate.findMany({ take: 10 })
     * 
     * // Only select the `seq`
     * const pageUpdateWithSeqOnly = await prisma.pageUpdate.findMany({ select: { seq: true } })
     * 
     */
    findMany<T extends PageUpdateFindManyArgs>(args?: SelectSubset<T, PageUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PageUpdate.
     * @param {PageUpdateCreateArgs} args - Arguments to create a PageUpdate.
     * @example
     * // Create one PageUpdate
     * const PageUpdate = await prisma.pageUpdate.create({
     *   data: {
     *     // ... data to create a PageUpdate
     *   }
     * })
     * 
     */
    create<T extends PageUpdateCreateArgs>(args: SelectSubset<T, PageUpdateCreateArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PageUpdates.
     * @param {PageUpdateCreateManyArgs} args - Arguments to create many PageUpdates.
     * @example
     * // Create many PageUpdates
     * const pageUpdate = await prisma.pageUpdate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageUpdateCreateManyArgs>(args?: SelectSubset<T, PageUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PageUpdates and returns the data saved in the database.
     * @param {PageUpdateCreateManyAndReturnArgs} args - Arguments to create many PageUpdates.
     * @example
     * // Create many PageUpdates
     * const pageUpdate = await prisma.pageUpdate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PageUpdates and only return the `seq`
     * const pageUpdateWithSeqOnly = await prisma.pageUpdate.createManyAndReturn({
     *   select: { seq: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageUpdateCreateManyAndReturnArgs>(args?: SelectSubset<T, PageUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PageUpdate.
     * @param {PageUpdateDeleteArgs} args - Arguments to delete one PageUpdate.
     * @example
     * // Delete one PageUpdate
     * const PageUpdate = await prisma.pageUpdate.delete({
     *   where: {
     *     // ... filter to delete one PageUpdate
     *   }
     * })
     * 
     */
    delete<T extends PageUpdateDeleteArgs>(args: SelectSubset<T, PageUpdateDeleteArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PageUpdate.
     * @param {PageUpdateUpdateArgs} args - Arguments to update one PageUpdate.
     * @example
     * // Update one PageUpdate
     * const pageUpdate = await prisma.pageUpdate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateUpdateArgs>(args: SelectSubset<T, PageUpdateUpdateArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PageUpdates.
     * @param {PageUpdateDeleteManyArgs} args - Arguments to filter PageUpdates to delete.
     * @example
     * // Delete a few PageUpdates
     * const { count } = await prisma.pageUpdate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageUpdateDeleteManyArgs>(args?: SelectSubset<T, PageUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PageUpdates
     * const pageUpdate = await prisma.pageUpdate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateUpdateManyArgs>(args: SelectSubset<T, PageUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageUpdates and returns the data updated in the database.
     * @param {PageUpdateUpdateManyAndReturnArgs} args - Arguments to update many PageUpdates.
     * @example
     * // Update many PageUpdates
     * const pageUpdate = await prisma.pageUpdate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PageUpdates and only return the `seq`
     * const pageUpdateWithSeqOnly = await prisma.pageUpdate.updateManyAndReturn({
     *   select: { seq: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PageUpdate.
     * @param {PageUpdateUpsertArgs} args - Arguments to update or create a PageUpdate.
     * @example
     * // Update or create a PageUpdate
     * const pageUpdate = await prisma.pageUpdate.upsert({
     *   create: {
     *     // ... data to create a PageUpdate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PageUpdate we want to update
     *   }
     * })
     */
    upsert<T extends PageUpdateUpsertArgs>(args: SelectSubset<T, PageUpdateUpsertArgs<ExtArgs>>): Prisma__PageUpdateClient<$Result.GetResult<Prisma.$PageUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PageUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateCountArgs} args - Arguments to filter PageUpdates to count.
     * @example
     * // Count the number of PageUpdates
     * const count = await prisma.pageUpdate.count({
     *   where: {
     *     // ... the filter for the PageUpdates we want to count
     *   }
     * })
    **/
    count<T extends PageUpdateCountArgs>(
      args?: Subset<T, PageUpdateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageUpdateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PageUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageUpdateAggregateArgs>(args: Subset<T, PageUpdateAggregateArgs>): Prisma.PrismaPromise<GetPageUpdateAggregateType<T>>

    /**
     * Group by PageUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageUpdateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageUpdateGroupByArgs['orderBy'] }
        : { orderBy?: PageUpdateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PageUpdate model
   */
  readonly fields: PageUpdateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PageUpdate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageUpdateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    page<T extends PageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PageDefaultArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PageUpdate model
   */
  interface PageUpdateFieldRefs {
    readonly seq: FieldRef<"PageUpdate", 'BigInt'>
    readonly pageId: FieldRef<"PageUpdate", 'String'>
    readonly update: FieldRef<"PageUpdate", 'Bytes'>
    readonly clientId: FieldRef<"PageUpdate", 'String'>
    readonly createdAt: FieldRef<"PageUpdate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PageUpdate findUnique
   */
  export type PageUpdateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter, which PageUpdate to fetch.
     */
    where: PageUpdateWhereUniqueInput
  }

  /**
   * PageUpdate findUniqueOrThrow
   */
  export type PageUpdateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter, which PageUpdate to fetch.
     */
    where: PageUpdateWhereUniqueInput
  }

  /**
   * PageUpdate findFirst
   */
  export type PageUpdateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter, which PageUpdate to fetch.
     */
    where?: PageUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageUpdates to fetch.
     */
    orderBy?: PageUpdateOrderByWithRelationInput | PageUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageUpdates.
     */
    cursor?: PageUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageUpdates.
     */
    distinct?: PageUpdateScalarFieldEnum | PageUpdateScalarFieldEnum[]
  }

  /**
   * PageUpdate findFirstOrThrow
   */
  export type PageUpdateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter, which PageUpdate to fetch.
     */
    where?: PageUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageUpdates to fetch.
     */
    orderBy?: PageUpdateOrderByWithRelationInput | PageUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageUpdates.
     */
    cursor?: PageUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageUpdates.
     */
    distinct?: PageUpdateScalarFieldEnum | PageUpdateScalarFieldEnum[]
  }

  /**
   * PageUpdate findMany
   */
  export type PageUpdateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter, which PageUpdates to fetch.
     */
    where?: PageUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageUpdates to fetch.
     */
    orderBy?: PageUpdateOrderByWithRelationInput | PageUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PageUpdates.
     */
    cursor?: PageUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageUpdates.
     */
    distinct?: PageUpdateScalarFieldEnum | PageUpdateScalarFieldEnum[]
  }

  /**
   * PageUpdate create
   */
  export type PageUpdateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * The data needed to create a PageUpdate.
     */
    data: XOR<PageUpdateCreateInput, PageUpdateUncheckedCreateInput>
  }

  /**
   * PageUpdate createMany
   */
  export type PageUpdateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PageUpdates.
     */
    data: PageUpdateCreateManyInput | PageUpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PageUpdate createManyAndReturn
   */
  export type PageUpdateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * The data used to create many PageUpdates.
     */
    data: PageUpdateCreateManyInput | PageUpdateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PageUpdate update
   */
  export type PageUpdateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * The data needed to update a PageUpdate.
     */
    data: XOR<PageUpdateUpdateInput, PageUpdateUncheckedUpdateInput>
    /**
     * Choose, which PageUpdate to update.
     */
    where: PageUpdateWhereUniqueInput
  }

  /**
   * PageUpdate updateMany
   */
  export type PageUpdateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PageUpdates.
     */
    data: XOR<PageUpdateUpdateManyMutationInput, PageUpdateUncheckedUpdateManyInput>
    /**
     * Filter which PageUpdates to update
     */
    where?: PageUpdateWhereInput
    /**
     * Limit how many PageUpdates to update.
     */
    limit?: number
  }

  /**
   * PageUpdate updateManyAndReturn
   */
  export type PageUpdateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * The data used to update PageUpdates.
     */
    data: XOR<PageUpdateUpdateManyMutationInput, PageUpdateUncheckedUpdateManyInput>
    /**
     * Filter which PageUpdates to update
     */
    where?: PageUpdateWhereInput
    /**
     * Limit how many PageUpdates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PageUpdate upsert
   */
  export type PageUpdateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * The filter to search for the PageUpdate to update in case it exists.
     */
    where: PageUpdateWhereUniqueInput
    /**
     * In case the PageUpdate found by the `where` argument doesn't exist, create a new PageUpdate with this data.
     */
    create: XOR<PageUpdateCreateInput, PageUpdateUncheckedCreateInput>
    /**
     * In case the PageUpdate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateUpdateInput, PageUpdateUncheckedUpdateInput>
  }

  /**
   * PageUpdate delete
   */
  export type PageUpdateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
    /**
     * Filter which PageUpdate to delete.
     */
    where: PageUpdateWhereUniqueInput
  }

  /**
   * PageUpdate deleteMany
   */
  export type PageUpdateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageUpdates to delete
     */
    where?: PageUpdateWhereInput
    /**
     * Limit how many PageUpdates to delete.
     */
    limit?: number
  }

  /**
   * PageUpdate without action
   */
  export type PageUpdateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageUpdate
     */
    select?: PageUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageUpdate
     */
    omit?: PageUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageUpdateInclude<ExtArgs> | null
  }


  /**
   * Model PagePresence
   */

  export type AggregatePagePresence = {
    _count: PagePresenceCountAggregateOutputType | null
    _min: PagePresenceMinAggregateOutputType | null
    _max: PagePresenceMaxAggregateOutputType | null
  }

  export type PagePresenceMinAggregateOutputType = {
    id: string | null
    pageId: string | null
    userId: string | null
    name: string | null
    color: string | null
    updatedAt: Date | null
  }

  export type PagePresenceMaxAggregateOutputType = {
    id: string | null
    pageId: string | null
    userId: string | null
    name: string | null
    color: string | null
    updatedAt: Date | null
  }

  export type PagePresenceCountAggregateOutputType = {
    id: number
    pageId: number
    userId: number
    name: number
    color: number
    updatedAt: number
    _all: number
  }


  export type PagePresenceMinAggregateInputType = {
    id?: true
    pageId?: true
    userId?: true
    name?: true
    color?: true
    updatedAt?: true
  }

  export type PagePresenceMaxAggregateInputType = {
    id?: true
    pageId?: true
    userId?: true
    name?: true
    color?: true
    updatedAt?: true
  }

  export type PagePresenceCountAggregateInputType = {
    id?: true
    pageId?: true
    userId?: true
    name?: true
    color?: true
    updatedAt?: true
    _all?: true
  }

  export type PagePresenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PagePresence to aggregate.
     */
    where?: PagePresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagePresences to fetch.
     */
    orderBy?: PagePresenceOrderByWithRelationInput | PagePresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagePresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagePresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagePresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PagePresences
    **/
    _count?: true | PagePresenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagePresenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagePresenceMaxAggregateInputType
  }

  export type GetPagePresenceAggregateType<T extends PagePresenceAggregateArgs> = {
        [P in keyof T & keyof AggregatePagePresence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagePresence[P]>
      : GetScalarType<T[P], AggregatePagePresence[P]>
  }




  export type PagePresenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagePresenceWhereInput
    orderBy?: PagePresenceOrderByWithAggregationInput | PagePresenceOrderByWithAggregationInput[]
    by: PagePresenceScalarFieldEnum[] | PagePresenceScalarFieldEnum
    having?: PagePresenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagePresenceCountAggregateInputType | true
    _min?: PagePresenceMinAggregateInputType
    _max?: PagePresenceMaxAggregateInputType
  }

  export type PagePresenceGroupByOutputType = {
    id: string
    pageId: string
    userId: string
    name: string
    color: string
    updatedAt: Date
    _count: PagePresenceCountAggregateOutputType | null
    _min: PagePresenceMinAggregateOutputType | null
    _max: PagePresenceMaxAggregateOutputType | null
  }

  type GetPagePresenceGroupByPayload<T extends PagePresenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagePresenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagePresenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagePresenceGroupByOutputType[P]>
            : GetScalarType<T[P], PagePresenceGroupByOutputType[P]>
        }
      >
    >


  export type PagePresenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageId?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    updatedAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagePresence"]>

  export type PagePresenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageId?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    updatedAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagePresence"]>

  export type PagePresenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageId?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    updatedAt?: boolean
    page?: boolean | PageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagePresence"]>

  export type PagePresenceSelectScalar = {
    id?: boolean
    pageId?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    updatedAt?: boolean
  }

  export type PagePresenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageId" | "userId" | "name" | "color" | "updatedAt", ExtArgs["result"]["pagePresence"]>
  export type PagePresenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PagePresenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }
  export type PagePresenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    page?: boolean | PageDefaultArgs<ExtArgs>
  }

  export type $PagePresencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PagePresence"
    objects: {
      page: Prisma.$PagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageId: string
      userId: string
      name: string
      color: string
      updatedAt: Date
    }, ExtArgs["result"]["pagePresence"]>
    composites: {}
  }

  type PagePresenceGetPayload<S extends boolean | null | undefined | PagePresenceDefaultArgs> = $Result.GetResult<Prisma.$PagePresencePayload, S>

  type PagePresenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagePresenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagePresenceCountAggregateInputType | true
    }

  export interface PagePresenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PagePresence'], meta: { name: 'PagePresence' } }
    /**
     * Find zero or one PagePresence that matches the filter.
     * @param {PagePresenceFindUniqueArgs} args - Arguments to find a PagePresence
     * @example
     * // Get one PagePresence
     * const pagePresence = await prisma.pagePresence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagePresenceFindUniqueArgs>(args: SelectSubset<T, PagePresenceFindUniqueArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PagePresence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagePresenceFindUniqueOrThrowArgs} args - Arguments to find a PagePresence
     * @example
     * // Get one PagePresence
     * const pagePresence = await prisma.pagePresence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagePresenceFindUniqueOrThrowArgs>(args: SelectSubset<T, PagePresenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PagePresence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceFindFirstArgs} args - Arguments to find a PagePresence
     * @example
     * // Get one PagePresence
     * const pagePresence = await prisma.pagePresence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagePresenceFindFirstArgs>(args?: SelectSubset<T, PagePresenceFindFirstArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PagePresence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceFindFirstOrThrowArgs} args - Arguments to find a PagePresence
     * @example
     * // Get one PagePresence
     * const pagePresence = await prisma.pagePresence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagePresenceFindFirstOrThrowArgs>(args?: SelectSubset<T, PagePresenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PagePresences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PagePresences
     * const pagePresences = await prisma.pagePresence.findMany()
     * 
     * // Get first 10 PagePresences
     * const pagePresences = await prisma.pagePresence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagePresenceWithIdOnly = await prisma.pagePresence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagePresenceFindManyArgs>(args?: SelectSubset<T, PagePresenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PagePresence.
     * @param {PagePresenceCreateArgs} args - Arguments to create a PagePresence.
     * @example
     * // Create one PagePresence
     * const PagePresence = await prisma.pagePresence.create({
     *   data: {
     *     // ... data to create a PagePresence
     *   }
     * })
     * 
     */
    create<T extends PagePresenceCreateArgs>(args: SelectSubset<T, PagePresenceCreateArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PagePresences.
     * @param {PagePresenceCreateManyArgs} args - Arguments to create many PagePresences.
     * @example
     * // Create many PagePresences
     * const pagePresence = await prisma.pagePresence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagePresenceCreateManyArgs>(args?: SelectSubset<T, PagePresenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PagePresences and returns the data saved in the database.
     * @param {PagePresenceCreateManyAndReturnArgs} args - Arguments to create many PagePresences.
     * @example
     * // Create many PagePresences
     * const pagePresence = await prisma.pagePresence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PagePresences and only return the `id`
     * const pagePresenceWithIdOnly = await prisma.pagePresence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagePresenceCreateManyAndReturnArgs>(args?: SelectSubset<T, PagePresenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PagePresence.
     * @param {PagePresenceDeleteArgs} args - Arguments to delete one PagePresence.
     * @example
     * // Delete one PagePresence
     * const PagePresence = await prisma.pagePresence.delete({
     *   where: {
     *     // ... filter to delete one PagePresence
     *   }
     * })
     * 
     */
    delete<T extends PagePresenceDeleteArgs>(args: SelectSubset<T, PagePresenceDeleteArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PagePresence.
     * @param {PagePresenceUpdateArgs} args - Arguments to update one PagePresence.
     * @example
     * // Update one PagePresence
     * const pagePresence = await prisma.pagePresence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagePresenceUpdateArgs>(args: SelectSubset<T, PagePresenceUpdateArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PagePresences.
     * @param {PagePresenceDeleteManyArgs} args - Arguments to filter PagePresences to delete.
     * @example
     * // Delete a few PagePresences
     * const { count } = await prisma.pagePresence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagePresenceDeleteManyArgs>(args?: SelectSubset<T, PagePresenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PagePresences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PagePresences
     * const pagePresence = await prisma.pagePresence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagePresenceUpdateManyArgs>(args: SelectSubset<T, PagePresenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PagePresences and returns the data updated in the database.
     * @param {PagePresenceUpdateManyAndReturnArgs} args - Arguments to update many PagePresences.
     * @example
     * // Update many PagePresences
     * const pagePresence = await prisma.pagePresence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PagePresences and only return the `id`
     * const pagePresenceWithIdOnly = await prisma.pagePresence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PagePresenceUpdateManyAndReturnArgs>(args: SelectSubset<T, PagePresenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PagePresence.
     * @param {PagePresenceUpsertArgs} args - Arguments to update or create a PagePresence.
     * @example
     * // Update or create a PagePresence
     * const pagePresence = await prisma.pagePresence.upsert({
     *   create: {
     *     // ... data to create a PagePresence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PagePresence we want to update
     *   }
     * })
     */
    upsert<T extends PagePresenceUpsertArgs>(args: SelectSubset<T, PagePresenceUpsertArgs<ExtArgs>>): Prisma__PagePresenceClient<$Result.GetResult<Prisma.$PagePresencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PagePresences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceCountArgs} args - Arguments to filter PagePresences to count.
     * @example
     * // Count the number of PagePresences
     * const count = await prisma.pagePresence.count({
     *   where: {
     *     // ... the filter for the PagePresences we want to count
     *   }
     * })
    **/
    count<T extends PagePresenceCountArgs>(
      args?: Subset<T, PagePresenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagePresenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PagePresence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagePresenceAggregateArgs>(args: Subset<T, PagePresenceAggregateArgs>): Prisma.PrismaPromise<GetPagePresenceAggregateType<T>>

    /**
     * Group by PagePresence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagePresenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagePresenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagePresenceGroupByArgs['orderBy'] }
        : { orderBy?: PagePresenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagePresenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagePresenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PagePresence model
   */
  readonly fields: PagePresenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PagePresence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagePresenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    page<T extends PageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PageDefaultArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PagePresence model
   */
  interface PagePresenceFieldRefs {
    readonly id: FieldRef<"PagePresence", 'String'>
    readonly pageId: FieldRef<"PagePresence", 'String'>
    readonly userId: FieldRef<"PagePresence", 'String'>
    readonly name: FieldRef<"PagePresence", 'String'>
    readonly color: FieldRef<"PagePresence", 'String'>
    readonly updatedAt: FieldRef<"PagePresence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PagePresence findUnique
   */
  export type PagePresenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter, which PagePresence to fetch.
     */
    where: PagePresenceWhereUniqueInput
  }

  /**
   * PagePresence findUniqueOrThrow
   */
  export type PagePresenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter, which PagePresence to fetch.
     */
    where: PagePresenceWhereUniqueInput
  }

  /**
   * PagePresence findFirst
   */
  export type PagePresenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter, which PagePresence to fetch.
     */
    where?: PagePresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagePresences to fetch.
     */
    orderBy?: PagePresenceOrderByWithRelationInput | PagePresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PagePresences.
     */
    cursor?: PagePresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagePresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagePresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PagePresences.
     */
    distinct?: PagePresenceScalarFieldEnum | PagePresenceScalarFieldEnum[]
  }

  /**
   * PagePresence findFirstOrThrow
   */
  export type PagePresenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter, which PagePresence to fetch.
     */
    where?: PagePresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagePresences to fetch.
     */
    orderBy?: PagePresenceOrderByWithRelationInput | PagePresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PagePresences.
     */
    cursor?: PagePresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagePresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagePresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PagePresences.
     */
    distinct?: PagePresenceScalarFieldEnum | PagePresenceScalarFieldEnum[]
  }

  /**
   * PagePresence findMany
   */
  export type PagePresenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter, which PagePresences to fetch.
     */
    where?: PagePresenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagePresences to fetch.
     */
    orderBy?: PagePresenceOrderByWithRelationInput | PagePresenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PagePresences.
     */
    cursor?: PagePresenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagePresences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagePresences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PagePresences.
     */
    distinct?: PagePresenceScalarFieldEnum | PagePresenceScalarFieldEnum[]
  }

  /**
   * PagePresence create
   */
  export type PagePresenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * The data needed to create a PagePresence.
     */
    data: XOR<PagePresenceCreateInput, PagePresenceUncheckedCreateInput>
  }

  /**
   * PagePresence createMany
   */
  export type PagePresenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PagePresences.
     */
    data: PagePresenceCreateManyInput | PagePresenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PagePresence createManyAndReturn
   */
  export type PagePresenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * The data used to create many PagePresences.
     */
    data: PagePresenceCreateManyInput | PagePresenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PagePresence update
   */
  export type PagePresenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * The data needed to update a PagePresence.
     */
    data: XOR<PagePresenceUpdateInput, PagePresenceUncheckedUpdateInput>
    /**
     * Choose, which PagePresence to update.
     */
    where: PagePresenceWhereUniqueInput
  }

  /**
   * PagePresence updateMany
   */
  export type PagePresenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PagePresences.
     */
    data: XOR<PagePresenceUpdateManyMutationInput, PagePresenceUncheckedUpdateManyInput>
    /**
     * Filter which PagePresences to update
     */
    where?: PagePresenceWhereInput
    /**
     * Limit how many PagePresences to update.
     */
    limit?: number
  }

  /**
   * PagePresence updateManyAndReturn
   */
  export type PagePresenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * The data used to update PagePresences.
     */
    data: XOR<PagePresenceUpdateManyMutationInput, PagePresenceUncheckedUpdateManyInput>
    /**
     * Filter which PagePresences to update
     */
    where?: PagePresenceWhereInput
    /**
     * Limit how many PagePresences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PagePresence upsert
   */
  export type PagePresenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * The filter to search for the PagePresence to update in case it exists.
     */
    where: PagePresenceWhereUniqueInput
    /**
     * In case the PagePresence found by the `where` argument doesn't exist, create a new PagePresence with this data.
     */
    create: XOR<PagePresenceCreateInput, PagePresenceUncheckedCreateInput>
    /**
     * In case the PagePresence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagePresenceUpdateInput, PagePresenceUncheckedUpdateInput>
  }

  /**
   * PagePresence delete
   */
  export type PagePresenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
    /**
     * Filter which PagePresence to delete.
     */
    where: PagePresenceWhereUniqueInput
  }

  /**
   * PagePresence deleteMany
   */
  export type PagePresenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PagePresences to delete
     */
    where?: PagePresenceWhereInput
    /**
     * Limit how many PagePresences to delete.
     */
    limit?: number
  }

  /**
   * PagePresence without action
   */
  export type PagePresenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagePresence
     */
    select?: PagePresenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PagePresence
     */
    omit?: PagePresenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagePresenceInclude<ExtArgs> | null
  }


  /**
   * Model ApiToken
   */

  export type AggregateApiToken = {
    _count: ApiTokenCountAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  export type ApiTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    tokenHash: string | null
    prefix: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type ApiTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    tokenHash: string | null
    prefix: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type ApiTokenCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    tokenHash: number
    prefix: number
    lastUsedAt: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type ApiTokenMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    tokenHash?: true
    prefix?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type ApiTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    tokenHash?: true
    prefix?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type ApiTokenCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    tokenHash?: true
    prefix?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ApiTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiToken to aggregate.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiTokens
    **/
    _count?: true | ApiTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiTokenMaxAggregateInputType
  }

  export type GetApiTokenAggregateType<T extends ApiTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateApiToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiToken[P]>
      : GetScalarType<T[P], AggregateApiToken[P]>
  }




  export type ApiTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithAggregationInput | ApiTokenOrderByWithAggregationInput[]
    by: ApiTokenScalarFieldEnum[] | ApiTokenScalarFieldEnum
    having?: ApiTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiTokenCountAggregateInputType | true
    _min?: ApiTokenMinAggregateInputType
    _max?: ApiTokenMaxAggregateInputType
  }

  export type ApiTokenGroupByOutputType = {
    id: string
    userId: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    _count: ApiTokenCountAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  type GetApiTokenGroupByPayload<T extends ApiTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
        }
      >
    >


  export type ApiTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    tokenHash?: boolean
    prefix?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    tokenHash?: boolean
    prefix?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    tokenHash?: boolean
    prefix?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    tokenHash?: boolean
    prefix?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type ApiTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "tokenHash" | "prefix" | "lastUsedAt" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["apiToken"]>
  export type ApiTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApiTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      tokenHash: string
      prefix: string
      lastUsedAt: Date | null
      expiresAt: Date | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["apiToken"]>
    composites: {}
  }

  type ApiTokenGetPayload<S extends boolean | null | undefined | ApiTokenDefaultArgs> = $Result.GetResult<Prisma.$ApiTokenPayload, S>

  type ApiTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiTokenCountAggregateInputType | true
    }

  export interface ApiTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiToken'], meta: { name: 'ApiToken' } }
    /**
     * Find zero or one ApiToken that matches the filter.
     * @param {ApiTokenFindUniqueArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiTokenFindUniqueArgs>(args: SelectSubset<T, ApiTokenFindUniqueArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiTokenFindUniqueOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiTokenFindFirstArgs>(args?: SelectSubset<T, ApiTokenFindFirstArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiTokens
     * const apiTokens = await prisma.apiToken.findMany()
     * 
     * // Get first 10 ApiTokens
     * const apiTokens = await prisma.apiToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiTokenFindManyArgs>(args?: SelectSubset<T, ApiTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiToken.
     * @param {ApiTokenCreateArgs} args - Arguments to create a ApiToken.
     * @example
     * // Create one ApiToken
     * const ApiToken = await prisma.apiToken.create({
     *   data: {
     *     // ... data to create a ApiToken
     *   }
     * })
     * 
     */
    create<T extends ApiTokenCreateArgs>(args: SelectSubset<T, ApiTokenCreateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiTokens.
     * @param {ApiTokenCreateManyArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiTokenCreateManyArgs>(args?: SelectSubset<T, ApiTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiTokens and returns the data saved in the database.
     * @param {ApiTokenCreateManyAndReturnArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiToken.
     * @param {ApiTokenDeleteArgs} args - Arguments to delete one ApiToken.
     * @example
     * // Delete one ApiToken
     * const ApiToken = await prisma.apiToken.delete({
     *   where: {
     *     // ... filter to delete one ApiToken
     *   }
     * })
     * 
     */
    delete<T extends ApiTokenDeleteArgs>(args: SelectSubset<T, ApiTokenDeleteArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiToken.
     * @param {ApiTokenUpdateArgs} args - Arguments to update one ApiToken.
     * @example
     * // Update one ApiToken
     * const apiToken = await prisma.apiToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiTokenUpdateArgs>(args: SelectSubset<T, ApiTokenUpdateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiTokens.
     * @param {ApiTokenDeleteManyArgs} args - Arguments to filter ApiTokens to delete.
     * @example
     * // Delete a few ApiTokens
     * const { count } = await prisma.apiToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiTokenDeleteManyArgs>(args?: SelectSubset<T, ApiTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiTokenUpdateManyArgs>(args: SelectSubset<T, ApiTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens and returns the data updated in the database.
     * @param {ApiTokenUpdateManyAndReturnArgs} args - Arguments to update many ApiTokens.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiToken.
     * @param {ApiTokenUpsertArgs} args - Arguments to update or create a ApiToken.
     * @example
     * // Update or create a ApiToken
     * const apiToken = await prisma.apiToken.upsert({
     *   create: {
     *     // ... data to create a ApiToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiToken we want to update
     *   }
     * })
     */
    upsert<T extends ApiTokenUpsertArgs>(args: SelectSubset<T, ApiTokenUpsertArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenCountArgs} args - Arguments to filter ApiTokens to count.
     * @example
     * // Count the number of ApiTokens
     * const count = await prisma.apiToken.count({
     *   where: {
     *     // ... the filter for the ApiTokens we want to count
     *   }
     * })
    **/
    count<T extends ApiTokenCountArgs>(
      args?: Subset<T, ApiTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiTokenAggregateArgs>(args: Subset<T, ApiTokenAggregateArgs>): Prisma.PrismaPromise<GetApiTokenAggregateType<T>>

    /**
     * Group by ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiTokenGroupByArgs['orderBy'] }
        : { orderBy?: ApiTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiToken model
   */
  readonly fields: ApiTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiToken model
   */
  interface ApiTokenFieldRefs {
    readonly id: FieldRef<"ApiToken", 'String'>
    readonly userId: FieldRef<"ApiToken", 'String'>
    readonly name: FieldRef<"ApiToken", 'String'>
    readonly tokenHash: FieldRef<"ApiToken", 'String'>
    readonly prefix: FieldRef<"ApiToken", 'String'>
    readonly lastUsedAt: FieldRef<"ApiToken", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiToken", 'DateTime'>
    readonly revokedAt: FieldRef<"ApiToken", 'DateTime'>
    readonly createdAt: FieldRef<"ApiToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiToken findUnique
   */
  export type ApiTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findUniqueOrThrow
   */
  export type ApiTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findFirst
   */
  export type ApiTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findFirstOrThrow
   */
  export type ApiTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findMany
   */
  export type ApiTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiTokens to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken create
   */
  export type ApiTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiToken.
     */
    data: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
  }

  /**
   * ApiToken createMany
   */
  export type ApiTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiToken createManyAndReturn
   */
  export type ApiTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken update
   */
  export type ApiTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiToken.
     */
    data: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
    /**
     * Choose, which ApiToken to update.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken updateMany
   */
  export type ApiTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
  }

  /**
   * ApiToken updateManyAndReturn
   */
  export type ApiTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken upsert
   */
  export type ApiTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiToken to update in case it exists.
     */
    where: ApiTokenWhereUniqueInput
    /**
     * In case the ApiToken found by the `where` argument doesn't exist, create a new ApiToken with this data.
     */
    create: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
    /**
     * In case the ApiToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
  }

  /**
   * ApiToken delete
   */
  export type ApiTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter which ApiToken to delete.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken deleteMany
   */
  export type ApiTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiTokens to delete
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to delete.
     */
    limit?: number
  }

  /**
   * ApiToken without action
   */
  export type ApiTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
  }


  /**
   * Model OAuthClient
   */

  export type AggregateOAuthClient = {
    _count: OAuthClientCountAggregateOutputType | null
    _min: OAuthClientMinAggregateOutputType | null
    _max: OAuthClientMaxAggregateOutputType | null
  }

  export type OAuthClientMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    clientSecretHash: string | null
    name: string | null
    tokenEndpointAuthMethod: string | null
    clientUri: string | null
    logoUri: string | null
    createdAt: Date | null
  }

  export type OAuthClientMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    clientSecretHash: string | null
    name: string | null
    tokenEndpointAuthMethod: string | null
    clientUri: string | null
    logoUri: string | null
    createdAt: Date | null
  }

  export type OAuthClientCountAggregateOutputType = {
    id: number
    clientId: number
    clientSecretHash: number
    name: number
    redirectUris: number
    grantTypes: number
    scopes: number
    tokenEndpointAuthMethod: number
    clientUri: number
    logoUri: number
    createdAt: number
    _all: number
  }


  export type OAuthClientMinAggregateInputType = {
    id?: true
    clientId?: true
    clientSecretHash?: true
    name?: true
    tokenEndpointAuthMethod?: true
    clientUri?: true
    logoUri?: true
    createdAt?: true
  }

  export type OAuthClientMaxAggregateInputType = {
    id?: true
    clientId?: true
    clientSecretHash?: true
    name?: true
    tokenEndpointAuthMethod?: true
    clientUri?: true
    logoUri?: true
    createdAt?: true
  }

  export type OAuthClientCountAggregateInputType = {
    id?: true
    clientId?: true
    clientSecretHash?: true
    name?: true
    redirectUris?: true
    grantTypes?: true
    scopes?: true
    tokenEndpointAuthMethod?: true
    clientUri?: true
    logoUri?: true
    createdAt?: true
    _all?: true
  }

  export type OAuthClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthClient to aggregate.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthClients
    **/
    _count?: true | OAuthClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthClientMaxAggregateInputType
  }

  export type GetOAuthClientAggregateType<T extends OAuthClientAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthClient[P]>
      : GetScalarType<T[P], AggregateOAuthClient[P]>
  }




  export type OAuthClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthClientWhereInput
    orderBy?: OAuthClientOrderByWithAggregationInput | OAuthClientOrderByWithAggregationInput[]
    by: OAuthClientScalarFieldEnum[] | OAuthClientScalarFieldEnum
    having?: OAuthClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthClientCountAggregateInputType | true
    _min?: OAuthClientMinAggregateInputType
    _max?: OAuthClientMaxAggregateInputType
  }

  export type OAuthClientGroupByOutputType = {
    id: string
    clientId: string
    clientSecretHash: string | null
    name: string
    redirectUris: string[]
    grantTypes: string[]
    scopes: string[]
    tokenEndpointAuthMethod: string
    clientUri: string | null
    logoUri: string | null
    createdAt: Date
    _count: OAuthClientCountAggregateOutputType | null
    _min: OAuthClientMinAggregateOutputType | null
    _max: OAuthClientMaxAggregateOutputType | null
  }

  type GetOAuthClientGroupByPayload<T extends OAuthClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthClientGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthClientGroupByOutputType[P]>
        }
      >
    >


  export type OAuthClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    name?: boolean
    redirectUris?: boolean
    grantTypes?: boolean
    scopes?: boolean
    tokenEndpointAuthMethod?: boolean
    clientUri?: boolean
    logoUri?: boolean
    createdAt?: boolean
    codes?: boolean | OAuthClient$codesArgs<ExtArgs>
    tokens?: boolean | OAuthClient$tokensArgs<ExtArgs>
    _count?: boolean | OAuthClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    name?: boolean
    redirectUris?: boolean
    grantTypes?: boolean
    scopes?: boolean
    tokenEndpointAuthMethod?: boolean
    clientUri?: boolean
    logoUri?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    name?: boolean
    redirectUris?: boolean
    grantTypes?: boolean
    scopes?: boolean
    tokenEndpointAuthMethod?: boolean
    clientUri?: boolean
    logoUri?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectScalar = {
    id?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    name?: boolean
    redirectUris?: boolean
    grantTypes?: boolean
    scopes?: boolean
    tokenEndpointAuthMethod?: boolean
    clientUri?: boolean
    logoUri?: boolean
    createdAt?: boolean
  }

  export type OAuthClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "clientSecretHash" | "name" | "redirectUris" | "grantTypes" | "scopes" | "tokenEndpointAuthMethod" | "clientUri" | "logoUri" | "createdAt", ExtArgs["result"]["oAuthClient"]>
  export type OAuthClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    codes?: boolean | OAuthClient$codesArgs<ExtArgs>
    tokens?: boolean | OAuthClient$tokensArgs<ExtArgs>
    _count?: boolean | OAuthClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OAuthClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OAuthClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OAuthClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthClient"
    objects: {
      codes: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>[]
      tokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      /**
       * Only set for confidential clients. Browser chats register as public and rely on PKCE.
       */
      clientSecretHash: string | null
      name: string
      redirectUris: string[]
      grantTypes: string[]
      scopes: string[]
      tokenEndpointAuthMethod: string
      clientUri: string | null
      logoUri: string | null
      createdAt: Date
    }, ExtArgs["result"]["oAuthClient"]>
    composites: {}
  }

  type OAuthClientGetPayload<S extends boolean | null | undefined | OAuthClientDefaultArgs> = $Result.GetResult<Prisma.$OAuthClientPayload, S>

  type OAuthClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthClientCountAggregateInputType | true
    }

  export interface OAuthClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthClient'], meta: { name: 'OAuthClient' } }
    /**
     * Find zero or one OAuthClient that matches the filter.
     * @param {OAuthClientFindUniqueArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthClientFindUniqueArgs>(args: SelectSubset<T, OAuthClientFindUniqueArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthClientFindUniqueOrThrowArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthClientFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindFirstArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthClientFindFirstArgs>(args?: SelectSubset<T, OAuthClientFindFirstArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindFirstOrThrowArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthClientFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthClients
     * const oAuthClients = await prisma.oAuthClient.findMany()
     * 
     * // Get first 10 OAuthClients
     * const oAuthClients = await prisma.oAuthClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthClientFindManyArgs>(args?: SelectSubset<T, OAuthClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthClient.
     * @param {OAuthClientCreateArgs} args - Arguments to create a OAuthClient.
     * @example
     * // Create one OAuthClient
     * const OAuthClient = await prisma.oAuthClient.create({
     *   data: {
     *     // ... data to create a OAuthClient
     *   }
     * })
     * 
     */
    create<T extends OAuthClientCreateArgs>(args: SelectSubset<T, OAuthClientCreateArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthClients.
     * @param {OAuthClientCreateManyArgs} args - Arguments to create many OAuthClients.
     * @example
     * // Create many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthClientCreateManyArgs>(args?: SelectSubset<T, OAuthClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthClients and returns the data saved in the database.
     * @param {OAuthClientCreateManyAndReturnArgs} args - Arguments to create many OAuthClients.
     * @example
     * // Create many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthClients and only return the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthClientCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthClient.
     * @param {OAuthClientDeleteArgs} args - Arguments to delete one OAuthClient.
     * @example
     * // Delete one OAuthClient
     * const OAuthClient = await prisma.oAuthClient.delete({
     *   where: {
     *     // ... filter to delete one OAuthClient
     *   }
     * })
     * 
     */
    delete<T extends OAuthClientDeleteArgs>(args: SelectSubset<T, OAuthClientDeleteArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthClient.
     * @param {OAuthClientUpdateArgs} args - Arguments to update one OAuthClient.
     * @example
     * // Update one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthClientUpdateArgs>(args: SelectSubset<T, OAuthClientUpdateArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthClients.
     * @param {OAuthClientDeleteManyArgs} args - Arguments to filter OAuthClients to delete.
     * @example
     * // Delete a few OAuthClients
     * const { count } = await prisma.oAuthClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthClientDeleteManyArgs>(args?: SelectSubset<T, OAuthClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthClientUpdateManyArgs>(args: SelectSubset<T, OAuthClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthClients and returns the data updated in the database.
     * @param {OAuthClientUpdateManyAndReturnArgs} args - Arguments to update many OAuthClients.
     * @example
     * // Update many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthClients and only return the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthClientUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthClient.
     * @param {OAuthClientUpsertArgs} args - Arguments to update or create a OAuthClient.
     * @example
     * // Update or create a OAuthClient
     * const oAuthClient = await prisma.oAuthClient.upsert({
     *   create: {
     *     // ... data to create a OAuthClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthClient we want to update
     *   }
     * })
     */
    upsert<T extends OAuthClientUpsertArgs>(args: SelectSubset<T, OAuthClientUpsertArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientCountArgs} args - Arguments to filter OAuthClients to count.
     * @example
     * // Count the number of OAuthClients
     * const count = await prisma.oAuthClient.count({
     *   where: {
     *     // ... the filter for the OAuthClients we want to count
     *   }
     * })
    **/
    count<T extends OAuthClientCountArgs>(
      args?: Subset<T, OAuthClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthClientAggregateArgs>(args: Subset<T, OAuthClientAggregateArgs>): Prisma.PrismaPromise<GetOAuthClientAggregateType<T>>

    /**
     * Group by OAuthClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthClientGroupByArgs['orderBy'] }
        : { orderBy?: OAuthClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthClient model
   */
  readonly fields: OAuthClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    codes<T extends OAuthClient$codesArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tokens<T extends OAuthClient$tokensArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthClient model
   */
  interface OAuthClientFieldRefs {
    readonly id: FieldRef<"OAuthClient", 'String'>
    readonly clientId: FieldRef<"OAuthClient", 'String'>
    readonly clientSecretHash: FieldRef<"OAuthClient", 'String'>
    readonly name: FieldRef<"OAuthClient", 'String'>
    readonly redirectUris: FieldRef<"OAuthClient", 'String[]'>
    readonly grantTypes: FieldRef<"OAuthClient", 'String[]'>
    readonly scopes: FieldRef<"OAuthClient", 'String[]'>
    readonly tokenEndpointAuthMethod: FieldRef<"OAuthClient", 'String'>
    readonly clientUri: FieldRef<"OAuthClient", 'String'>
    readonly logoUri: FieldRef<"OAuthClient", 'String'>
    readonly createdAt: FieldRef<"OAuthClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthClient findUnique
   */
  export type OAuthClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient findUniqueOrThrow
   */
  export type OAuthClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient findFirst
   */
  export type OAuthClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient findFirstOrThrow
   */
  export type OAuthClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient findMany
   */
  export type OAuthClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClients to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient create
   */
  export type OAuthClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthClient.
     */
    data: XOR<OAuthClientCreateInput, OAuthClientUncheckedCreateInput>
  }

  /**
   * OAuthClient createMany
   */
  export type OAuthClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthClients.
     */
    data: OAuthClientCreateManyInput | OAuthClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthClient createManyAndReturn
   */
  export type OAuthClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthClients.
     */
    data: OAuthClientCreateManyInput | OAuthClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthClient update
   */
  export type OAuthClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthClient.
     */
    data: XOR<OAuthClientUpdateInput, OAuthClientUncheckedUpdateInput>
    /**
     * Choose, which OAuthClient to update.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient updateMany
   */
  export type OAuthClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthClients.
     */
    data: XOR<OAuthClientUpdateManyMutationInput, OAuthClientUncheckedUpdateManyInput>
    /**
     * Filter which OAuthClients to update
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to update.
     */
    limit?: number
  }

  /**
   * OAuthClient updateManyAndReturn
   */
  export type OAuthClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * The data used to update OAuthClients.
     */
    data: XOR<OAuthClientUpdateManyMutationInput, OAuthClientUncheckedUpdateManyInput>
    /**
     * Filter which OAuthClients to update
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to update.
     */
    limit?: number
  }

  /**
   * OAuthClient upsert
   */
  export type OAuthClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthClient to update in case it exists.
     */
    where: OAuthClientWhereUniqueInput
    /**
     * In case the OAuthClient found by the `where` argument doesn't exist, create a new OAuthClient with this data.
     */
    create: XOR<OAuthClientCreateInput, OAuthClientUncheckedCreateInput>
    /**
     * In case the OAuthClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthClientUpdateInput, OAuthClientUncheckedUpdateInput>
  }

  /**
   * OAuthClient delete
   */
  export type OAuthClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter which OAuthClient to delete.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient deleteMany
   */
  export type OAuthClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthClients to delete
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to delete.
     */
    limit?: number
  }

  /**
   * OAuthClient.codes
   */
  export type OAuthClient$codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthClient.tokens
   */
  export type OAuthClient$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthClient without action
   */
  export type OAuthClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
  }


  /**
   * Model OAuthAuthorizationCode
   */

  export type AggregateOAuthAuthorizationCode = {
    _count: OAuthAuthorizationCodeCountAggregateOutputType | null
    _min: OAuthAuthorizationCodeMinAggregateOutputType | null
    _max: OAuthAuthorizationCodeMaxAggregateOutputType | null
  }

  export type OAuthAuthorizationCodeMinAggregateOutputType = {
    id: string | null
    codeHash: string | null
    clientId: string | null
    userId: string | null
    redirectUri: string | null
    codeChallenge: string | null
    codeChallengeMethod: string | null
    resource: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OAuthAuthorizationCodeMaxAggregateOutputType = {
    id: string | null
    codeHash: string | null
    clientId: string | null
    userId: string | null
    redirectUri: string | null
    codeChallenge: string | null
    codeChallengeMethod: string | null
    resource: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OAuthAuthorizationCodeCountAggregateOutputType = {
    id: number
    codeHash: number
    clientId: number
    userId: number
    redirectUri: number
    scopes: number
    codeChallenge: number
    codeChallengeMethod: number
    resource: number
    expiresAt: number
    consumedAt: number
    createdAt: number
    _all: number
  }


  export type OAuthAuthorizationCodeMinAggregateInputType = {
    id?: true
    codeHash?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    resource?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OAuthAuthorizationCodeMaxAggregateInputType = {
    id?: true
    codeHash?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    resource?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OAuthAuthorizationCodeCountAggregateInputType = {
    id?: true
    codeHash?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    scopes?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    resource?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OAuthAuthorizationCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAuthorizationCode to aggregate.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthAuthorizationCodes
    **/
    _count?: true | OAuthAuthorizationCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthAuthorizationCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthAuthorizationCodeMaxAggregateInputType
  }

  export type GetOAuthAuthorizationCodeAggregateType<T extends OAuthAuthorizationCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthAuthorizationCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthAuthorizationCode[P]>
      : GetScalarType<T[P], AggregateOAuthAuthorizationCode[P]>
  }




  export type OAuthAuthorizationCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithAggregationInput | OAuthAuthorizationCodeOrderByWithAggregationInput[]
    by: OAuthAuthorizationCodeScalarFieldEnum[] | OAuthAuthorizationCodeScalarFieldEnum
    having?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthAuthorizationCodeCountAggregateInputType | true
    _min?: OAuthAuthorizationCodeMinAggregateInputType
    _max?: OAuthAuthorizationCodeMaxAggregateInputType
  }

  export type OAuthAuthorizationCodeGroupByOutputType = {
    id: string
    codeHash: string
    clientId: string
    userId: string
    redirectUri: string
    scopes: string[]
    codeChallenge: string
    codeChallengeMethod: string
    resource: string | null
    expiresAt: Date
    consumedAt: Date | null
    createdAt: Date
    _count: OAuthAuthorizationCodeCountAggregateOutputType | null
    _min: OAuthAuthorizationCodeMinAggregateOutputType | null
    _max: OAuthAuthorizationCodeMaxAggregateOutputType | null
  }

  type GetOAuthAuthorizationCodeGroupByPayload<T extends OAuthAuthorizationCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthAuthorizationCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthAuthorizationCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthAuthorizationCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthAuthorizationCodeGroupByOutputType[P]>
        }
      >
    >


  export type OAuthAuthorizationCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeHash?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    scopes?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    resource?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeHash?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    scopes?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    resource?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeHash?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    scopes?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    resource?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectScalar = {
    id?: boolean
    codeHash?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    scopes?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    resource?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }

  export type OAuthAuthorizationCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codeHash" | "clientId" | "userId" | "redirectUri" | "scopes" | "codeChallenge" | "codeChallengeMethod" | "resource" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["oAuthAuthorizationCode"]>
  export type OAuthAuthorizationCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAuthorizationCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAuthorizationCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthAuthorizationCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthAuthorizationCode"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codeHash: string
      clientId: string
      userId: string
      redirectUri: string
      scopes: string[]
      codeChallenge: string
      codeChallengeMethod: string
      /**
       * RFC 8707 audience, echoed back so tokens stay bound to this MCP server.
       */
      resource: string | null
      expiresAt: Date
      consumedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["oAuthAuthorizationCode"]>
    composites: {}
  }

  type OAuthAuthorizationCodeGetPayload<S extends boolean | null | undefined | OAuthAuthorizationCodeDefaultArgs> = $Result.GetResult<Prisma.$OAuthAuthorizationCodePayload, S>

  type OAuthAuthorizationCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthAuthorizationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthAuthorizationCodeCountAggregateInputType | true
    }

  export interface OAuthAuthorizationCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthAuthorizationCode'], meta: { name: 'OAuthAuthorizationCode' } }
    /**
     * Find zero or one OAuthAuthorizationCode that matches the filter.
     * @param {OAuthAuthorizationCodeFindUniqueArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthAuthorizationCodeFindUniqueArgs>(args: SelectSubset<T, OAuthAuthorizationCodeFindUniqueArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthAuthorizationCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthAuthorizationCodeFindUniqueOrThrowArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthAuthorizationCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAuthorizationCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindFirstArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthAuthorizationCodeFindFirstArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindFirstArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAuthorizationCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindFirstOrThrowArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthAuthorizationCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthAuthorizationCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthAuthorizationCodes
     * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany()
     * 
     * // Get first 10 OAuthAuthorizationCodes
     * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthAuthorizationCodeFindManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeCreateArgs} args - Arguments to create a OAuthAuthorizationCode.
     * @example
     * // Create one OAuthAuthorizationCode
     * const OAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.create({
     *   data: {
     *     // ... data to create a OAuthAuthorizationCode
     *   }
     * })
     * 
     */
    create<T extends OAuthAuthorizationCodeCreateArgs>(args: SelectSubset<T, OAuthAuthorizationCodeCreateArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthAuthorizationCodes.
     * @param {OAuthAuthorizationCodeCreateManyArgs} args - Arguments to create many OAuthAuthorizationCodes.
     * @example
     * // Create many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthAuthorizationCodeCreateManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthAuthorizationCodes and returns the data saved in the database.
     * @param {OAuthAuthorizationCodeCreateManyAndReturnArgs} args - Arguments to create many OAuthAuthorizationCodes.
     * @example
     * // Create many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthAuthorizationCodes and only return the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthAuthorizationCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeDeleteArgs} args - Arguments to delete one OAuthAuthorizationCode.
     * @example
     * // Delete one OAuthAuthorizationCode
     * const OAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.delete({
     *   where: {
     *     // ... filter to delete one OAuthAuthorizationCode
     *   }
     * })
     * 
     */
    delete<T extends OAuthAuthorizationCodeDeleteArgs>(args: SelectSubset<T, OAuthAuthorizationCodeDeleteArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeUpdateArgs} args - Arguments to update one OAuthAuthorizationCode.
     * @example
     * // Update one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthAuthorizationCodeUpdateArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthAuthorizationCodes.
     * @param {OAuthAuthorizationCodeDeleteManyArgs} args - Arguments to filter OAuthAuthorizationCodes to delete.
     * @example
     * // Delete a few OAuthAuthorizationCodes
     * const { count } = await prisma.oAuthAuthorizationCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthAuthorizationCodeDeleteManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthAuthorizationCodeUpdateManyArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAuthorizationCodes and returns the data updated in the database.
     * @param {OAuthAuthorizationCodeUpdateManyAndReturnArgs} args - Arguments to update many OAuthAuthorizationCodes.
     * @example
     * // Update many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthAuthorizationCodes and only return the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthAuthorizationCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeUpsertArgs} args - Arguments to update or create a OAuthAuthorizationCode.
     * @example
     * // Update or create a OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.upsert({
     *   create: {
     *     // ... data to create a OAuthAuthorizationCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthAuthorizationCode we want to update
     *   }
     * })
     */
    upsert<T extends OAuthAuthorizationCodeUpsertArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpsertArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthAuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeCountArgs} args - Arguments to filter OAuthAuthorizationCodes to count.
     * @example
     * // Count the number of OAuthAuthorizationCodes
     * const count = await prisma.oAuthAuthorizationCode.count({
     *   where: {
     *     // ... the filter for the OAuthAuthorizationCodes we want to count
     *   }
     * })
    **/
    count<T extends OAuthAuthorizationCodeCountArgs>(
      args?: Subset<T, OAuthAuthorizationCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthAuthorizationCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthAuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthAuthorizationCodeAggregateArgs>(args: Subset<T, OAuthAuthorizationCodeAggregateArgs>): Prisma.PrismaPromise<GetOAuthAuthorizationCodeAggregateType<T>>

    /**
     * Group by OAuthAuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthAuthorizationCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthAuthorizationCodeGroupByArgs['orderBy'] }
        : { orderBy?: OAuthAuthorizationCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthAuthorizationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAuthorizationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthAuthorizationCode model
   */
  readonly fields: OAuthAuthorizationCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthAuthorizationCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthAuthorizationCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthAuthorizationCode model
   */
  interface OAuthAuthorizationCodeFieldRefs {
    readonly id: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly codeHash: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly clientId: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly userId: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly redirectUri: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly scopes: FieldRef<"OAuthAuthorizationCode", 'String[]'>
    readonly codeChallenge: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly codeChallengeMethod: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly resource: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly expiresAt: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
    readonly consumedAt: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
    readonly createdAt: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthAuthorizationCode findUnique
   */
  export type OAuthAuthorizationCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode findUniqueOrThrow
   */
  export type OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode findFirst
   */
  export type OAuthAuthorizationCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode findFirstOrThrow
   */
  export type OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode findMany
   */
  export type OAuthAuthorizationCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCodes to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode create
   */
  export type OAuthAuthorizationCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthAuthorizationCode.
     */
    data: XOR<OAuthAuthorizationCodeCreateInput, OAuthAuthorizationCodeUncheckedCreateInput>
  }

  /**
   * OAuthAuthorizationCode createMany
   */
  export type OAuthAuthorizationCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthAuthorizationCodes.
     */
    data: OAuthAuthorizationCodeCreateManyInput | OAuthAuthorizationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthAuthorizationCode createManyAndReturn
   */
  export type OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthAuthorizationCodes.
     */
    data: OAuthAuthorizationCodeCreateManyInput | OAuthAuthorizationCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAuthorizationCode update
   */
  export type OAuthAuthorizationCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthAuthorizationCode.
     */
    data: XOR<OAuthAuthorizationCodeUpdateInput, OAuthAuthorizationCodeUncheckedUpdateInput>
    /**
     * Choose, which OAuthAuthorizationCode to update.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode updateMany
   */
  export type OAuthAuthorizationCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthAuthorizationCodes.
     */
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAuthorizationCodes to update
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to update.
     */
    limit?: number
  }

  /**
   * OAuthAuthorizationCode updateManyAndReturn
   */
  export type OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * The data used to update OAuthAuthorizationCodes.
     */
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAuthorizationCodes to update
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAuthorizationCode upsert
   */
  export type OAuthAuthorizationCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthAuthorizationCode to update in case it exists.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * In case the OAuthAuthorizationCode found by the `where` argument doesn't exist, create a new OAuthAuthorizationCode with this data.
     */
    create: XOR<OAuthAuthorizationCodeCreateInput, OAuthAuthorizationCodeUncheckedCreateInput>
    /**
     * In case the OAuthAuthorizationCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthAuthorizationCodeUpdateInput, OAuthAuthorizationCodeUncheckedUpdateInput>
  }

  /**
   * OAuthAuthorizationCode delete
   */
  export type OAuthAuthorizationCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter which OAuthAuthorizationCode to delete.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode deleteMany
   */
  export type OAuthAuthorizationCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAuthorizationCodes to delete
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to delete.
     */
    limit?: number
  }

  /**
   * OAuthAuthorizationCode without action
   */
  export type OAuthAuthorizationCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
  }


  /**
   * Model OAuthToken
   */

  export type AggregateOAuthToken = {
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  export type OAuthTokenMinAggregateOutputType = {
    id: string | null
    accessTokenHash: string | null
    refreshTokenHash: string | null
    clientId: string | null
    userId: string | null
    resource: string | null
    expiresAt: Date | null
    refreshExpiresAt: Date | null
    revokedAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
  }

  export type OAuthTokenMaxAggregateOutputType = {
    id: string | null
    accessTokenHash: string | null
    refreshTokenHash: string | null
    clientId: string | null
    userId: string | null
    resource: string | null
    expiresAt: Date | null
    refreshExpiresAt: Date | null
    revokedAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
  }

  export type OAuthTokenCountAggregateOutputType = {
    id: number
    accessTokenHash: number
    refreshTokenHash: number
    clientId: number
    userId: number
    scopes: number
    resource: number
    expiresAt: number
    refreshExpiresAt: number
    revokedAt: number
    lastUsedAt: number
    createdAt: number
    _all: number
  }


  export type OAuthTokenMinAggregateInputType = {
    id?: true
    accessTokenHash?: true
    refreshTokenHash?: true
    clientId?: true
    userId?: true
    resource?: true
    expiresAt?: true
    refreshExpiresAt?: true
    revokedAt?: true
    lastUsedAt?: true
    createdAt?: true
  }

  export type OAuthTokenMaxAggregateInputType = {
    id?: true
    accessTokenHash?: true
    refreshTokenHash?: true
    clientId?: true
    userId?: true
    resource?: true
    expiresAt?: true
    refreshExpiresAt?: true
    revokedAt?: true
    lastUsedAt?: true
    createdAt?: true
  }

  export type OAuthTokenCountAggregateInputType = {
    id?: true
    accessTokenHash?: true
    refreshTokenHash?: true
    clientId?: true
    userId?: true
    scopes?: true
    resource?: true
    expiresAt?: true
    refreshExpiresAt?: true
    revokedAt?: true
    lastUsedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OAuthTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthToken to aggregate.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthTokens
    **/
    _count?: true | OAuthTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type GetOAuthTokenAggregateType<T extends OAuthTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthToken[P]>
      : GetScalarType<T[P], AggregateOAuthToken[P]>
  }




  export type OAuthTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithAggregationInput | OAuthTokenOrderByWithAggregationInput[]
    by: OAuthTokenScalarFieldEnum[] | OAuthTokenScalarFieldEnum
    having?: OAuthTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthTokenCountAggregateInputType | true
    _min?: OAuthTokenMinAggregateInputType
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type OAuthTokenGroupByOutputType = {
    id: string
    accessTokenHash: string
    refreshTokenHash: string | null
    clientId: string
    userId: string
    scopes: string[]
    resource: string | null
    expiresAt: Date
    refreshExpiresAt: Date | null
    revokedAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  type GetOAuthTokenGroupByPayload<T extends OAuthTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessTokenHash?: boolean
    refreshTokenHash?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    resource?: boolean
    expiresAt?: boolean
    refreshExpiresAt?: boolean
    revokedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessTokenHash?: boolean
    refreshTokenHash?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    resource?: boolean
    expiresAt?: boolean
    refreshExpiresAt?: boolean
    revokedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessTokenHash?: boolean
    refreshTokenHash?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    resource?: boolean
    expiresAt?: boolean
    refreshExpiresAt?: boolean
    revokedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectScalar = {
    id?: boolean
    accessTokenHash?: boolean
    refreshTokenHash?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    resource?: boolean
    expiresAt?: boolean
    refreshExpiresAt?: boolean
    revokedAt?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
  }

  export type OAuthTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accessTokenHash" | "refreshTokenHash" | "clientId" | "userId" | "scopes" | "resource" | "expiresAt" | "refreshExpiresAt" | "revokedAt" | "lastUsedAt" | "createdAt", ExtArgs["result"]["oAuthToken"]>
  export type OAuthTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthToken"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accessTokenHash: string
      refreshTokenHash: string | null
      clientId: string
      userId: string
      scopes: string[]
      resource: string | null
      expiresAt: Date
      refreshExpiresAt: Date | null
      revokedAt: Date | null
      lastUsedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["oAuthToken"]>
    composites: {}
  }

  type OAuthTokenGetPayload<S extends boolean | null | undefined | OAuthTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthTokenPayload, S>

  type OAuthTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthTokenCountAggregateInputType | true
    }

  export interface OAuthTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthToken'], meta: { name: 'OAuthToken' } }
    /**
     * Find zero or one OAuthToken that matches the filter.
     * @param {OAuthTokenFindUniqueArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthTokenFindUniqueArgs>(args: SelectSubset<T, OAuthTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthTokenFindFirstArgs>(args?: SelectSubset<T, OAuthTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany()
     * 
     * // Get first 10 OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthTokenFindManyArgs>(args?: SelectSubset<T, OAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthToken.
     * @param {OAuthTokenCreateArgs} args - Arguments to create a OAuthToken.
     * @example
     * // Create one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.create({
     *   data: {
     *     // ... data to create a OAuthToken
     *   }
     * })
     * 
     */
    create<T extends OAuthTokenCreateArgs>(args: SelectSubset<T, OAuthTokenCreateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthTokens.
     * @param {OAuthTokenCreateManyArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthTokenCreateManyArgs>(args?: SelectSubset<T, OAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthTokens and returns the data saved in the database.
     * @param {OAuthTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthToken.
     * @param {OAuthTokenDeleteArgs} args - Arguments to delete one OAuthToken.
     * @example
     * // Delete one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthTokenDeleteArgs>(args: SelectSubset<T, OAuthTokenDeleteArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthToken.
     * @param {OAuthTokenUpdateArgs} args - Arguments to update one OAuthToken.
     * @example
     * // Update one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthTokenUpdateArgs>(args: SelectSubset<T, OAuthTokenUpdateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthTokens.
     * @param {OAuthTokenDeleteManyArgs} args - Arguments to filter OAuthTokens to delete.
     * @example
     * // Delete a few OAuthTokens
     * const { count } = await prisma.oAuthToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthTokenUpdateManyArgs>(args: SelectSubset<T, OAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens and returns the data updated in the database.
     * @param {OAuthTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthTokens.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthToken.
     * @param {OAuthTokenUpsertArgs} args - Arguments to update or create a OAuthToken.
     * @example
     * // Update or create a OAuthToken
     * const oAuthToken = await prisma.oAuthToken.upsert({
     *   create: {
     *     // ... data to create a OAuthToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthTokenUpsertArgs>(args: SelectSubset<T, OAuthTokenUpsertArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenCountArgs} args - Arguments to filter OAuthTokens to count.
     * @example
     * // Count the number of OAuthTokens
     * const count = await prisma.oAuthToken.count({
     *   where: {
     *     // ... the filter for the OAuthTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthTokenCountArgs>(
      args?: Subset<T, OAuthTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthTokenAggregateArgs>(args: Subset<T, OAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthTokenAggregateType<T>>

    /**
     * Group by OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthToken model
   */
  readonly fields: OAuthTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthToken model
   */
  interface OAuthTokenFieldRefs {
    readonly id: FieldRef<"OAuthToken", 'String'>
    readonly accessTokenHash: FieldRef<"OAuthToken", 'String'>
    readonly refreshTokenHash: FieldRef<"OAuthToken", 'String'>
    readonly clientId: FieldRef<"OAuthToken", 'String'>
    readonly userId: FieldRef<"OAuthToken", 'String'>
    readonly scopes: FieldRef<"OAuthToken", 'String[]'>
    readonly resource: FieldRef<"OAuthToken", 'String'>
    readonly expiresAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly refreshExpiresAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly revokedAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly lastUsedAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly createdAt: FieldRef<"OAuthToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthToken findUnique
   */
  export type OAuthTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findUniqueOrThrow
   */
  export type OAuthTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findFirst
   */
  export type OAuthTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findFirstOrThrow
   */
  export type OAuthTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findMany
   */
  export type OAuthTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthTokens to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken create
   */
  export type OAuthTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthToken.
     */
    data: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
  }

  /**
   * OAuthToken createMany
   */
  export type OAuthTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthToken createManyAndReturn
   */
  export type OAuthTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken update
   */
  export type OAuthTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthToken.
     */
    data: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthToken to update.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken updateMany
   */
  export type OAuthTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthToken updateManyAndReturn
   */
  export type OAuthTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken upsert
   */
  export type OAuthTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthToken to update in case it exists.
     */
    where: OAuthTokenWhereUniqueInput
    /**
     * In case the OAuthToken found by the `where` argument doesn't exist, create a new OAuthToken with this data.
     */
    create: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
    /**
     * In case the OAuthToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
  }

  /**
   * OAuthToken delete
   */
  export type OAuthTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthToken to delete.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken deleteMany
   */
  export type OAuthTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthTokens to delete
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthToken without action
   */
  export type OAuthTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkspaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const WorkspaceMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    workspaceId: 'workspaceId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type WorkspaceMemberScalarFieldEnum = (typeof WorkspaceMemberScalarFieldEnum)[keyof typeof WorkspaceMemberScalarFieldEnum]


  export const WorkspaceInviteScalarFieldEnum: {
    id: 'id',
    email: 'email',
    workspaceId: 'workspaceId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type WorkspaceInviteScalarFieldEnum = (typeof WorkspaceInviteScalarFieldEnum)[keyof typeof WorkspaceInviteScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    content: 'content',
    icon: 'icon',
    coverImage: 'coverImage',
    workspaceId: 'workspaceId',
    createdById: 'createdById',
    parentId: 'parentId',
    shareType: 'shareType',
    shareToken: 'shareToken',
    ydoc: 'ydoc',
    ydocSeq: 'ydocSeq',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const PageUpdateScalarFieldEnum: {
    seq: 'seq',
    pageId: 'pageId',
    update: 'update',
    clientId: 'clientId',
    createdAt: 'createdAt'
  };

  export type PageUpdateScalarFieldEnum = (typeof PageUpdateScalarFieldEnum)[keyof typeof PageUpdateScalarFieldEnum]


  export const PagePresenceScalarFieldEnum: {
    id: 'id',
    pageId: 'pageId',
    userId: 'userId',
    name: 'name',
    color: 'color',
    updatedAt: 'updatedAt'
  };

  export type PagePresenceScalarFieldEnum = (typeof PagePresenceScalarFieldEnum)[keyof typeof PagePresenceScalarFieldEnum]


  export const ApiTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    tokenHash: 'tokenHash',
    prefix: 'prefix',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type ApiTokenScalarFieldEnum = (typeof ApiTokenScalarFieldEnum)[keyof typeof ApiTokenScalarFieldEnum]


  export const OAuthClientScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    clientSecretHash: 'clientSecretHash',
    name: 'name',
    redirectUris: 'redirectUris',
    grantTypes: 'grantTypes',
    scopes: 'scopes',
    tokenEndpointAuthMethod: 'tokenEndpointAuthMethod',
    clientUri: 'clientUri',
    logoUri: 'logoUri',
    createdAt: 'createdAt'
  };

  export type OAuthClientScalarFieldEnum = (typeof OAuthClientScalarFieldEnum)[keyof typeof OAuthClientScalarFieldEnum]


  export const OAuthAuthorizationCodeScalarFieldEnum: {
    id: 'id',
    codeHash: 'codeHash',
    clientId: 'clientId',
    userId: 'userId',
    redirectUri: 'redirectUri',
    scopes: 'scopes',
    codeChallenge: 'codeChallenge',
    codeChallengeMethod: 'codeChallengeMethod',
    resource: 'resource',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
  };

  export type OAuthAuthorizationCodeScalarFieldEnum = (typeof OAuthAuthorizationCodeScalarFieldEnum)[keyof typeof OAuthAuthorizationCodeScalarFieldEnum]


  export const OAuthTokenScalarFieldEnum: {
    id: 'id',
    accessTokenHash: 'accessTokenHash',
    refreshTokenHash: 'refreshTokenHash',
    clientId: 'clientId',
    userId: 'userId',
    scopes: 'scopes',
    resource: 'resource',
    expiresAt: 'expiresAt',
    refreshExpiresAt: 'refreshExpiresAt',
    revokedAt: 'revokedAt',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt'
  };

  export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    workspaces?: WorkspaceListRelationFilter
    workspaceMemberships?: WorkspaceMemberListRelationFilter
    pages?: PageListRelationFilter
    apiTokens?: ApiTokenListRelationFilter
    oauthGrants?: OAuthAuthorizationCodeListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    workspaces?: WorkspaceOrderByRelationAggregateInput
    workspaceMemberships?: WorkspaceMemberOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
    apiTokens?: ApiTokenOrderByRelationAggregateInput
    oauthGrants?: OAuthAuthorizationCodeOrderByRelationAggregateInput
    oauthTokens?: OAuthTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    workspaces?: WorkspaceListRelationFilter
    workspaceMemberships?: WorkspaceMemberListRelationFilter
    pages?: PageListRelationFilter
    apiTokens?: ApiTokenListRelationFilter
    oauthGrants?: OAuthAuthorizationCodeListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WorkspaceWhereInput = {
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    slug?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: WorkspaceMemberListRelationFilter
    pages?: PageListRelationFilter
    invites?: WorkspaceInviteListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    members?: WorkspaceMemberOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
    invites?: WorkspaceInviteOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    name?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: WorkspaceMemberListRelationFilter
    pages?: PageListRelationFilter
    invites?: WorkspaceInviteListRelationFilter
  }, "id" | "slug">

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    OR?: WorkspaceScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workspace"> | string
    name?: StringWithAggregatesFilter<"Workspace"> | string
    slug?: StringWithAggregatesFilter<"Workspace"> | string
    description?: StringNullableWithAggregatesFilter<"Workspace"> | string | null
    ownerId?: StringWithAggregatesFilter<"Workspace"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
  }

  export type WorkspaceMemberWhereInput = {
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    id?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    role?: StringFilter<"WorkspaceMember"> | string
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }

  export type WorkspaceMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type WorkspaceMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_workspaceId?: WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInput
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    userId?: StringFilter<"WorkspaceMember"> | string
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    role?: StringFilter<"WorkspaceMember"> | string
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }, "id" | "userId_workspaceId">

  export type WorkspaceMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: WorkspaceMemberCountOrderByAggregateInput
    _max?: WorkspaceMemberMaxOrderByAggregateInput
    _min?: WorkspaceMemberMinOrderByAggregateInput
  }

  export type WorkspaceMemberScalarWhereWithAggregatesInput = {
    AND?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    OR?: WorkspaceMemberScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    userId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    workspaceId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    role?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"WorkspaceMember"> | Date | string
  }

  export type WorkspaceInviteWhereInput = {
    AND?: WorkspaceInviteWhereInput | WorkspaceInviteWhereInput[]
    OR?: WorkspaceInviteWhereInput[]
    NOT?: WorkspaceInviteWhereInput | WorkspaceInviteWhereInput[]
    id?: StringFilter<"WorkspaceInvite"> | string
    email?: StringFilter<"WorkspaceInvite"> | string
    workspaceId?: StringFilter<"WorkspaceInvite"> | string
    token?: StringFilter<"WorkspaceInvite"> | string
    expiresAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
    createdAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }

  export type WorkspaceInviteOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    workspaceId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type WorkspaceInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_workspaceId?: WorkspaceInviteEmailWorkspaceIdCompoundUniqueInput
    AND?: WorkspaceInviteWhereInput | WorkspaceInviteWhereInput[]
    OR?: WorkspaceInviteWhereInput[]
    NOT?: WorkspaceInviteWhereInput | WorkspaceInviteWhereInput[]
    email?: StringFilter<"WorkspaceInvite"> | string
    workspaceId?: StringFilter<"WorkspaceInvite"> | string
    expiresAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
    createdAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
  }, "id" | "token" | "email_workspaceId">

  export type WorkspaceInviteOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    workspaceId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: WorkspaceInviteCountOrderByAggregateInput
    _max?: WorkspaceInviteMaxOrderByAggregateInput
    _min?: WorkspaceInviteMinOrderByAggregateInput
  }

  export type WorkspaceInviteScalarWhereWithAggregatesInput = {
    AND?: WorkspaceInviteScalarWhereWithAggregatesInput | WorkspaceInviteScalarWhereWithAggregatesInput[]
    OR?: WorkspaceInviteScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceInviteScalarWhereWithAggregatesInput | WorkspaceInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkspaceInvite"> | string
    email?: StringWithAggregatesFilter<"WorkspaceInvite"> | string
    workspaceId?: StringWithAggregatesFilter<"WorkspaceInvite"> | string
    token?: StringWithAggregatesFilter<"WorkspaceInvite"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"WorkspaceInvite"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkspaceInvite"> | Date | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: StringFilter<"Page"> | string
    title?: StringFilter<"Page"> | string
    slug?: StringFilter<"Page"> | string
    content?: StringNullableFilter<"Page"> | string | null
    icon?: StringNullableFilter<"Page"> | string | null
    coverImage?: StringNullableFilter<"Page"> | string | null
    workspaceId?: StringFilter<"Page"> | string
    createdById?: StringNullableFilter<"Page"> | string | null
    parentId?: StringNullableFilter<"Page"> | string | null
    shareType?: StringFilter<"Page"> | string
    shareToken?: StringNullableFilter<"Page"> | string | null
    ydoc?: BytesNullableFilter<"Page"> | Bytes | null
    ydocSeq?: BigIntFilter<"Page"> | bigint | number
    version?: IntFilter<"Page"> | number
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parent?: XOR<PageNullableScalarRelationFilter, PageWhereInput> | null
    children?: PageListRelationFilter
    updates?: PageUpdateListRelationFilter
    presence?: PagePresenceListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    createdById?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    shareType?: SortOrder
    shareToken?: SortOrderInput | SortOrder
    ydoc?: SortOrderInput | SortOrder
    ydocSeq?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    parent?: PageOrderByWithRelationInput
    children?: PageOrderByRelationAggregateInput
    updates?: PageUpdateOrderByRelationAggregateInput
    presence?: PagePresenceOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    workspaceId_slug?: PageWorkspaceIdSlugCompoundUniqueInput
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    title?: StringFilter<"Page"> | string
    slug?: StringFilter<"Page"> | string
    content?: StringNullableFilter<"Page"> | string | null
    icon?: StringNullableFilter<"Page"> | string | null
    coverImage?: StringNullableFilter<"Page"> | string | null
    workspaceId?: StringFilter<"Page"> | string
    createdById?: StringNullableFilter<"Page"> | string | null
    parentId?: StringNullableFilter<"Page"> | string | null
    shareType?: StringFilter<"Page"> | string
    ydoc?: BytesNullableFilter<"Page"> | Bytes | null
    ydocSeq?: BigIntFilter<"Page"> | bigint | number
    version?: IntFilter<"Page"> | number
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    workspace?: XOR<WorkspaceScalarRelationFilter, WorkspaceWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    parent?: XOR<PageNullableScalarRelationFilter, PageWhereInput> | null
    children?: PageListRelationFilter
    updates?: PageUpdateListRelationFilter
    presence?: PagePresenceListRelationFilter
  }, "id" | "shareToken" | "workspaceId_slug">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    createdById?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    shareType?: SortOrder
    shareToken?: SortOrderInput | SortOrder
    ydoc?: SortOrderInput | SortOrder
    ydocSeq?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _avg?: PageAvgOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
    _sum?: PageSumOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Page"> | string
    title?: StringWithAggregatesFilter<"Page"> | string
    slug?: StringWithAggregatesFilter<"Page"> | string
    content?: StringNullableWithAggregatesFilter<"Page"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Page"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"Page"> | string | null
    workspaceId?: StringWithAggregatesFilter<"Page"> | string
    createdById?: StringNullableWithAggregatesFilter<"Page"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Page"> | string | null
    shareType?: StringWithAggregatesFilter<"Page"> | string
    shareToken?: StringNullableWithAggregatesFilter<"Page"> | string | null
    ydoc?: BytesNullableWithAggregatesFilter<"Page"> | Bytes | null
    ydocSeq?: BigIntWithAggregatesFilter<"Page"> | bigint | number
    version?: IntWithAggregatesFilter<"Page"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
  }

  export type PageUpdateWhereInput = {
    AND?: PageUpdateWhereInput | PageUpdateWhereInput[]
    OR?: PageUpdateWhereInput[]
    NOT?: PageUpdateWhereInput | PageUpdateWhereInput[]
    seq?: BigIntFilter<"PageUpdate"> | bigint | number
    pageId?: StringFilter<"PageUpdate"> | string
    update?: BytesFilter<"PageUpdate"> | Bytes
    clientId?: StringFilter<"PageUpdate"> | string
    createdAt?: DateTimeFilter<"PageUpdate"> | Date | string
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }

  export type PageUpdateOrderByWithRelationInput = {
    seq?: SortOrder
    pageId?: SortOrder
    update?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    page?: PageOrderByWithRelationInput
  }

  export type PageUpdateWhereUniqueInput = Prisma.AtLeast<{
    seq?: bigint | number
    AND?: PageUpdateWhereInput | PageUpdateWhereInput[]
    OR?: PageUpdateWhereInput[]
    NOT?: PageUpdateWhereInput | PageUpdateWhereInput[]
    pageId?: StringFilter<"PageUpdate"> | string
    update?: BytesFilter<"PageUpdate"> | Bytes
    clientId?: StringFilter<"PageUpdate"> | string
    createdAt?: DateTimeFilter<"PageUpdate"> | Date | string
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }, "seq">

  export type PageUpdateOrderByWithAggregationInput = {
    seq?: SortOrder
    pageId?: SortOrder
    update?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    _count?: PageUpdateCountOrderByAggregateInput
    _avg?: PageUpdateAvgOrderByAggregateInput
    _max?: PageUpdateMaxOrderByAggregateInput
    _min?: PageUpdateMinOrderByAggregateInput
    _sum?: PageUpdateSumOrderByAggregateInput
  }

  export type PageUpdateScalarWhereWithAggregatesInput = {
    AND?: PageUpdateScalarWhereWithAggregatesInput | PageUpdateScalarWhereWithAggregatesInput[]
    OR?: PageUpdateScalarWhereWithAggregatesInput[]
    NOT?: PageUpdateScalarWhereWithAggregatesInput | PageUpdateScalarWhereWithAggregatesInput[]
    seq?: BigIntWithAggregatesFilter<"PageUpdate"> | bigint | number
    pageId?: StringWithAggregatesFilter<"PageUpdate"> | string
    update?: BytesWithAggregatesFilter<"PageUpdate"> | Bytes
    clientId?: StringWithAggregatesFilter<"PageUpdate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PageUpdate"> | Date | string
  }

  export type PagePresenceWhereInput = {
    AND?: PagePresenceWhereInput | PagePresenceWhereInput[]
    OR?: PagePresenceWhereInput[]
    NOT?: PagePresenceWhereInput | PagePresenceWhereInput[]
    id?: StringFilter<"PagePresence"> | string
    pageId?: StringFilter<"PagePresence"> | string
    userId?: StringFilter<"PagePresence"> | string
    name?: StringFilter<"PagePresence"> | string
    color?: StringFilter<"PagePresence"> | string
    updatedAt?: DateTimeFilter<"PagePresence"> | Date | string
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }

  export type PagePresenceOrderByWithRelationInput = {
    id?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    updatedAt?: SortOrder
    page?: PageOrderByWithRelationInput
  }

  export type PagePresenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pageId_userId?: PagePresencePageIdUserIdCompoundUniqueInput
    AND?: PagePresenceWhereInput | PagePresenceWhereInput[]
    OR?: PagePresenceWhereInput[]
    NOT?: PagePresenceWhereInput | PagePresenceWhereInput[]
    pageId?: StringFilter<"PagePresence"> | string
    userId?: StringFilter<"PagePresence"> | string
    name?: StringFilter<"PagePresence"> | string
    color?: StringFilter<"PagePresence"> | string
    updatedAt?: DateTimeFilter<"PagePresence"> | Date | string
    page?: XOR<PageScalarRelationFilter, PageWhereInput>
  }, "id" | "pageId_userId">

  export type PagePresenceOrderByWithAggregationInput = {
    id?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    updatedAt?: SortOrder
    _count?: PagePresenceCountOrderByAggregateInput
    _max?: PagePresenceMaxOrderByAggregateInput
    _min?: PagePresenceMinOrderByAggregateInput
  }

  export type PagePresenceScalarWhereWithAggregatesInput = {
    AND?: PagePresenceScalarWhereWithAggregatesInput | PagePresenceScalarWhereWithAggregatesInput[]
    OR?: PagePresenceScalarWhereWithAggregatesInput[]
    NOT?: PagePresenceScalarWhereWithAggregatesInput | PagePresenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PagePresence"> | string
    pageId?: StringWithAggregatesFilter<"PagePresence"> | string
    userId?: StringWithAggregatesFilter<"PagePresence"> | string
    name?: StringWithAggregatesFilter<"PagePresence"> | string
    color?: StringWithAggregatesFilter<"PagePresence"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"PagePresence"> | Date | string
  }

  export type ApiTokenWhereInput = {
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    userId?: StringFilter<"ApiToken"> | string
    name?: StringFilter<"ApiToken"> | string
    tokenHash?: StringFilter<"ApiToken"> | string
    prefix?: StringFilter<"ApiToken"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApiTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    tokenHash?: SortOrder
    prefix?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApiTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    userId?: StringFilter<"ApiToken"> | string
    name?: StringFilter<"ApiToken"> | string
    prefix?: StringFilter<"ApiToken"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "tokenHash">

  export type ApiTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    tokenHash?: SortOrder
    prefix?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ApiTokenCountOrderByAggregateInput
    _max?: ApiTokenMaxOrderByAggregateInput
    _min?: ApiTokenMinOrderByAggregateInput
  }

  export type ApiTokenScalarWhereWithAggregatesInput = {
    AND?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    OR?: ApiTokenScalarWhereWithAggregatesInput[]
    NOT?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiToken"> | string
    userId?: StringWithAggregatesFilter<"ApiToken"> | string
    name?: StringWithAggregatesFilter<"ApiToken"> | string
    tokenHash?: StringWithAggregatesFilter<"ApiToken"> | string
    prefix?: StringWithAggregatesFilter<"ApiToken"> | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiToken"> | Date | string
  }

  export type OAuthClientWhereInput = {
    AND?: OAuthClientWhereInput | OAuthClientWhereInput[]
    OR?: OAuthClientWhereInput[]
    NOT?: OAuthClientWhereInput | OAuthClientWhereInput[]
    id?: StringFilter<"OAuthClient"> | string
    clientId?: StringFilter<"OAuthClient"> | string
    clientSecretHash?: StringNullableFilter<"OAuthClient"> | string | null
    name?: StringFilter<"OAuthClient"> | string
    redirectUris?: StringNullableListFilter<"OAuthClient">
    grantTypes?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    tokenEndpointAuthMethod?: StringFilter<"OAuthClient"> | string
    clientUri?: StringNullableFilter<"OAuthClient"> | string | null
    logoUri?: StringNullableFilter<"OAuthClient"> | string | null
    createdAt?: DateTimeFilter<"OAuthClient"> | Date | string
    codes?: OAuthAuthorizationCodeListRelationFilter
    tokens?: OAuthTokenListRelationFilter
  }

  export type OAuthClientOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrderInput | SortOrder
    name?: SortOrder
    redirectUris?: SortOrder
    grantTypes?: SortOrder
    scopes?: SortOrder
    tokenEndpointAuthMethod?: SortOrder
    clientUri?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    codes?: OAuthAuthorizationCodeOrderByRelationAggregateInput
    tokens?: OAuthTokenOrderByRelationAggregateInput
  }

  export type OAuthClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientId?: string
    AND?: OAuthClientWhereInput | OAuthClientWhereInput[]
    OR?: OAuthClientWhereInput[]
    NOT?: OAuthClientWhereInput | OAuthClientWhereInput[]
    clientSecretHash?: StringNullableFilter<"OAuthClient"> | string | null
    name?: StringFilter<"OAuthClient"> | string
    redirectUris?: StringNullableListFilter<"OAuthClient">
    grantTypes?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    tokenEndpointAuthMethod?: StringFilter<"OAuthClient"> | string
    clientUri?: StringNullableFilter<"OAuthClient"> | string | null
    logoUri?: StringNullableFilter<"OAuthClient"> | string | null
    createdAt?: DateTimeFilter<"OAuthClient"> | Date | string
    codes?: OAuthAuthorizationCodeListRelationFilter
    tokens?: OAuthTokenListRelationFilter
  }, "id" | "clientId">

  export type OAuthClientOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrderInput | SortOrder
    name?: SortOrder
    redirectUris?: SortOrder
    grantTypes?: SortOrder
    scopes?: SortOrder
    tokenEndpointAuthMethod?: SortOrder
    clientUri?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OAuthClientCountOrderByAggregateInput
    _max?: OAuthClientMaxOrderByAggregateInput
    _min?: OAuthClientMinOrderByAggregateInput
  }

  export type OAuthClientScalarWhereWithAggregatesInput = {
    AND?: OAuthClientScalarWhereWithAggregatesInput | OAuthClientScalarWhereWithAggregatesInput[]
    OR?: OAuthClientScalarWhereWithAggregatesInput[]
    NOT?: OAuthClientScalarWhereWithAggregatesInput | OAuthClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthClient"> | string
    clientId?: StringWithAggregatesFilter<"OAuthClient"> | string
    clientSecretHash?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    name?: StringWithAggregatesFilter<"OAuthClient"> | string
    redirectUris?: StringNullableListFilter<"OAuthClient">
    grantTypes?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    tokenEndpointAuthMethod?: StringWithAggregatesFilter<"OAuthClient"> | string
    clientUri?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    logoUri?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OAuthClient"> | Date | string
  }

  export type OAuthAuthorizationCodeWhereInput = {
    AND?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    OR?: OAuthAuthorizationCodeWhereInput[]
    NOT?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    id?: StringFilter<"OAuthAuthorizationCode"> | string
    codeHash?: StringFilter<"OAuthAuthorizationCode"> | string
    clientId?: StringFilter<"OAuthAuthorizationCode"> | string
    userId?: StringFilter<"OAuthAuthorizationCode"> | string
    redirectUri?: StringFilter<"OAuthAuthorizationCode"> | string
    scopes?: StringNullableListFilter<"OAuthAuthorizationCode">
    codeChallenge?: StringFilter<"OAuthAuthorizationCode"> | string
    codeChallengeMethod?: StringFilter<"OAuthAuthorizationCode"> | string
    resource?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthAuthorizationCodeOrderByWithRelationInput = {
    id?: SortOrder
    codeHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    scopes?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    resource?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthAuthorizationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codeHash?: string
    AND?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    OR?: OAuthAuthorizationCodeWhereInput[]
    NOT?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    clientId?: StringFilter<"OAuthAuthorizationCode"> | string
    userId?: StringFilter<"OAuthAuthorizationCode"> | string
    redirectUri?: StringFilter<"OAuthAuthorizationCode"> | string
    scopes?: StringNullableListFilter<"OAuthAuthorizationCode">
    codeChallenge?: StringFilter<"OAuthAuthorizationCode"> | string
    codeChallengeMethod?: StringFilter<"OAuthAuthorizationCode"> | string
    resource?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "codeHash">

  export type OAuthAuthorizationCodeOrderByWithAggregationInput = {
    id?: SortOrder
    codeHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    scopes?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    resource?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OAuthAuthorizationCodeCountOrderByAggregateInput
    _max?: OAuthAuthorizationCodeMaxOrderByAggregateInput
    _min?: OAuthAuthorizationCodeMinOrderByAggregateInput
  }

  export type OAuthAuthorizationCodeScalarWhereWithAggregatesInput = {
    AND?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput | OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    OR?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    NOT?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput | OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    codeHash?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    clientId?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    userId?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    redirectUri?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    scopes?: StringNullableListFilter<"OAuthAuthorizationCode">
    codeChallenge?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    codeChallengeMethod?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    resource?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string
  }

  export type OAuthTokenWhereInput = {
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    id?: StringFilter<"OAuthToken"> | string
    accessTokenHash?: StringFilter<"OAuthToken"> | string
    refreshTokenHash?: StringNullableFilter<"OAuthToken"> | string | null
    clientId?: StringFilter<"OAuthToken"> | string
    userId?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    resource?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeFilter<"OAuthToken"> | Date | string
    refreshExpiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    lastUsedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthTokenOrderByWithRelationInput = {
    id?: SortOrder
    accessTokenHash?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    resource?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    refreshExpiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessTokenHash?: string
    refreshTokenHash?: string
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    clientId?: StringFilter<"OAuthToken"> | string
    userId?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    resource?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeFilter<"OAuthToken"> | Date | string
    refreshExpiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    lastUsedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "accessTokenHash" | "refreshTokenHash">

  export type OAuthTokenOrderByWithAggregationInput = {
    id?: SortOrder
    accessTokenHash?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    resource?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    refreshExpiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OAuthTokenCountOrderByAggregateInput
    _max?: OAuthTokenMaxOrderByAggregateInput
    _min?: OAuthTokenMinOrderByAggregateInput
  }

  export type OAuthTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthToken"> | string
    accessTokenHash?: StringWithAggregatesFilter<"OAuthToken"> | string
    refreshTokenHash?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    clientId?: StringWithAggregatesFilter<"OAuthToken"> | string
    userId?: StringWithAggregatesFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    resource?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
    refreshExpiresAt?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateInput = {
    id?: string
    role?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkspaceMembershipsInput
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
  }

  export type WorkspaceMemberUncheckedCreateInput = {
    id?: string
    userId: string
    workspaceId: string
    role?: string
    joinedAt?: Date | string
  }

  export type WorkspaceMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkspaceMembershipsNestedInput
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateManyInput = {
    id?: string
    userId: string
    workspaceId: string
    role?: string
    joinedAt?: Date | string
  }

  export type WorkspaceMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteCreateInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutInvitesInput
  }

  export type WorkspaceInviteUncheckedCreateInput = {
    id?: string
    email: string
    workspaceId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WorkspaceInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutInvitesNestedInput
  }

  export type WorkspaceInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteCreateManyInput = {
    id?: string
    email: string
    workspaceId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WorkspaceInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdBy?: UserCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateCreateInput = {
    seq?: bigint | number
    update: Bytes
    clientId: string
    createdAt?: Date | string
    page: PageCreateNestedOneWithoutUpdatesInput
  }

  export type PageUpdateUncheckedCreateInput = {
    seq?: bigint | number
    pageId: string
    update: Bytes
    clientId: string
    createdAt?: Date | string
  }

  export type PageUpdateUpdateInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: PageUpdateOneRequiredWithoutUpdatesNestedInput
  }

  export type PageUpdateUncheckedUpdateInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    pageId?: StringFieldUpdateOperationsInput | string
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateCreateManyInput = {
    seq?: bigint | number
    pageId: string
    update: Bytes
    clientId: string
    createdAt?: Date | string
  }

  export type PageUpdateUpdateManyMutationInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateUncheckedUpdateManyInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    pageId?: StringFieldUpdateOperationsInput | string
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceCreateInput = {
    id?: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
    page: PageCreateNestedOneWithoutPresenceInput
  }

  export type PagePresenceUncheckedCreateInput = {
    id?: string
    pageId: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
  }

  export type PagePresenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    page?: PageUpdateOneRequiredWithoutPresenceNestedInput
  }

  export type PagePresenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceCreateManyInput = {
    id?: string
    pageId: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
  }

  export type PagePresenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenCreateInput = {
    id?: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutApiTokensInput
  }

  export type ApiTokenUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiTokensNestedInput
  }

  export type ApiTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenCreateManyInput = {
    id?: string
    userId: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthClientCreateInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    tokens?: OAuthTokenCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    tokens?: OAuthTokenUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    tokens?: OAuthTokenUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    tokens?: OAuthTokenUncheckedUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientCreateManyInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
  }

  export type OAuthClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateInput = {
    id?: string
    codeHash: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
    client: OAuthClientCreateNestedOneWithoutCodesInput
    user: UserCreateNestedOneWithoutOauthGrantsInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateInput = {
    id?: string
    codeHash: string
    clientId: string
    userId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutCodesNestedInput
    user?: UserUpdateOneRequiredWithoutOauthGrantsNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateManyInput = {
    id?: string
    codeHash: string
    clientId: string
    userId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    client: OAuthClientCreateNestedOneWithoutTokensInput
    user: UserCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    clientId: string
    userId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutTokensNestedInput
    user?: UserUpdateOneRequiredWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateManyInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    clientId: string
    userId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type WorkspaceListRelationFilter = {
    every?: WorkspaceWhereInput
    some?: WorkspaceWhereInput
    none?: WorkspaceWhereInput
  }

  export type WorkspaceMemberListRelationFilter = {
    every?: WorkspaceMemberWhereInput
    some?: WorkspaceMemberWhereInput
    none?: WorkspaceMemberWhereInput
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type ApiTokenListRelationFilter = {
    every?: ApiTokenWhereInput
    some?: ApiTokenWhereInput
    none?: ApiTokenWhereInput
  }

  export type OAuthAuthorizationCodeListRelationFilter = {
    every?: OAuthAuthorizationCodeWhereInput
    some?: OAuthAuthorizationCodeWhereInput
    none?: OAuthAuthorizationCodeWhereInput
  }

  export type OAuthTokenListRelationFilter = {
    every?: OAuthTokenWhereInput
    some?: OAuthTokenWhereInput
    none?: OAuthTokenWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthAuthorizationCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WorkspaceInviteListRelationFilter = {
    every?: WorkspaceInviteWhereInput
    some?: WorkspaceInviteWhereInput
    none?: WorkspaceInviteWhereInput
  }

  export type WorkspaceInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceScalarRelationFilter = {
    is?: WorkspaceWhereInput
    isNot?: WorkspaceWhereInput
  }

  export type WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInput = {
    userId: string
    workspaceId: string
  }

  export type WorkspaceMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceInviteEmailWorkspaceIdCompoundUniqueInput = {
    email: string
    workspaceId: string
  }

  export type WorkspaceInviteCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    workspaceId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkspaceInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    workspaceId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkspaceInviteMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    workspaceId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PageNullableScalarRelationFilter = {
    is?: PageWhereInput | null
    isNot?: PageWhereInput | null
  }

  export type PageUpdateListRelationFilter = {
    every?: PageUpdateWhereInput
    some?: PageUpdateWhereInput
    none?: PageUpdateWhereInput
  }

  export type PagePresenceListRelationFilter = {
    every?: PagePresenceWhereInput
    some?: PagePresenceWhereInput
    none?: PagePresenceWhereInput
  }

  export type PageUpdateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PagePresenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageWorkspaceIdSlugCompoundUniqueInput = {
    workspaceId: string
    slug: string
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    icon?: SortOrder
    coverImage?: SortOrder
    workspaceId?: SortOrder
    createdById?: SortOrder
    parentId?: SortOrder
    shareType?: SortOrder
    shareToken?: SortOrder
    ydoc?: SortOrder
    ydocSeq?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageAvgOrderByAggregateInput = {
    ydocSeq?: SortOrder
    version?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    icon?: SortOrder
    coverImage?: SortOrder
    workspaceId?: SortOrder
    createdById?: SortOrder
    parentId?: SortOrder
    shareType?: SortOrder
    shareToken?: SortOrder
    ydoc?: SortOrder
    ydocSeq?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    icon?: SortOrder
    coverImage?: SortOrder
    workspaceId?: SortOrder
    createdById?: SortOrder
    parentId?: SortOrder
    shareType?: SortOrder
    shareToken?: SortOrder
    ydoc?: SortOrder
    ydocSeq?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageSumOrderByAggregateInput = {
    ydocSeq?: SortOrder
    version?: SortOrder
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type PageScalarRelationFilter = {
    is?: PageWhereInput
    isNot?: PageWhereInput
  }

  export type PageUpdateCountOrderByAggregateInput = {
    seq?: SortOrder
    pageId?: SortOrder
    update?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type PageUpdateAvgOrderByAggregateInput = {
    seq?: SortOrder
  }

  export type PageUpdateMaxOrderByAggregateInput = {
    seq?: SortOrder
    pageId?: SortOrder
    update?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type PageUpdateMinOrderByAggregateInput = {
    seq?: SortOrder
    pageId?: SortOrder
    update?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
  }

  export type PageUpdateSumOrderByAggregateInput = {
    seq?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type PagePresencePageIdUserIdCompoundUniqueInput = {
    pageId: string
    userId: string
  }

  export type PagePresenceCountOrderByAggregateInput = {
    id?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    updatedAt?: SortOrder
  }

  export type PagePresenceMaxOrderByAggregateInput = {
    id?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    updatedAt?: SortOrder
  }

  export type PagePresenceMinOrderByAggregateInput = {
    id?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    tokenHash?: SortOrder
    prefix?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    tokenHash?: SortOrder
    prefix?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    tokenHash?: SortOrder
    prefix?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type OAuthClientCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    name?: SortOrder
    redirectUris?: SortOrder
    grantTypes?: SortOrder
    scopes?: SortOrder
    tokenEndpointAuthMethod?: SortOrder
    clientUri?: SortOrder
    logoUri?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthClientMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    name?: SortOrder
    tokenEndpointAuthMethod?: SortOrder
    clientUri?: SortOrder
    logoUri?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthClientMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    name?: SortOrder
    tokenEndpointAuthMethod?: SortOrder
    clientUri?: SortOrder
    logoUri?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthClientScalarRelationFilter = {
    is?: OAuthClientWhereInput
    isNot?: OAuthClientWhereInput
  }

  export type OAuthAuthorizationCodeCountOrderByAggregateInput = {
    id?: SortOrder
    codeHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    scopes?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthAuthorizationCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    codeHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthAuthorizationCodeMinOrderByAggregateInput = {
    id?: SortOrder
    codeHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthTokenCountOrderByAggregateInput = {
    id?: SortOrder
    accessTokenHash?: SortOrder
    refreshTokenHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    refreshExpiresAt?: SortOrder
    revokedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    accessTokenHash?: SortOrder
    refreshTokenHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    refreshExpiresAt?: SortOrder
    revokedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthTokenMinOrderByAggregateInput = {
    id?: SortOrder
    accessTokenHash?: SortOrder
    refreshTokenHash?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    resource?: SortOrder
    expiresAt?: SortOrder
    refreshExpiresAt?: SortOrder
    revokedAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WorkspaceCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
  }

  export type WorkspaceMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type PageCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput> | PageCreateWithoutCreatedByInput[] | PageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatedByInput | PageCreateOrConnectWithoutCreatedByInput[]
    createMany?: PageCreateManyCreatedByInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type ApiTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput> | ApiTokenCreateWithoutUserInput[] | ApiTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutUserInput | ApiTokenCreateOrConnectWithoutUserInput[]
    createMany?: ApiTokenCreateManyUserInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WorkspaceUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput> | PageCreateWithoutCreatedByInput[] | PageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatedByInput | PageCreateOrConnectWithoutCreatedByInput[]
    createMany?: PageCreateManyCreatedByInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type ApiTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput> | ApiTokenCreateWithoutUserInput[] | ApiTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutUserInput | ApiTokenCreateOrConnectWithoutUserInput[]
    createMany?: ApiTokenCreateManyUserInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WorkspaceUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkspaceUpsertWithWhereUniqueWithoutOwnerInput | WorkspaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    set?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    disconnect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    delete?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    update?: WorkspaceUpdateWithWhereUniqueWithoutOwnerInput | WorkspaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkspaceUpdateManyWithWhereWithoutOwnerInput | WorkspaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
  }

  export type WorkspaceMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type PageUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput> | PageCreateWithoutCreatedByInput[] | PageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatedByInput | PageCreateOrConnectWithoutCreatedByInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutCreatedByInput | PageUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PageCreateManyCreatedByInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutCreatedByInput | PageUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PageUpdateManyWithWhereWithoutCreatedByInput | PageUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type ApiTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput> | ApiTokenCreateWithoutUserInput[] | ApiTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutUserInput | ApiTokenCreateOrConnectWithoutUserInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutUserInput | ApiTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiTokenCreateManyUserInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutUserInput | ApiTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutUserInput | ApiTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput> | WorkspaceCreateWithoutOwnerInput[] | WorkspaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: WorkspaceCreateOrConnectWithoutOwnerInput | WorkspaceCreateOrConnectWithoutOwnerInput[]
    upsert?: WorkspaceUpsertWithWhereUniqueWithoutOwnerInput | WorkspaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: WorkspaceCreateManyOwnerInputEnvelope
    set?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    disconnect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    delete?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    connect?: WorkspaceWhereUniqueInput | WorkspaceWhereUniqueInput[]
    update?: WorkspaceUpdateWithWhereUniqueWithoutOwnerInput | WorkspaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: WorkspaceUpdateManyWithWhereWithoutOwnerInput | WorkspaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput> | PageCreateWithoutCreatedByInput[] | PageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatedByInput | PageCreateOrConnectWithoutCreatedByInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutCreatedByInput | PageUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PageCreateManyCreatedByInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutCreatedByInput | PageUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PageUpdateManyWithWhereWithoutCreatedByInput | PageUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type ApiTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput> | ApiTokenCreateWithoutUserInput[] | ApiTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutUserInput | ApiTokenCreateOrConnectWithoutUserInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutUserInput | ApiTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiTokenCreateManyUserInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutUserInput | ApiTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutUserInput | ApiTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWorkspacesInput = {
    create?: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspacesInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceMemberCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type PageCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput> | PageCreateWithoutWorkspaceInput[] | PageUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PageCreateOrConnectWithoutWorkspaceInput | PageCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PageCreateManyWorkspaceInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type WorkspaceInviteCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput> | WorkspaceInviteCreateWithoutWorkspaceInput[] | WorkspaceInviteUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInviteCreateOrConnectWithoutWorkspaceInput | WorkspaceInviteCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceInviteCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput> | PageCreateWithoutWorkspaceInput[] | PageUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PageCreateOrConnectWithoutWorkspaceInput | PageCreateOrConnectWithoutWorkspaceInput[]
    createMany?: PageCreateManyWorkspaceInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput> | WorkspaceInviteCreateWithoutWorkspaceInput[] | WorkspaceInviteUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInviteCreateOrConnectWithoutWorkspaceInput | WorkspaceInviteCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceInviteCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutWorkspacesNestedInput = {
    create?: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspacesInput
    upsert?: UserUpsertWithoutWorkspacesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspacesInput, UserUpdateWithoutWorkspacesInput>, UserUncheckedUpdateWithoutWorkspacesInput>
  }

  export type WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type PageUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput> | PageCreateWithoutWorkspaceInput[] | PageUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PageCreateOrConnectWithoutWorkspaceInput | PageCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutWorkspaceInput | PageUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PageCreateManyWorkspaceInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutWorkspaceInput | PageUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PageUpdateManyWithWhereWithoutWorkspaceInput | PageUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput> | WorkspaceInviteCreateWithoutWorkspaceInput[] | WorkspaceInviteUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInviteCreateOrConnectWithoutWorkspaceInput | WorkspaceInviteCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceInviteCreateManyWorkspaceInputEnvelope
    set?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    disconnect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    delete?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    connect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    update?: WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceInviteScalarWhereInput | WorkspaceInviteScalarWhereInput[]
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput> | PageCreateWithoutWorkspaceInput[] | PageUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: PageCreateOrConnectWithoutWorkspaceInput | PageCreateOrConnectWithoutWorkspaceInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutWorkspaceInput | PageUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: PageCreateManyWorkspaceInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutWorkspaceInput | PageUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: PageUpdateManyWithWhereWithoutWorkspaceInput | PageUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput> | WorkspaceInviteCreateWithoutWorkspaceInput[] | WorkspaceInviteUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceInviteCreateOrConnectWithoutWorkspaceInput | WorkspaceInviteCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceInviteCreateManyWorkspaceInputEnvelope
    set?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    disconnect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    delete?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    connect?: WorkspaceInviteWhereUniqueInput | WorkspaceInviteWhereUniqueInput[]
    update?: WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceInviteScalarWhereInput | WorkspaceInviteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWorkspaceMembershipsInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembershipsInput, UserUncheckedCreateWithoutWorkspaceMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutMembersInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWorkspaceMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembershipsInput, UserUncheckedCreateWithoutWorkspaceMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembershipsInput
    upsert?: UserUpsertWithoutWorkspaceMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspaceMembershipsInput, UserUpdateWithoutWorkspaceMembershipsInput>, UserUncheckedUpdateWithoutWorkspaceMembershipsInput>
  }

  export type WorkspaceUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    upsert?: WorkspaceUpsertWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutMembersInput, WorkspaceUpdateWithoutMembersInput>, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type WorkspaceCreateNestedOneWithoutInvitesInput = {
    create?: XOR<WorkspaceCreateWithoutInvitesInput, WorkspaceUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutInvitesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type WorkspaceUpdateOneRequiredWithoutInvitesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutInvitesInput, WorkspaceUncheckedCreateWithoutInvitesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutInvitesInput
    upsert?: WorkspaceUpsertWithoutInvitesInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutInvitesInput, WorkspaceUpdateWithoutInvitesInput>, WorkspaceUncheckedUpdateWithoutInvitesInput>
  }

  export type WorkspaceCreateNestedOneWithoutPagesInput = {
    create?: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutPagesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPagesInput = {
    create?: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesInput
    connect?: UserWhereUniqueInput
  }

  export type PageCreateNestedOneWithoutChildrenInput = {
    create?: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PageCreateOrConnectWithoutChildrenInput
    connect?: PageWhereUniqueInput
  }

  export type PageCreateNestedManyWithoutParentInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PageUpdateCreateNestedManyWithoutPageInput = {
    create?: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput> | PageUpdateCreateWithoutPageInput[] | PageUpdateUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PageUpdateCreateOrConnectWithoutPageInput | PageUpdateCreateOrConnectWithoutPageInput[]
    createMany?: PageUpdateCreateManyPageInputEnvelope
    connect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
  }

  export type PagePresenceCreateNestedManyWithoutPageInput = {
    create?: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput> | PagePresenceCreateWithoutPageInput[] | PagePresenceUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PagePresenceCreateOrConnectWithoutPageInput | PagePresenceCreateOrConnectWithoutPageInput[]
    createMany?: PagePresenceCreateManyPageInputEnvelope
    connect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PageUpdateUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput> | PageUpdateCreateWithoutPageInput[] | PageUpdateUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PageUpdateCreateOrConnectWithoutPageInput | PageUpdateCreateOrConnectWithoutPageInput[]
    createMany?: PageUpdateCreateManyPageInputEnvelope
    connect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
  }

  export type PagePresenceUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput> | PagePresenceCreateWithoutPageInput[] | PagePresenceUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PagePresenceCreateOrConnectWithoutPageInput | PagePresenceCreateOrConnectWithoutPageInput[]
    createMany?: PagePresenceCreateManyPageInputEnvelope
    connect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Bytes | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkspaceUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutPagesInput
    upsert?: WorkspaceUpsertWithoutPagesInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutPagesInput, WorkspaceUpdateWithoutPagesInput>, WorkspaceUncheckedUpdateWithoutPagesInput>
  }

  export type UserUpdateOneWithoutPagesNestedInput = {
    create?: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesInput
    upsert?: UserUpsertWithoutPagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPagesInput, UserUpdateWithoutPagesInput>, UserUncheckedUpdateWithoutPagesInput>
  }

  export type PageUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: PageCreateOrConnectWithoutChildrenInput
    upsert?: PageUpsertWithoutChildrenInput
    disconnect?: PageWhereInput | boolean
    delete?: PageWhereInput | boolean
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutChildrenInput, PageUpdateWithoutChildrenInput>, PageUncheckedUpdateWithoutChildrenInput>
  }

  export type PageUpdateManyWithoutParentNestedInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutParentInput | PageUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutParentInput | PageUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutParentInput | PageUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PageUpdateUpdateManyWithoutPageNestedInput = {
    create?: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput> | PageUpdateCreateWithoutPageInput[] | PageUpdateUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PageUpdateCreateOrConnectWithoutPageInput | PageUpdateCreateOrConnectWithoutPageInput[]
    upsert?: PageUpdateUpsertWithWhereUniqueWithoutPageInput | PageUpdateUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PageUpdateCreateManyPageInputEnvelope
    set?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    disconnect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    delete?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    connect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    update?: PageUpdateUpdateWithWhereUniqueWithoutPageInput | PageUpdateUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PageUpdateUpdateManyWithWhereWithoutPageInput | PageUpdateUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PageUpdateScalarWhereInput | PageUpdateScalarWhereInput[]
  }

  export type PagePresenceUpdateManyWithoutPageNestedInput = {
    create?: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput> | PagePresenceCreateWithoutPageInput[] | PagePresenceUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PagePresenceCreateOrConnectWithoutPageInput | PagePresenceCreateOrConnectWithoutPageInput[]
    upsert?: PagePresenceUpsertWithWhereUniqueWithoutPageInput | PagePresenceUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PagePresenceCreateManyPageInputEnvelope
    set?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    disconnect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    delete?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    connect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    update?: PagePresenceUpdateWithWhereUniqueWithoutPageInput | PagePresenceUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PagePresenceUpdateManyWithWhereWithoutPageInput | PagePresenceUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PagePresenceScalarWhereInput | PagePresenceScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput> | PageCreateWithoutParentInput[] | PageUncheckedCreateWithoutParentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutParentInput | PageCreateOrConnectWithoutParentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutParentInput | PageUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: PageCreateManyParentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutParentInput | PageUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutParentInput | PageUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PageUpdateUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput> | PageUpdateCreateWithoutPageInput[] | PageUpdateUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PageUpdateCreateOrConnectWithoutPageInput | PageUpdateCreateOrConnectWithoutPageInput[]
    upsert?: PageUpdateUpsertWithWhereUniqueWithoutPageInput | PageUpdateUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PageUpdateCreateManyPageInputEnvelope
    set?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    disconnect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    delete?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    connect?: PageUpdateWhereUniqueInput | PageUpdateWhereUniqueInput[]
    update?: PageUpdateUpdateWithWhereUniqueWithoutPageInput | PageUpdateUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PageUpdateUpdateManyWithWhereWithoutPageInput | PageUpdateUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PageUpdateScalarWhereInput | PageUpdateScalarWhereInput[]
  }

  export type PagePresenceUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput> | PagePresenceCreateWithoutPageInput[] | PagePresenceUncheckedCreateWithoutPageInput[]
    connectOrCreate?: PagePresenceCreateOrConnectWithoutPageInput | PagePresenceCreateOrConnectWithoutPageInput[]
    upsert?: PagePresenceUpsertWithWhereUniqueWithoutPageInput | PagePresenceUpsertWithWhereUniqueWithoutPageInput[]
    createMany?: PagePresenceCreateManyPageInputEnvelope
    set?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    disconnect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    delete?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    connect?: PagePresenceWhereUniqueInput | PagePresenceWhereUniqueInput[]
    update?: PagePresenceUpdateWithWhereUniqueWithoutPageInput | PagePresenceUpdateWithWhereUniqueWithoutPageInput[]
    updateMany?: PagePresenceUpdateManyWithWhereWithoutPageInput | PagePresenceUpdateManyWithWhereWithoutPageInput[]
    deleteMany?: PagePresenceScalarWhereInput | PagePresenceScalarWhereInput[]
  }

  export type PageCreateNestedOneWithoutUpdatesInput = {
    create?: XOR<PageCreateWithoutUpdatesInput, PageUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: PageCreateOrConnectWithoutUpdatesInput
    connect?: PageWhereUniqueInput
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Bytes
  }

  export type PageUpdateOneRequiredWithoutUpdatesNestedInput = {
    create?: XOR<PageCreateWithoutUpdatesInput, PageUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: PageCreateOrConnectWithoutUpdatesInput
    upsert?: PageUpsertWithoutUpdatesInput
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutUpdatesInput, PageUpdateWithoutUpdatesInput>, PageUncheckedUpdateWithoutUpdatesInput>
  }

  export type PageCreateNestedOneWithoutPresenceInput = {
    create?: XOR<PageCreateWithoutPresenceInput, PageUncheckedCreateWithoutPresenceInput>
    connectOrCreate?: PageCreateOrConnectWithoutPresenceInput
    connect?: PageWhereUniqueInput
  }

  export type PageUpdateOneRequiredWithoutPresenceNestedInput = {
    create?: XOR<PageCreateWithoutPresenceInput, PageUncheckedCreateWithoutPresenceInput>
    connectOrCreate?: PageCreateOrConnectWithoutPresenceInput
    upsert?: PageUpsertWithoutPresenceInput
    connect?: PageWhereUniqueInput
    update?: XOR<XOR<PageUpdateToOneWithWhereWithoutPresenceInput, PageUpdateWithoutPresenceInput>, PageUncheckedUpdateWithoutPresenceInput>
  }

  export type UserCreateNestedOneWithoutApiTokensInput = {
    create?: XOR<UserCreateWithoutApiTokensInput, UserUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutApiTokensNestedInput = {
    create?: XOR<UserCreateWithoutApiTokensInput, UserUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiTokensInput
    upsert?: UserUpsertWithoutApiTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApiTokensInput, UserUpdateWithoutApiTokensInput>, UserUncheckedUpdateWithoutApiTokensInput>
  }

  export type OAuthClientCreateredirectUrisInput = {
    set: string[]
  }

  export type OAuthClientCreategrantTypesInput = {
    set: string[]
  }

  export type OAuthClientCreatescopesInput = {
    set: string[]
  }

  export type OAuthAuthorizationCodeCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput> | OAuthTokenCreateWithoutClientInput[] | OAuthTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutClientInput | OAuthTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthTokenCreateManyClientInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput> | OAuthTokenCreateWithoutClientInput[] | OAuthTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutClientInput | OAuthTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthTokenCreateManyClientInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type OAuthClientUpdateredirectUrisInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdategrantTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput> | OAuthTokenCreateWithoutClientInput[] | OAuthTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutClientInput | OAuthTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutClientInput | OAuthTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthTokenCreateManyClientInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutClientInput | OAuthTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutClientInput | OAuthTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput> | OAuthTokenCreateWithoutClientInput[] | OAuthTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutClientInput | OAuthTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutClientInput | OAuthTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthTokenCreateManyClientInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutClientInput | OAuthTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutClientInput | OAuthTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeCreatescopesInput = {
    set: string[]
  }

  export type OAuthClientCreateNestedOneWithoutCodesInput = {
    create?: XOR<OAuthClientCreateWithoutCodesInput, OAuthClientUncheckedCreateWithoutCodesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutCodesInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauthGrantsInput = {
    create?: XOR<UserCreateWithoutOauthGrantsInput, UserUncheckedCreateWithoutOauthGrantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthGrantsInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthAuthorizationCodeUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdateOneRequiredWithoutCodesNestedInput = {
    create?: XOR<OAuthClientCreateWithoutCodesInput, OAuthClientUncheckedCreateWithoutCodesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutCodesInput
    upsert?: OAuthClientUpsertWithoutCodesInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutCodesInput, OAuthClientUpdateWithoutCodesInput>, OAuthClientUncheckedUpdateWithoutCodesInput>
  }

  export type UserUpdateOneRequiredWithoutOauthGrantsNestedInput = {
    create?: XOR<UserCreateWithoutOauthGrantsInput, UserUncheckedCreateWithoutOauthGrantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthGrantsInput
    upsert?: UserUpsertWithoutOauthGrantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthGrantsInput, UserUpdateWithoutOauthGrantsInput>, UserUncheckedUpdateWithoutOauthGrantsInput>
  }

  export type OAuthTokenCreatescopesInput = {
    set: string[]
  }

  export type OAuthClientCreateNestedOneWithoutTokensInput = {
    create?: XOR<OAuthClientCreateWithoutTokensInput, OAuthClientUncheckedCreateWithoutTokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutTokensInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauthTokensInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthTokenUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdateOneRequiredWithoutTokensNestedInput = {
    create?: XOR<OAuthClientCreateWithoutTokensInput, OAuthClientUncheckedCreateWithoutTokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutTokensInput
    upsert?: OAuthClientUpsertWithoutTokensInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutTokensInput, OAuthClientUpdateWithoutTokensInput>, OAuthClientUncheckedUpdateWithoutTokensInput>
  }

  export type UserUpdateOneRequiredWithoutOauthTokensNestedInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    upsert?: UserUpsertWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthTokensInput, UserUpdateWithoutOauthTokensInput>, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceCreateWithoutOwnerInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput>
  }

  export type WorkspaceCreateManyOwnerInputEnvelope = {
    data: WorkspaceCreateManyOwnerInput | WorkspaceCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceMemberCreateWithoutUserInput = {
    id?: string
    role?: string
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutUserInput = {
    id?: string
    workspaceId: string
    role?: string
    joinedAt?: Date | string
  }

  export type WorkspaceMemberCreateOrConnectWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberCreateManyUserInputEnvelope = {
    data: WorkspaceMemberCreateManyUserInput | WorkspaceMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutCreatedByInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutCreatedByInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput>
  }

  export type PageCreateManyCreatedByInputEnvelope = {
    data: PageCreateManyCreatedByInput | PageCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ApiTokenCreateWithoutUserInput = {
    id?: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiTokenCreateOrConnectWithoutUserInput = {
    where: ApiTokenWhereUniqueInput
    create: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput>
  }

  export type ApiTokenCreateManyUserInputEnvelope = {
    data: ApiTokenCreateManyUserInput | ApiTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAuthorizationCodeCreateWithoutUserInput = {
    id?: string
    codeHash: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
    client: OAuthClientCreateNestedOneWithoutCodesInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateWithoutUserInput = {
    id?: string
    codeHash: string
    clientId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeCreateOrConnectWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    create: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeCreateManyUserInputEnvelope = {
    data: OAuthAuthorizationCodeCreateManyUserInput | OAuthAuthorizationCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutUserInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    client: OAuthClientCreateNestedOneWithoutTokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutUserInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    clientId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenCreateManyUserInputEnvelope = {
    data: OAuthTokenCreateManyUserInput | OAuthTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type WorkspaceUpsertWithWhereUniqueWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    update: XOR<WorkspaceUpdateWithoutOwnerInput, WorkspaceUncheckedUpdateWithoutOwnerInput>
    create: XOR<WorkspaceCreateWithoutOwnerInput, WorkspaceUncheckedCreateWithoutOwnerInput>
  }

  export type WorkspaceUpdateWithWhereUniqueWithoutOwnerInput = {
    where: WorkspaceWhereUniqueInput
    data: XOR<WorkspaceUpdateWithoutOwnerInput, WorkspaceUncheckedUpdateWithoutOwnerInput>
  }

  export type WorkspaceUpdateManyWithWhereWithoutOwnerInput = {
    where: WorkspaceScalarWhereInput
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyWithoutOwnerInput>
  }

  export type WorkspaceScalarWhereInput = {
    AND?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
    OR?: WorkspaceScalarWhereInput[]
    NOT?: WorkspaceScalarWhereInput | WorkspaceScalarWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    slug?: StringFilter<"Workspace"> | string
    description?: StringNullableFilter<"Workspace"> | string | null
    ownerId?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutUserInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkspaceMemberScalarWhereInput = {
    AND?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    OR?: WorkspaceMemberScalarWhereInput[]
    NOT?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    id?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    role?: StringFilter<"WorkspaceMember"> | string
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
  }

  export type PageUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutCreatedByInput, PageUncheckedUpdateWithoutCreatedByInput>
    create: XOR<PageCreateWithoutCreatedByInput, PageUncheckedCreateWithoutCreatedByInput>
  }

  export type PageUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutCreatedByInput, PageUncheckedUpdateWithoutCreatedByInput>
  }

  export type PageUpdateManyWithWhereWithoutCreatedByInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    id?: StringFilter<"Page"> | string
    title?: StringFilter<"Page"> | string
    slug?: StringFilter<"Page"> | string
    content?: StringNullableFilter<"Page"> | string | null
    icon?: StringNullableFilter<"Page"> | string | null
    coverImage?: StringNullableFilter<"Page"> | string | null
    workspaceId?: StringFilter<"Page"> | string
    createdById?: StringNullableFilter<"Page"> | string | null
    parentId?: StringNullableFilter<"Page"> | string | null
    shareType?: StringFilter<"Page"> | string
    shareToken?: StringNullableFilter<"Page"> | string | null
    ydoc?: BytesNullableFilter<"Page"> | Bytes | null
    ydocSeq?: BigIntFilter<"Page"> | bigint | number
    version?: IntFilter<"Page"> | number
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
  }

  export type ApiTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiTokenWhereUniqueInput
    update: XOR<ApiTokenUpdateWithoutUserInput, ApiTokenUncheckedUpdateWithoutUserInput>
    create: XOR<ApiTokenCreateWithoutUserInput, ApiTokenUncheckedCreateWithoutUserInput>
  }

  export type ApiTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiTokenWhereUniqueInput
    data: XOR<ApiTokenUpdateWithoutUserInput, ApiTokenUncheckedUpdateWithoutUserInput>
  }

  export type ApiTokenUpdateManyWithWhereWithoutUserInput = {
    where: ApiTokenScalarWhereInput
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type ApiTokenScalarWhereInput = {
    AND?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    OR?: ApiTokenScalarWhereInput[]
    NOT?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    userId?: StringFilter<"ApiToken"> | string
    name?: StringFilter<"ApiToken"> | string
    tokenHash?: StringFilter<"ApiToken"> | string
    prefix?: StringFilter<"ApiToken"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
  }

  export type OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    update: XOR<OAuthAuthorizationCodeUpdateWithoutUserInput, OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    data: XOR<OAuthAuthorizationCodeUpdateWithoutUserInput, OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput = {
    where: OAuthAuthorizationCodeScalarWhereInput
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthAuthorizationCodeScalarWhereInput = {
    AND?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
    OR?: OAuthAuthorizationCodeScalarWhereInput[]
    NOT?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
    id?: StringFilter<"OAuthAuthorizationCode"> | string
    codeHash?: StringFilter<"OAuthAuthorizationCode"> | string
    clientId?: StringFilter<"OAuthAuthorizationCode"> | string
    userId?: StringFilter<"OAuthAuthorizationCode"> | string
    redirectUri?: StringFilter<"OAuthAuthorizationCode"> | string
    scopes?: StringNullableListFilter<"OAuthAuthorizationCode">
    codeChallenge?: StringFilter<"OAuthAuthorizationCode"> | string
    codeChallengeMethod?: StringFilter<"OAuthAuthorizationCode"> | string
    resource?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthTokenScalarWhereInput = {
    AND?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    OR?: OAuthTokenScalarWhereInput[]
    NOT?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    id?: StringFilter<"OAuthToken"> | string
    accessTokenHash?: StringFilter<"OAuthToken"> | string
    refreshTokenHash?: StringNullableFilter<"OAuthToken"> | string | null
    clientId?: StringFilter<"OAuthToken"> | string
    userId?: StringFilter<"OAuthToken"> | string
    scopes?: StringNullableListFilter<"OAuthToken">
    resource?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeFilter<"OAuthToken"> | Date | string
    refreshExpiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    lastUsedAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
  }

  export type UserCreateWithoutWorkspacesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkspacesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkspacesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
  }

  export type WorkspaceMemberCreateWithoutWorkspaceInput = {
    id?: string
    role?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkspaceMembershipsInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    userId: string
    role?: string
    joinedAt?: Date | string
  }

  export type WorkspaceMemberCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberCreateManyWorkspaceInputEnvelope = {
    data: WorkspaceMemberCreateManyWorkspaceInput | WorkspaceMemberCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutWorkspaceInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput>
  }

  export type PageCreateManyWorkspaceInputEnvelope = {
    data: PageCreateManyWorkspaceInput | PageCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceInviteCreateWithoutWorkspaceInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WorkspaceInviteUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WorkspaceInviteCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceInviteWhereUniqueInput
    create: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceInviteCreateManyWorkspaceInputEnvelope = {
    data: WorkspaceInviteCreateManyWorkspaceInput | WorkspaceInviteCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkspacesInput = {
    update: XOR<UserUpdateWithoutWorkspacesInput, UserUncheckedUpdateWithoutWorkspacesInput>
    create: XOR<UserCreateWithoutWorkspacesInput, UserUncheckedCreateWithoutWorkspacesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspacesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspacesInput, UserUncheckedUpdateWithoutWorkspacesInput>
  }

  export type UserUpdateWithoutWorkspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type PageUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutWorkspaceInput, PageUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput>
  }

  export type PageUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutWorkspaceInput, PageUncheckedUpdateWithoutWorkspaceInput>
  }

  export type PageUpdateManyWithWhereWithoutWorkspaceInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceInviteWhereUniqueInput
    update: XOR<WorkspaceInviteUpdateWithoutWorkspaceInput, WorkspaceInviteUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceInviteCreateWithoutWorkspaceInput, WorkspaceInviteUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceInviteWhereUniqueInput
    data: XOR<WorkspaceInviteUpdateWithoutWorkspaceInput, WorkspaceInviteUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput = {
    where: WorkspaceInviteScalarWhereInput
    data: XOR<WorkspaceInviteUpdateManyMutationInput, WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type WorkspaceInviteScalarWhereInput = {
    AND?: WorkspaceInviteScalarWhereInput | WorkspaceInviteScalarWhereInput[]
    OR?: WorkspaceInviteScalarWhereInput[]
    NOT?: WorkspaceInviteScalarWhereInput | WorkspaceInviteScalarWhereInput[]
    id?: StringFilter<"WorkspaceInvite"> | string
    email?: StringFilter<"WorkspaceInvite"> | string
    workspaceId?: StringFilter<"WorkspaceInvite"> | string
    token?: StringFilter<"WorkspaceInvite"> | string
    expiresAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
    createdAt?: DateTimeFilter<"WorkspaceInvite"> | Date | string
  }

  export type UserCreateWithoutWorkspaceMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkspaceMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkspaceMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspaceMembershipsInput, UserUncheckedCreateWithoutWorkspaceMembershipsInput>
  }

  export type WorkspaceCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutMembersInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutWorkspaceMembershipsInput = {
    update: XOR<UserUpdateWithoutWorkspaceMembershipsInput, UserUncheckedUpdateWithoutWorkspaceMembershipsInput>
    create: XOR<UserCreateWithoutWorkspaceMembershipsInput, UserUncheckedCreateWithoutWorkspaceMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspaceMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspaceMembershipsInput, UserUncheckedUpdateWithoutWorkspaceMembershipsInput>
  }

  export type UserUpdateWithoutWorkspaceMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspaceMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkspaceUpsertWithoutMembersInput = {
    update: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutMembersInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type WorkspaceUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateWithoutInvitesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutInvitesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutInvitesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutInvitesInput, WorkspaceUncheckedCreateWithoutInvitesInput>
  }

  export type WorkspaceUpsertWithoutInvitesInput = {
    update: XOR<WorkspaceUpdateWithoutInvitesInput, WorkspaceUncheckedUpdateWithoutInvitesInput>
    create: XOR<WorkspaceCreateWithoutInvitesInput, WorkspaceUncheckedCreateWithoutInvitesInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutInvitesInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutInvitesInput, WorkspaceUncheckedUpdateWithoutInvitesInput>
  }

  export type WorkspaceUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateWithoutPagesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutWorkspacesInput
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutPagesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    invites?: WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutPagesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
  }

  export type UserCreateWithoutPagesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPagesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
  }

  export type PageCreateWithoutChildrenInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdBy?: UserCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutChildrenInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutChildrenInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
  }

  export type PageCreateWithoutParentInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdBy?: UserCreateNestedOneWithoutPagesInput
    children?: PageCreateNestedManyWithoutParentInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutParentInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutParentInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput>
  }

  export type PageCreateManyParentInputEnvelope = {
    data: PageCreateManyParentInput | PageCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type PageUpdateCreateWithoutPageInput = {
    seq?: bigint | number
    update: Bytes
    clientId: string
    createdAt?: Date | string
  }

  export type PageUpdateUncheckedCreateWithoutPageInput = {
    seq?: bigint | number
    update: Bytes
    clientId: string
    createdAt?: Date | string
  }

  export type PageUpdateCreateOrConnectWithoutPageInput = {
    where: PageUpdateWhereUniqueInput
    create: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput>
  }

  export type PageUpdateCreateManyPageInputEnvelope = {
    data: PageUpdateCreateManyPageInput | PageUpdateCreateManyPageInput[]
    skipDuplicates?: boolean
  }

  export type PagePresenceCreateWithoutPageInput = {
    id?: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
  }

  export type PagePresenceUncheckedCreateWithoutPageInput = {
    id?: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
  }

  export type PagePresenceCreateOrConnectWithoutPageInput = {
    where: PagePresenceWhereUniqueInput
    create: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput>
  }

  export type PagePresenceCreateManyPageInputEnvelope = {
    data: PagePresenceCreateManyPageInput | PagePresenceCreateManyPageInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutPagesInput = {
    update: XOR<WorkspaceUpdateWithoutPagesInput, WorkspaceUncheckedUpdateWithoutPagesInput>
    create: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutPagesInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutPagesInput, WorkspaceUncheckedUpdateWithoutPagesInput>
  }

  export type WorkspaceUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutWorkspacesNestedInput
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserUpsertWithoutPagesInput = {
    update: XOR<UserUpdateWithoutPagesInput, UserUncheckedUpdateWithoutPagesInput>
    create: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPagesInput, UserUncheckedUpdateWithoutPagesInput>
  }

  export type UserUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PageUpsertWithoutChildrenInput = {
    update: XOR<PageUpdateWithoutChildrenInput, PageUncheckedUpdateWithoutChildrenInput>
    create: XOR<PageCreateWithoutChildrenInput, PageUncheckedCreateWithoutChildrenInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutChildrenInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutChildrenInput, PageUncheckedUpdateWithoutChildrenInput>
  }

  export type PageUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUpsertWithWhereUniqueWithoutParentInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutParentInput, PageUncheckedUpdateWithoutParentInput>
    create: XOR<PageCreateWithoutParentInput, PageUncheckedCreateWithoutParentInput>
  }

  export type PageUpdateWithWhereUniqueWithoutParentInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutParentInput, PageUncheckedUpdateWithoutParentInput>
  }

  export type PageUpdateManyWithWhereWithoutParentInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutParentInput>
  }

  export type PageUpdateUpsertWithWhereUniqueWithoutPageInput = {
    where: PageUpdateWhereUniqueInput
    update: XOR<PageUpdateUpdateWithoutPageInput, PageUpdateUncheckedUpdateWithoutPageInput>
    create: XOR<PageUpdateCreateWithoutPageInput, PageUpdateUncheckedCreateWithoutPageInput>
  }

  export type PageUpdateUpdateWithWhereUniqueWithoutPageInput = {
    where: PageUpdateWhereUniqueInput
    data: XOR<PageUpdateUpdateWithoutPageInput, PageUpdateUncheckedUpdateWithoutPageInput>
  }

  export type PageUpdateUpdateManyWithWhereWithoutPageInput = {
    where: PageUpdateScalarWhereInput
    data: XOR<PageUpdateUpdateManyMutationInput, PageUpdateUncheckedUpdateManyWithoutPageInput>
  }

  export type PageUpdateScalarWhereInput = {
    AND?: PageUpdateScalarWhereInput | PageUpdateScalarWhereInput[]
    OR?: PageUpdateScalarWhereInput[]
    NOT?: PageUpdateScalarWhereInput | PageUpdateScalarWhereInput[]
    seq?: BigIntFilter<"PageUpdate"> | bigint | number
    pageId?: StringFilter<"PageUpdate"> | string
    update?: BytesFilter<"PageUpdate"> | Bytes
    clientId?: StringFilter<"PageUpdate"> | string
    createdAt?: DateTimeFilter<"PageUpdate"> | Date | string
  }

  export type PagePresenceUpsertWithWhereUniqueWithoutPageInput = {
    where: PagePresenceWhereUniqueInput
    update: XOR<PagePresenceUpdateWithoutPageInput, PagePresenceUncheckedUpdateWithoutPageInput>
    create: XOR<PagePresenceCreateWithoutPageInput, PagePresenceUncheckedCreateWithoutPageInput>
  }

  export type PagePresenceUpdateWithWhereUniqueWithoutPageInput = {
    where: PagePresenceWhereUniqueInput
    data: XOR<PagePresenceUpdateWithoutPageInput, PagePresenceUncheckedUpdateWithoutPageInput>
  }

  export type PagePresenceUpdateManyWithWhereWithoutPageInput = {
    where: PagePresenceScalarWhereInput
    data: XOR<PagePresenceUpdateManyMutationInput, PagePresenceUncheckedUpdateManyWithoutPageInput>
  }

  export type PagePresenceScalarWhereInput = {
    AND?: PagePresenceScalarWhereInput | PagePresenceScalarWhereInput[]
    OR?: PagePresenceScalarWhereInput[]
    NOT?: PagePresenceScalarWhereInput | PagePresenceScalarWhereInput[]
    id?: StringFilter<"PagePresence"> | string
    pageId?: StringFilter<"PagePresence"> | string
    userId?: StringFilter<"PagePresence"> | string
    name?: StringFilter<"PagePresence"> | string
    color?: StringFilter<"PagePresence"> | string
    updatedAt?: DateTimeFilter<"PagePresence"> | Date | string
  }

  export type PageCreateWithoutUpdatesInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdBy?: UserCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
    presence?: PagePresenceCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutUpdatesInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    presence?: PagePresenceUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutUpdatesInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutUpdatesInput, PageUncheckedCreateWithoutUpdatesInput>
  }

  export type PageUpsertWithoutUpdatesInput = {
    update: XOR<PageUpdateWithoutUpdatesInput, PageUncheckedUpdateWithoutUpdatesInput>
    create: XOR<PageCreateWithoutUpdatesInput, PageUncheckedCreateWithoutUpdatesInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutUpdatesInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutUpdatesInput, PageUncheckedUpdateWithoutUpdatesInput>
  }

  export type PageUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateWithoutPresenceInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdBy?: UserCreateNestedOneWithoutPagesInput
    parent?: PageCreateNestedOneWithoutChildrenInput
    children?: PageCreateNestedManyWithoutParentInput
    updates?: PageUpdateCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutPresenceInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: PageUncheckedCreateNestedManyWithoutParentInput
    updates?: PageUpdateUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutPresenceInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutPresenceInput, PageUncheckedCreateWithoutPresenceInput>
  }

  export type PageUpsertWithoutPresenceInput = {
    update: XOR<PageUpdateWithoutPresenceInput, PageUncheckedUpdateWithoutPresenceInput>
    create: XOR<PageCreateWithoutPresenceInput, PageUncheckedCreateWithoutPresenceInput>
    where?: PageWhereInput
  }

  export type PageUpdateToOneWithWhereWithoutPresenceInput = {
    where?: PageWhereInput
    data: XOR<PageUpdateWithoutPresenceInput, PageUncheckedUpdateWithoutPresenceInput>
  }

  export type PageUpdateWithoutPresenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutPresenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
  }

  export type UserCreateWithoutApiTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiTokensInput, UserUncheckedCreateWithoutApiTokensInput>
  }

  export type UserUpsertWithoutApiTokensInput = {
    update: XOR<UserUpdateWithoutApiTokensInput, UserUncheckedUpdateWithoutApiTokensInput>
    create: XOR<UserCreateWithoutApiTokensInput, UserUncheckedCreateWithoutApiTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApiTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApiTokensInput, UserUncheckedUpdateWithoutApiTokensInput>
  }

  export type UserUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthAuthorizationCodeCreateWithoutClientInput = {
    id?: string
    codeHash: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOauthGrantsInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateWithoutClientInput = {
    id?: string
    codeHash: string
    userId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeCreateOrConnectWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    create: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeCreateManyClientInputEnvelope = {
    data: OAuthAuthorizationCodeCreateManyClientInput | OAuthAuthorizationCodeCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutClientInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutClientInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    userId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutClientInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthTokenCreateManyClientInputEnvelope = {
    data: OAuthTokenCreateManyClientInput | OAuthTokenCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    update: XOR<OAuthAuthorizationCodeUpdateWithoutClientInput, OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    data: XOR<OAuthAuthorizationCodeUpdateWithoutClientInput, OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput = {
    where: OAuthAuthorizationCodeScalarWhereInput
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutClientInput, OAuthTokenUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthTokenCreateWithoutClientInput, OAuthTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutClientInput, OAuthTokenUncheckedUpdateWithoutClientInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutClientInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthClientCreateWithoutCodesInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    tokens?: OAuthTokenCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutCodesInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    tokens?: OAuthTokenUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutCodesInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutCodesInput, OAuthClientUncheckedCreateWithoutCodesInput>
  }

  export type UserCreateWithoutOauthGrantsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthGrantsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthGrantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthGrantsInput, UserUncheckedCreateWithoutOauthGrantsInput>
  }

  export type OAuthClientUpsertWithoutCodesInput = {
    update: XOR<OAuthClientUpdateWithoutCodesInput, OAuthClientUncheckedUpdateWithoutCodesInput>
    create: XOR<OAuthClientCreateWithoutCodesInput, OAuthClientUncheckedCreateWithoutCodesInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutCodesInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutCodesInput, OAuthClientUncheckedUpdateWithoutCodesInput>
  }

  export type OAuthClientUpdateWithoutCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: OAuthTokenUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokens?: OAuthTokenUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauthGrantsInput = {
    update: XOR<UserUpdateWithoutOauthGrantsInput, UserUncheckedUpdateWithoutOauthGrantsInput>
    create: XOR<UserCreateWithoutOauthGrantsInput, UserUncheckedCreateWithoutOauthGrantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthGrantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthGrantsInput, UserUncheckedUpdateWithoutOauthGrantsInput>
  }

  export type UserUpdateWithoutOauthGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthClientCreateWithoutTokensInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutTokensInput = {
    id?: string
    clientId: string
    clientSecretHash?: string | null
    name: string
    redirectUris?: OAuthClientCreateredirectUrisInput | string[]
    grantTypes?: OAuthClientCreategrantTypesInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    tokenEndpointAuthMethod?: string
    clientUri?: string | null
    logoUri?: string | null
    createdAt?: Date | string
    codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutTokensInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutTokensInput, OAuthClientUncheckedCreateWithoutTokensInput>
  }

  export type UserCreateWithoutOauthTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberCreateNestedManyWithoutUserInput
    pages?: PageCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    workspaces?: WorkspaceUncheckedCreateNestedManyWithoutOwnerInput
    workspaceMemberships?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatedByInput
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutUserInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
  }

  export type OAuthClientUpsertWithoutTokensInput = {
    update: XOR<OAuthClientUpdateWithoutTokensInput, OAuthClientUncheckedUpdateWithoutTokensInput>
    create: XOR<OAuthClientCreateWithoutTokensInput, OAuthClientUncheckedCreateWithoutTokensInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutTokensInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutTokensInput, OAuthClientUncheckedUpdateWithoutTokensInput>
  }

  export type OAuthClientUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    redirectUris?: OAuthClientUpdateredirectUrisInput | string[]
    grantTypes?: OAuthClientUpdategrantTypesInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    tokenEndpointAuthMethod?: StringFieldUpdateOperationsInput | string
    clientUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauthTokensInput = {
    update: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type UserUpdateWithoutOauthTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    pages?: PageUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    workspaces?: WorkspaceUncheckedUpdateManyWithoutOwnerNestedInput
    workspaceMemberships?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatedByNestedInput
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthGrants?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type WorkspaceCreateManyOwnerInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceMemberCreateManyUserInput = {
    id?: string
    workspaceId: string
    role?: string
    joinedAt?: Date | string
  }

  export type PageCreateManyCreatedByInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiTokenCreateManyUserInput = {
    id?: string
    name: string
    tokenHash: string
    prefix: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeCreateManyUserInput = {
    id?: string
    codeHash: string
    clientId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenCreateManyUserInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    clientId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    invites?: WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutCodesNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateManyWorkspaceInput = {
    id?: string
    userId: string
    role?: string
    joinedAt?: Date | string
  }

  export type PageCreateManyWorkspaceInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    createdById?: string | null
    parentId?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceInviteCreateManyWorkspaceInput = {
    id?: string
    email: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type WorkspaceMemberUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkspaceMembershipsNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    parent?: PageUpdateOneWithoutChildrenNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManyParentInput = {
    id?: string
    title?: string
    slug: string
    content?: string | null
    icon?: string | null
    coverImage?: string | null
    workspaceId: string
    createdById?: string | null
    shareType?: string
    shareToken?: string | null
    ydoc?: Bytes | null
    ydocSeq?: bigint | number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateCreateManyPageInput = {
    seq?: bigint | number
    update: Bytes
    clientId: string
    createdAt?: Date | string
  }

  export type PagePresenceCreateManyPageInput = {
    id?: string
    userId: string
    name: string
    color: string
    updatedAt?: Date | string
  }

  export type PageUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdBy?: UserUpdateOneWithoutPagesNestedInput
    children?: PageUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: PageUncheckedUpdateManyWithoutParentNestedInput
    updates?: PageUpdateUncheckedUpdateManyWithoutPageNestedInput
    presence?: PagePresenceUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    shareType?: StringFieldUpdateOperationsInput | string
    shareToken?: NullableStringFieldUpdateOperationsInput | string | null
    ydoc?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    ydocSeq?: BigIntFieldUpdateOperationsInput | bigint | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateUpdateWithoutPageInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateUncheckedUpdateWithoutPageInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateUncheckedUpdateManyWithoutPageInput = {
    seq?: BigIntFieldUpdateOperationsInput | bigint | number
    update?: BytesFieldUpdateOperationsInput | Bytes
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagePresenceUncheckedUpdateManyWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateManyClientInput = {
    id?: string
    codeHash: string
    userId: string
    redirectUri: string
    scopes?: OAuthAuthorizationCodeCreatescopesInput | string[]
    codeChallenge: string
    codeChallengeMethod?: string
    resource?: string | null
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthTokenCreateManyClientInput = {
    id?: string
    accessTokenHash: string
    refreshTokenHash?: string | null
    userId: string
    scopes?: OAuthTokenCreatescopesInput | string[]
    resource?: string | null
    expiresAt: Date | string
    refreshExpiresAt?: Date | string | null
    revokedAt?: Date | string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthGrantsNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    codeHash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthAuthorizationCodeUpdatescopesInput | string[]
    codeChallenge?: StringFieldUpdateOperationsInput | string
    codeChallengeMethod?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessTokenHash?: StringFieldUpdateOperationsInput | string
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: OAuthTokenUpdatescopesInput | string[]
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}