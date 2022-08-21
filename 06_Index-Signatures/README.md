# Index Signatures

We need to be careful when blindly accessing properties from an object typed with an `index signature`.

```ts
const phones: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {};

phones.fax.number; // <- does NOT give an error
```

Even though the constant `phones` has been assigned to an empty object, the `index signature` allows us to assume any property (such as `fax`) and provides it with type completions.

<br>

A safer implementation would be:

```ts
const phones: {
  [k: string]:
    | {
        country: string;
        area: string;
        number: string;
      }
    | undefined;
} = {};

phones.fax.number; // <- ERROR
phones.fax?.number; // <- OK
```

Here we need to first check if `fax` is a defined property on `phones` (can use an `if` statement, etc).
