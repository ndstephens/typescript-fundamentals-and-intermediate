# Type Guards and Narrowing

## Built-in type guards

```ts
let value:
  | Date
  | 'pineapple'
  | null
  | undefined
  | [number]
  | { dateRange: [Date, Date] };

// instanceof
if (value instanceof Date) {
  value;
  // let value: Date
}
// typeof
else if (typeof value === 'string') {
  value;
  // let value: "pineapple"
}
// Specific value check
else if (value === null) {
  value;
  // let value: null
}
// Truthy/falsy check (BE CAREFUL WITH THESE B/C OF "FALSEY" VALUES)
else if (!value) {
  value;
  // let value: undefined
}
// Some built-in functions
else if (Array.isArray(value)) {
  value;
  // let value: [number]
}
// Property presence check
else if ('dateRange' in value) {
  value;
  // let value: {
  //     dateRange: [Date, Date];
  // }
  // Exhaustive conditional check
} else {
  value;
  // let value: never
}
```

---

<br>

## User-defined type guards

### `is`

`value is Type`

Pay special attention to the `return type` of the type-guard function `isCarLike`:

`: valueToTest is CarLike`

If the type-guard function `isCarLike` returns `true` then the variable/value sent to it as an argument (`maybeCar` in this case) will be cast as having the type `CarLike`.

We use the type guard function with a conditional:

```ts
interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: unknown;

// the guard
function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'make' in valueToTest &&
    typeof valueToTest['make'] === 'string' &&
    'model' in valueToTest &&
    typeof valueToTest['model'] === 'string' &&
    'year' in valueToTest &&
    typeof valueToTest['year'] === 'number'
  );
}

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar;
  // let maybeCar: CarLike
}
```

<br>

You can choose to handle a failed type-guard (`isCarLike` returns `false`) in an `else` block:

```ts
if (isCarLike(maybeCar)) {
  maybeCar;
} else {
  throw new Error(`Value does not appear to be CarLike: ${valueToTest}`);
  // or any other block of code
}
```

<br>

Or just let the main code execution continue and `maybeCar` will remain with the type `unknown`.

---

<br>

## Writing high-quality guards

Basically just be mindful when checking falsey values with type guards.

Values like `""` and `0` could possibly cause incorrect type castings due to their falsey values.

```ts
function isNull(val: any): val is null {
  return !val;
}
```
