# Tuples

TypeScript, by its nature, will try to infer types as specifically as possible without getting in our way.

It will always assume a list to be an `array`.

We need to explicitly state the type of a `tuple` whenever we declare one.

```ts
let myCar = [2002, 'Toyota', 'Corolla'];

// let myCar: (string | number)[]
```

<br>

To make it a `tuple`:

```ts
let myCar: [number, string, string] = [2002, 'Toyota', 'Corolla'];

// let myCar: [number, string, string]
```

---

## Limitations

> As of `TypeScript 4.3` there’s limited support for enforcing tuple length constraints.

For example, you get the support you’d hope for on assignment:

```ts
const numPair: [number, number] = [4, 5, 6]; // <- ERROR
```

> Error msg: Type '[number, number, number]' is not assignable to type '[number, number]'. Source has 3 element(s) but target allows only 2.

but not around `push` and `pop`:

```ts
const numPair: [number, number] = [4, 5];
numPair.push(6); // [4, 5, 6]
numPair.pop(); // [4, 5]
numPair.pop(); // [4]
numPair.pop(); // []
```
