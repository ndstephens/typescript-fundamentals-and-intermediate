# Conditional Types

Conditional types allow for types to be expressed using a ternary syntax.

```ts
class Grill {
  startGas() {}
  stopGas() {}
}
class Oven {
  setTemperature(degrees: number) {}
}

type CookingDevice<T> = T extends 'grill' ? Grill : Oven; // <- conditional
// "grill" here is a literal type, not a value

let device1: CookingDevice<'grill'>;
// let device1: Grill

let device2: CookingDevice<'oven'>;
// let device2: Oven
```

<br>

The conditional has the same structure as a ternary:

```ts
condition ? exprIfTrue : exprIfFalse;
```

| part        | expression          |
| ----------- | ------------------- |
| condition   | `T extends "grill"` |
| exprIfTrue  | `Grill`             |
| exprIfFalse | `Oven`              |

<br>

> **_NOTE:_** the use of the `extends` keyword in the condition.
>
> You can think of it like a `>=` comparison (as in `more specific or equally specific`).
>
> Or like `T must be at least the literal type "grill"`
>
> Or "Does everything in `T` fit into `"grill"`?"
>
> Since `"grill"` is a literal type then `T`'s only `truthy` option is to be `"grill"`
>
> This is basically the same as a `Generic Constraint`...it's setting a minimum requirement

<br>

## Expressing conditions

`T extends conditional-type ? if-true : if-false`

If `T` is `more specific` than `conditional-type` then condition is `true`.

An object with multiple properties is `more specific` than an object with only one of those properties.

```ts
interface obj_1 {
  id: number;
  name: string;
  address: string;
}

// is more specific than

interface obj_2 {
  id: number;
}
```

That's why something like `obj_2` is often used as a `conditional-type` or `generic-constraint`.

So in the case of `objects`, having `more things means more specific`.

But in the case of `64 extends number`, `64` is `more specific because it has less things` than `number`.

<br>

| condition                                            | evaluate to: |
| ---------------------------------------------------- | ------------ |
| `64 extends number`                                  | true         |
| `number extends 64`                                  | false        |
| `string[] extends any`                               | true         |
| `string[] extends any[]`                             | true         |
| `never extends any`                                  | true         |
| `any extends any`                                    | true         |
| `Date extends {new (...args: any[]): any }`          | false        |
| `(typeof Date) extends {new (...args: any[]): any }` | true         |

<br>

`(typeof Date) extends {new (...args: any[]): any }` is `true` because:

- `typeof Date` refers to the class itself...the constructor (or the "factory") for Dates.
- `{new (...args: any[]): any }` refers to things that can be used with the `new` keyword (or things that are "new-able").
- `Date` refers to an `instance` of the class Date. It is created by using `new` with the Date class constructor, but `Date` as an `instance` is not "new-able".
