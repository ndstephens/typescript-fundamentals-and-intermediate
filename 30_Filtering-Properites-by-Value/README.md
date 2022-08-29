# Filtering Properties by _value_

> **_NOTE:_** See `Mapped-Index-Types` for filtering properties by `key`.
>
> It's basically using the `Pick` utility helper built-in to TS.

<br>

### Example of filtering by _key_, using template literal types

Filter by keys of `Document` that are `strings` and start with `query`:

```ts
type DocKeys = Extract<keyof Document, `query${string}`>;

type KeyFilteredDoc = {
  [K in DocKeys]: Document[K];
};
// type KeyFilteredDoc = {
//     queryCommandEnabled: (commandId: string) => boolean;
//     queryCommandState: (commandId: string) => boolean;
//     queryCommandSupported: (commandId: string) => boolean;
//     queryCommandValue: (commandId: string) => string;
//     querySelector: {
//         ...;
//     };
//     querySelectorAll: {
//         ...;
//     };
// }
```

<br>

This returns all the properties on `Document` whose key begins with `query`.

Those property values can be any number of things.

Some are methods that return booleans, or strings, or Elements, or arrays of Elements, etc.

<br>

**_What if we wanted to instead filter by the property value type?_**

**_What if we only wanted properties whose value is a method that returns an Element or an array of Elements?_**

---

<br>

## Filtering by _value_

How do we filter based on a property's value type (`Document[K]`)?

<br>

**_The proper steps are:_**

- First, filter the keys.
- Then, use those keys to build a mapped index type with `Pick`.

<br>

**_The solution uses the following techniques:_**

- mapped index types
- conditional types
- never
- index access types
- intersection operator
- Pick utility type

---

> **_Let's search for properties whose value is a method that returns an `Element` or `Element[]`_**

---

### First, a hardcoded example using `Document`

```ts
type RelevantDocumentKeys = {
  [K in keyof Document]: Document[K] extends (
    ...args: any[]
  ) => Element | Element[]
    ? K
    : never;
}[keyof Document] &
  keyof Document;

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>;
```

<br>

### Next, using type parameters (Generic version)

```ts
// Get keys of type T whose values are assignable to type U
type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T] &
  keyof T;

type RelevantDocumentKeys = FilteredKeys<
  Document,
  (...args: any[]) => Element | Element[]
>;

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>;
```

<br>

### Next, the step-by-step explanation (explained using `Document`)

---

#### 1. Use a `mapped index type` with a `conditional type` and `never`

- Map through every `key` (`K`) in `Document` (`T`)

  - `[K in keyof Document]:`
  - `[K in keyof T]:`

- Use a `conditional` to check if the `value` associated with that `key` (`Document[K]` or `T[K]`) matches or `extends` a method that returns `Element | Element[]`...or whatever value you're checking against (`U`)

  - `Document[K] extends (...args: any[]) => Element | Element[]`
  - `T[K] extends U`

- If the `conditional` check is `true` then set the `value` to the `key` (`K`), otherwise set the value to `never`

  - `? K : never`

- The result of this is an object type that has all the same `keys` as `Document`.
  - However the `values` are either the same `string literal type` as the `key` if the `conditional` was true, or the `value` is set to `never`

```ts
// Generic
type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
};

// Hardcoded with `Document`
type RelevantDocumentKeys = {
  [K in keyof Document]: Document[K] extends (
    ...args: any[]
  ) => Element | Element[]
    ? K
    : never;
};

// type RelevantDocumentKeys = {
//     readonly URL: never;
//     alinkColor: never;
//     readonly all: never;
//     readonly anchors: never;
//     readonly applets: never;
//     bgColor: never;
//     body: never;
//     readonly characterSet: never;
//     readonly charset: never;
//     ... 244 more ...;
//     adoptNode: 'adoptNode';      <- A MATCH !!!
//     evaluate: never;
// }
```

<br>

#### 2. Next use an `indexed access type`

- The object type is all the `keys` of `Document` and their `values` are either the same `string literal types` as the `key name` or `never`

- The `index` is a `union` of all the `keys` of `Document` as `string literal types`

  - `{...}[keyof Document]`
  - `{...}[keyof T]`

- Therefore the result is a `union` of all the `values`
  - Remember, those `values` either match some of the `keys` or are `never`
  - `never` values simply disappear from the union (`'foo' | never = 'foo'`)
  - Therefore the result is a `union` of the `keys` that matched the `conditional` (and a single instance of `undefined` for some reason)

```ts
// Generic
type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Hardcoded with `Document`
type RelevantDocumentKeys = {
  [K in keyof Document]: Document[K] extends (
    ...args: any[]
  ) => Element | Element[]
    ? K
    : never;
}[keyof Document];

// type RelevantDocumentKeys =
//   | 'adoptNode'
//   | 'createElement'
//   | 'createElementNS'
//   | 'importNode'
//   | 'appendChild'
//   | 'insertBefore'
//   | 'removeChild'
//   | 'replaceChild'
//   | 'elementsFromPoint'
//   | 'querySelector'
//   | undefined;      <- 'undefined' from all the 'never' values
```

<br>

#### 3. Next use an `intersection operator` (`&`)

- Currently the result is a `union` of the filtered `keys` and one instance of `undefined`
- Intersect the result with a `union` of all the `keys` of `Document`

  - `& keyof Document`
  - `& keyof T`

- Only those `keys` that exist in both `unions` will be returned
- Since `undefined` does not exist in the `union` to the right of the `intersection operator` (`&`) it will be excluded from the final result
- Could also simply do an `intersection` with the type `string` to remove `undefined`, but using `& keyof T` is safer and more explicit
- The final result is a `union` of `string literal types` that correspond to the `keys` of `Document` whose `value` matched the `conditional`

```ts
// Generic
type FilteredKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T] &
  keyof T;

// Hardcoded with `Document`
type RelevantDocumentKeys = {
  [K in keyof Document]: Document[K] extends (
    ...args: any[]
  ) => Element | Element[]
    ? K
    : never;
}[keyof Document] &
  keyof Document;

// type RelevantDocumentKeys =
//   | 'adoptNode'
//   | 'createElement'
//   | 'createElementNS'
//   | 'importNode'
//   | 'appendChild'
//   | 'insertBefore'
//   | 'removeChild'
//   | 'replaceChild'
//   | 'elementsFromPoint'
//   | 'querySelector';
```

<br>

#### 4. Finally use `Pick` to create a mapped indexed type

```ts
// If previously used the Generic...
type RelevantDocumentKeys = FilteredKeys<
  Document,
  (...args: any[]) => Element | Element[]
>;

// Generic approach or hardcoded with `Document`
type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>;

// type ValueFilteredDoc = {
//   adoptNode: <T extends Node>(node: T) => T;
//   createElement: {
//     <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions | undefined): HTMLElementTagNameMap[K];
//     <K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions | undefined): HTMLElementDeprecatedTagNameMap[K];
//         (tagName: string, options?: ElementCreationOptions | undefined): HTMLElement;
//     };
//   ... 7 more ...;
//   querySelector: {
//     ...;
//   };
// }
```
