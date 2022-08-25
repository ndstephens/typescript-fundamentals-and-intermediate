# Generics

Generics are `type parameters`.

They are a way of defining types that are expressed in terms of other types.

<br>

> Often they're used as a mechanism of defining a relationship between the type of thing we **_pass to a function_**, and the type of thing **_returned from that function_**.

<br>

## Defining a type parameter

Type parameters can be thought of as "function arguments, but for types".

Just like how functions will return different values depending on the arguments you pass them...

> **_Generics will change their type depending on the type parameters you supply to them_**.

<br>

```ts
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};

  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element;
  });

  return dict;
}
```

<br>

> We get a different kind of dictionary returned out of `listToDict` **_depending on the type of the array we pass in_**.

<br>

### The TypeParam, and its usage to provide an argument type

- **`<T>` to the right of `listDict`**
  - means that the type of this function is now parameterized in terms of a type parameter `T`
  - which may change on a per-usage basis
- **`list: T[]` as a first argument**
  - means we accept a list of `T`‘s.
- **`idGen: (arg: T) => string`**
  - means this function better be setup to take as an input whatever type `T` is (whatever `list` is an array of) b/c that's the type that `arg` will be
  - we will get type-checking alignment between the `list` array and the `idGen` function
  - we will get the benefits of type-checking within the `idGen` function

<br>

> TypeScript will infer what `T` is, on a per-usage basis, depending on what kind of array we pass in.
>
> If we use a `string[]`, `T` will be `string`.
>
> If we use a `number[]`, `T` will be `number`.

<br>

#### Simpler example:

```ts
function wrapInArray<T>(arg: T): [T] {
  return [arg];
}
// function wrapInArray<T>(arg: T): [T]
```

In use:

```ts
wrapInArray(3);
// function wrapInArray<number>(arg: number): [number]

wrapInArray(new Date());
// function wrapInArray<Date>(arg: Date): [Date]

wrapInArray(new RegExp('/s/'));
// function wrapInArray<RegExp>(arg: RegExp): [RegExp]
```
