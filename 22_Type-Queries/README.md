# Type Queries

Type queries allow us to obtain type information from values.

<br>

## `keyof`

The `keyof` type query allows you to obtain types representing all property keys on a given interface.

```ts
type DatePropertyNames = keyof Date;
```

<br>

Not all keys on `Date` are `string`'s. One is a `symbol`.

We can separate out the different key types using the intersection operator (`&`).

- "I only want to see the keys that are of type `string`", or...
- "I only want to see the keys that are of type `symbol`"

With the intersection operator we're left with only the sub-part of the `keyof Date` keys that are also included by `string` or `symbol`.

```ts
type DatePropertyNames = keyof Date;

type DateStringPropertyNames = DatePropertyNames & string;
// type DateStringPropertyNames = "toString" | "toDateString" | ...

type DateSymbolPropertyNames = DatePropertyNames & symbol;
// type DateSymbolPropertyNames = typeof Symbol.toPrimitive
```

---

<br>

## `typeof`

The `typeof` type query allows you to extract a type from a value.

```ts
async function main() {
  const apiResponse = await Promise.all([
    fetch('https://example.com'),
    Promise.resolve('Titanium White'),
  ]);

  type ApiResponseType = typeof apiResponse;
  // type ApiResponseType = [Response, string];
}
```

<br>

### with Classes

Classes are values and types, at the same time.

A common use of `typeof` is to obtain a type representing the “static side” (or constructor) of a class (meaning: constructor, `static` properties, and other things not present on an _instance_ of the class).

```ts
class Fruit {
  constructor(
    public readonly name: string,
    public readonly mass: number,
    public readonly color: string
  ) {}

  static createBanana() {
    return new Fruit('banana', 108, 'yellow');
  }
}

const MyFruit = Fruit;
// const MyFruit: typeof Fruit;

const banana = Fruit.createBanana();
// const banana: Fruit;

const apple = new Fruit('apple', 98, 'red');
// const apple: Fruit;
```

<br>

> `MyFruit`, the class (constructor) is of type `typeof Fruit`, where instances are of type `Fruit`
