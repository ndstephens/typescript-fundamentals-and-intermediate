# Inference with Conditional Types

Conditional types can also be used with an `infer` keyword to access sub-parts of **_type information_** within a larger type.

The keyword `infer` can only be used **_within the `condition expression` of a conditional type_**.

It is an important tool for being able to `extract` out pieces of **_type information_** from other types.

There are certain problems (as shown below) that only `infer` is able to solve within the TypeScript language.

<br>

## `infer`

### An Example Use Case:

- See the companion website for a more complicated example.

We need a way to determine the type information of the class constructor's input (`fruitNames`).

We can see what `fruitNames` is expecting in the class definition code (`string[]`), but we aren't provided a separate interface or type alias for it, such as `type FruitNames = string[];`

If so, we could then use that type alias: `const myFruits: FruitNames = ['apple', 'banana'];`

> This is a simplified example, but imagine that `fruitNames` was a much larger and more complicated config object instead.
>
> We could copy the type structure for `fruitNames` and hardcode our own interface or type alias for it.
>
> But we want a way of extracting that type information instead. That's the point of this.

```ts
class FruitStand {
  constructor(fruitNames: string[]) {}
}
```

<br>

So we want to create something that could take in a class (ie `typeof FruitStand`) as a type parameter and return the type of its constructor's first input parameter (ie `string[]`):

```ts
type ConstructorArg<C> = C extends {
  new (arg: infer A, ...args: any[]): any;
}
  ? A
  : never;
```

<br>

In use:

```ts
// Conditional type using `infer` to determine the class constructor's first input type
type ConstructorArg<C> = C extends {
  new (arg: infer A): any;
}
  ? A
  : never;

// The class whose constructor input type we're trying to determine
class FruitStand {
  constructor(fruitNames: string[]) {}
}

// Using the conditional type
// NOTE: we're using `typeof FruitStand` to get the class...not an instance of the class
let fruits: ConstructorArg<typeof FruitStand>;
// let fruits: string[]
```

<br>

### How it works...step by step:

First, we are creating a generic type alias with a single type param `C` which could be anything:

```ts
type ConstructorArg<C> ...
```

<br>

Next, we begin to define a conditional type using the ternary operator syntax. We want to check if `C` looks like (`extends`) the **_static side of a class (the type with a constructor)_** (ie. `typeof MyClass`)

`{ new (...args: any[]): any }` is a type that matches **_any_** constructor signature, regardless of what arguments it may take and what it instantiates.

- It represents anything in JavaScript that is "new-able"

```ts
type ConstructorArg<C> = C extends {
  new (...args: any[]): any
}...
```

<br>

Next, **_we want to “collect” the first constructor argument_**. This is where the `infer` keyword comes into play.

```ts
- new (...args: any[]): any
+ new (arg: infer A, ...args: any[]): any
```

We’re using a new type param (`A`) without including it next to `<C>` in the type parameter list.

We also now have an `infer` keyword to the left of `A`.

Also worth noting that `C` will now only match or `extend` the conditional type if `C`'s constructor takes at least 1 argument.

And it's only that first argument whose type we're trying to `infer` (and return).

```ts
type ConstructorArg<C> = C extends {
  new (arg: infer A, ...args: any[]): any
}
  ? ...
  : ...
```

We should take note that our **_condition_** for this conditional type has changed. It will no longer match **_zero-argument constructors_**, but that’s fine because there’s nothing to extract in that case.

<br>

In the case where our condition matches type `C`, we’ll return the first argument's type information, `A`, that we “extracted” using the `infer` keyword.

```ts
type ConstructorArg<C> = C extends {
  new (arg: infer A, ...args: any[]): any
}
  ? A
  : ...
```

<br>

And finally, in the case where type `C` **_is not a class or a class with 0 arguments_**, we need to decide which type to return.

Ideally this will be something that, if used in a Union type (`|`), will kind of “disappear”.

That way if it's used elsewhere in a union it will be ignored and only the other types will be used.

```ts
let myValue: string | number | never;
// let myValue: string | number
```

```ts
type ConstructorArg<C> = C extends {
  new (arg: infer A, ...args: any[]): any;
}
  ? A
  : never;
```

> **_NOTE:_** instead of `never` you can also chain on another ternary operator if you want to run multiple conditionals.

<br>

### Try against built-in JavaScript class constructors

> **_NOTE:_** we use `typeof` to get the class constructor type, not the instance-type of the class.

```ts
// What are the types that the `Date` class constructor accepts as its first input?
let dateFirst: ConstructorArg<typeof Date>;
// let dateFirst: string | number | Date

// What is the type that the `Promise` class constructor accepts as its first input?
let promiseFirst: ConstructorArg<typeof Promise>;
// let promiseFirst: (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void
```

---

<br>

## Be Careful With This...

Don't overuse it b/c it can be process intensive on the TS server and could slow type-ahead and type-checking performance.
