# Mapped Types

## Review of Index Signatures

First, recall `index signatures`. They're often used to loosely type out an object.

```ts
type Fruit = {
  name: string;
  color: string;
  mass: number;
};

type FruitBasket = {
  [k: string]: Fruit;
};

// Or used with Generics
type Dict<T> = {
  [k: string]: T;
  // [k: string]: T | undefined; // SAFER
};

const fruitCatalog: Dict<Fruit> = {};
fruitCatalog.pineapple; // <- allowed unless we use `T | undefined`
```

<br>

Index signature parameter types (`k`) can be an arbitrary (any) `string` or `number`.

You can **_NOT_** specify a more narrow subset of strings or numbers when using an index signature.

```ts
type MyFruits = { [key: 'apple' | 'cherry']: Fruit }; // <- ERROR
// Error: An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.
```

They are not allowed to be a literal type or a type parameter (generic).

For that we need Mapped Types.

---

<br>

## Mapped Types

Mapped types allow us to specify a specific subset of keys.

This then allows us to transform types by taking one type and making it another type in a very structured and deliberate way.

Think of mapped types as being analogous to the `map` function used with arrays (we'll see that in use later).

<br>

Here's how a very basic mapped type looks different than an index signature:

```ts
// Index Signature
{ [keyNameDoesntMatter: string]: ... }

// Mapped Type
{ [FruitKey in "apple" | "cherry"]: ... }
```

<br>

In the larger context:

```ts
type Fruit = {
  name: string;
  color: string;
  mass: number;
};

// mapped type
type MyRecord = { [FruitKey in 'apple' | 'cherry']: Fruit };

function printFruitCatalog(fruitCatalog: MyRecord) {
  fruitCatalog.cherry;
  fruitCatalog.apple;
  // (property) apple: Fruit

  fruitCatalog.pineapple; // <- ERROR
  // Error: Property 'pineapple' does not exist on type 'MyRecord'.
}
```

> **_NOTE:_** the `in` keyword in the mapped type.

<br>

`'apple' | 'cherry'` is the part we're looping over.

The key name (in this case `FruitKey`) will be important and come into use later with more complex usage of mapped types.

---

<br>

## Record

If we make our type a bit more generalized (with some `type params` instead of hardcoding `Fruit` and `"apple" | "cherry"` as shown below) we’ll arrive at a **_built-in utility type_** that comes with TypeScript.

```ts
- type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruit }

+ type MyRecord<KeyType, ValueType> = { [Key in KeyType]: ValueType }
```

Or more specifically:

```ts
type MyRecord<KeyType extends string, ValueType> = {
  [Key in KeyType]: ValueType;
};
```

<br>

Here’s the built-in TypeScript type, which matches this pretty much exactly:

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

You may notice the `keyof any` difference...it’s just `string | number | symbol`.
