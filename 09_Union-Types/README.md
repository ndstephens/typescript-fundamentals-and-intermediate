# Union Types

Union types in TypeScript can be described using the `|` (pipe) operator.

- Also conceptually thought of as the logical boolean operator `OR`.

Types in the union can have overlap (in the case of objects and tuples), but they don't have to.

- The possible overlap would be any similar properties that all objects in the union share.

```ts
const shared: Error | { name: string; email: string };

shared.name; // <- works b/c both object have a property "name" of type "string"
```

- When a value has a type that includes a union, we are only able to use the “common behavior” that’s guaranteed to be there.
- That's not always helpful b/c you may in fact need to know EXACTLY which type `shared` is.
  - To achieve that, we need to "narrow" or "separate" the potential possibilities for our value.

---

## Type Guards & Discriminated Unions

```ts
function flipCoin(): 'heads' | 'tails' {
  if (Math.random() > 0.5) return 'heads';
  return 'tails';
}

function maybeGetUserInfo():
  | ['error', Error]
  | ['success', { name: string; email: string }] {
  if (flipCoin() === 'heads') {
    return ['success', { name: 'Mike North', email: 'mike@example.com' }];
  } else {
    return ['error', new Error('The coin landed on TAILS :(')];
  }
}

const outcome = maybeGetUserInfo();

// TYPE of "outcome"
// -----------------
// const outcome:
//   | ['error', Error]
//   | ['success', { name: string; email: string; } ];
```

The destructured values from `outcome` could be one of two types when looked at separately:

```ts
const outcome = maybeGetUserInfo();

const [first, second] = outcome;

// first: "error" | "success"
//
// second: Error | {
//     name: string;
//     email: string;
// }
```

<br>

### Narrow with a type guard

Type guards are expressions which, when used with control flow statements, allow us to identify a more specific type for a particular value.

We could run a check on `second` and verify if either `second instance of Error` or `email in second`.

But a simpler approach is using the string value of `first` to determine the value of `second` in `outcome`.

<br>

### Discriminated Unions (aka "Tagged" Union)

Use a property in an object or a value in a tuple as a "key" to run a type guard.

**_TypeScript understands that the first and second positions of our tuple are linked._**

Therefore, if we can successfully identify the first part of the tuple we'll know what the second part of it is.

```ts
const outcome = maybeGetUserInfo();
if (outcome[0] === 'error') {
  // In this branch of your code, second is an Error
  outcome;
  // const outcome: ["error", Error]
} else {
  // In this branch of your code, second is the user info
  outcome;
  // const outcome: ["success", {
  //   name: string;
  //   email: string;
  // }]
}
```
