# Variables and Values

## Variable Declarations and Inference

In TypeScript, variables are "born" with their types.

```ts
// when using "let", TS will infer a more general type
// allows for value reassignment
let age = 6; // let age: number

// when using "const", TS will infer a more specific type
// can NOT be reassigned and "number" is an immutable value type
const age = 6; // const age: 6  <- literal type
```

The type `6` is call a **_literal type_**. It's not just any `number` type, it's a `number` that's also a `6`.

> Inference is not so specific as to get in the way of common behavior.

For example, the `let` variable declaration above could have assumed `age` to be of type `6`, but this would have interfered with our ability to set this re-assignable variable to `7` or `8`.

---

<br>

## Objects

This is why object properties will be non-literal types when inferred...b/c object properties are mutable.

If you want them to be `literal types`, then finish with `as const`:

```ts
const obj = {
  name: 'Joe',
  age: 30,
};
// const obj: {
//   name: string;
//   age: number;
// }

const obj = {
  name: 'Joe',
  age: 30,
} as const;
// const obj: {
//   readonly name: "Joe";
//   readonly age: 30;
// }
```
