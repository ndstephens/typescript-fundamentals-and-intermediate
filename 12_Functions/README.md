# Functions

## Callable types (aka Call signature)

Create a type alias (or interface) of a function (its param and return types):

> You will almost always use the `type alias` approach

```ts
// TYPE ALIAS
type TwoNumberCalc = (x: number, y: number) => number;

const subtract: TwoNumberCalc = (x, y) => x - y;

// INTERFACE
interface TwoNumberCalculation {
  (x: number, y: number): number;
}

const add: TwoNumberCalculation = (a, b) => a + b;
```

<br>

---

## `void`

`void` is a special type that’s specifically used to describe a function return **_type_**.

The return **_value_** of a `void` function is intended to be **_IGNORED_**.

In JavaScript, a function that doesn't appear to return any **_value_** actually returns `undefined`.

> A function returning `undefined` and a function's return type being set to `void` are not necessarily synonymous.

You can set any function's **_return type_** to `void` if you intend to ignore its return value.

```ts
function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000);
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000);
}

const values: number[] = [];
invokeInFourSeconds(() => values.push(4)); // <- ERROR
// Type 'number' is not assignable to type 'undefined'.
invokeInFiveSeconds(() => values.push(4));
```

> It happens that `Array.prototype.push` returns a number, and our `invokeInFourSeconds` function above is unhappy about this being returned from the callback.
