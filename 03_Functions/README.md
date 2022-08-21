# Function return values

It's best to explicitly state function return types b/c it changes where errors are surfaced.

It also forces you to explicitly state what `type` you expect the function to return, and that your code implementation matches that expectation.

```ts
function add(a: number, b: number) {}
```

Naming a function `add` and providing it with two numbers, you'd expect it'd return a value of type `number`. But here its return type is `void`.

```ts
function add(a: number, b: number): number {} // <- ERROR
```

You would get an error under the return type of `: number` since there is no code implementation to back that up.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Now it would compile properly.

> Note: this does not guarantee the code executes as you'd expect. The author could have mistakenly written `return a * b` and multiplied the inputs together. This is why unit tests are still necessary.
>
> TypeScript just verifies the types.
