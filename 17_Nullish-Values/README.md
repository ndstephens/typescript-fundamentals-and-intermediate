# Nullish Values

## `null`

`null` means there is a value, and that value is nothing.

The value is _intended_ to be nothing...meaning it was set to nothing with intention.

```ts
const userInfo = {
  name: 'Mike',
  email: 'mike@example.com',
  secondaryEmail: null, // user has no secondary email
};
```

---

<br>

## `undefined`

`undefined` means the value isn't available (yet?).

It is an unambiguous indication that _there may be something different there in the future_.

```ts
const formInProgress = {
  createdAt: new Date(),
  data: new FormData(),
  completedAt: undefined,
};
function submitForm() {
  formInProgress.completedAt = new Date();
}
```

---

<br>

## `void`

`void` should be used exclusively to describe that a function's return value should be **ignored**.

```ts
console.log(`console.log returns nothing.`);
// (method) Console.log(...data: any[]): void
```

---

<br>

## `!` - Non-null assertion operator

The non-null assertion operator (`!.`) is used to cast away the possibility that a value might be `null` or `undefined`.

> Overall recommended to NOT use this.
