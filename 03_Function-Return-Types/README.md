# Function return types

You should explicitly state a function's return `type`, and TypeScript will then verify that your code implementation in fact matches your expectations.

```ts
function add(a: number, b: number) {}
```

Naming a function `add` and providing it with two numbers, you'd expect it'd return a value of type `number`. But here its inferred return type is `void`.

<br>

```ts
function add(a: number, b: number): number {} // <- ERROR
```

Here you would get an error after explicitly including the return type of `: number` since the code implementation does not match up.

<br>

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Now it would compile properly.

> Note: this does **NOT** guarantee the code executes as you'd expect. The author could have mistakenly returned the two inputs **_multiplied_** together instead of summed.
>
> The types may have matched, but the returned **_value_** would be incorrect. This is why unit tests are still necessary.
>
> TypeScript only verifies the types.

---

<br>

## Better Error Notification

It's best to explicitly state function return types b/c it changes where errors are surfaced.

> Usually the error should be surfaced where the function is defined...not where it is invoked throughout your code.

```ts
async function getData(url: string) {
  const resp = await fetch(url);
  if (resp.ok) {
    const data = (await resp.json()) as {
      properties: string[];
    };
    return data;
  }
}
```

The author might assume the Promise will always return an object.

Imagine if we were passing this value through several other functions before reaching the point where type checking alerted us to a problem!

```ts
function loadData() {
  getData('https://example.com').then((result) => {
    console.log(result.properties.join(', ')); // ERROR..."result" could be undefined
  });
}
// Error: Object is possibly 'undefined'
// (parameter) result: {
//   properties: string[];
// } | undefined
```

It's best to be explicit about the return type.

```ts
async function getData(
  url: string
): Promise<{ properties: string[] } | undefined> {
  // ^^ update
  const resp = await fetch(url);
  if (resp.ok) {
    const data = (await resp.json()) as {
      properties: string[];
    };
    return data;
  }
  return undefined; // <- update
}
```
