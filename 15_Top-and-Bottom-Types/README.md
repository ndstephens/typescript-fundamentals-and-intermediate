# Top and Bottom Types

## Types describe a set of allowed values.

```ts
const x: boolean;
```

`x` could be either value from the following set: `{ true, false }`

<br>

```ts
const y: number;
```

`y` could be **_any number_**.

Can also be expressed that `y` can be any value from the following set:
`{ any number }`

<br>

A few more examples:

```ts
let a: 5 | 6 | 7; // anything in { 5, 6, 7 }
let b: null; // anything in { null }
let c: {
  favoriteFruit?: 'pineapple'; // { "pineapple", undefined }
};
```

---

<br>

## Top types

A `top type` is a type that describes **_any possible value allowed by the type system._**

`{ anything }`

<br>

### `any`

- Can accept any value.
- Can be used without a type guard (**_may cause runtime errors_**):

```ts
let flexible: any = 14;
flexible.it.is.possible.to.access.any.deep.property; // <- NO TS ERROR
```

- _Can be_ the right type to use in certain situations:
  - `Console.log(...data: any[]): void`

<br>

### `unknown`

- Can accept any value.
- Values with an `unknown` type can **NOT** be used without a type guard:

```ts
let myUnknown: unknown = 14;
myUnknown.it.is.possible.to.access.any.deep.property; // <- TS ERROR
// Error: Object is of type 'unknown'.
```

- Use a _type guard_ with `unknown`:

```ts
if (typeof myUnknown === 'string') {
  // This code runs for { myUnknown| all strings }
  console.log(myUnknown, 'is a string');
} else if (typeof myUnknown === 'number') {
  // This code runs for { myUnknown| all numbers }
  console.log(myUnknown, 'is a number');
} else {
  // This would run for everything else
  // { myUnknown| anything except string or numbers }
}
```

<br>

`unknown` _can be_ useful for values received at runtime (e.g., your data layer). By obligating consumers of these values to perform some light validation before using them, errors are caught earlier, and can often be surfaced with more context.

<br>

> However, when it comes to fetch responses from a known API, I'd rather have a defined type for the response and type the response as a union of either that success type or an Error. Then run sufficient type guards to verify that even a successful response matches the type you expected it to be. (Or, if it's not an Error, then it must be the success type)
>
> Can also use an approach similar to a `discriminated (tagged) union` where you include a `key` of sorts in the response and run your type guard against that.

---

<br>

## Bottom type: `never`

A `bottom type` is a type that describes **_no possible value allowed by the type system._**

`anything from the following set: { } `

<br>

### Use case: Exhaustive conditionals

Exhaustively handle all possible types.

The final `else` block will assume all possible types have been checked and therefore the only remaining type is `never`.

If other valid type checks remain then TS will display an Error.

```ts
class Car {
  drive() {
    console.log('vroom');
  }
}
class Truck {
  tow() {
    console.log('dragging something');
  }
}
type Vehicle = Truck | Car;

let myVehicle: Vehicle = obtainRandomVehicle();

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // Neither - and there's no other type it can be other than `never`
  const neverValue: never = myVehicle;
  // `neverValue` isn't ever used...it's meant to trigger a TS Error if `myVehicle` is NOT of the type `never`
}
```

<br>

Now, leaving the conditional exactly as-is, let’s add `Boat` as a vehicle type:

```ts
class Car {
  drive() {
    console.log('vroom');
  }
}
class Truck {
  tow() {
    console.log('dragging something');
  }
}
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car | Boat;

let myVehicle: Vehicle = obtainRandomVehicle();

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // Could still be a "Boat"
  // You did not exhaustively handle all possible types
  const neverValue: never = myVehicle; // <- TS ERROR
  // Error: Type 'Boat' is not assignable to type 'never'.
}
```

Effectively, what has happened here is that we have been alerted to the fact that a new possibility for `Vehicle` has been introduced. As a result, we don’t end up with the type for `myVehicle` as a `never` in that final `else` clause.

<br>

### Mike North recommends handling this more gracefully via an **_error subclass_**

```ts
class UnreachableError extends Error {
  constructor(_nvr: never, message: string) {
    super(message);
  }
}

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // Can it still be any type other than 'never'??
  // If so, throw the Error, b/c you didn't exhaustively check all possible types
  throw new UnreachableError(
    myVehicle,
    // Error: Argument of type 'Boat' is not assignable to parameter of type 'never'.
    `Unexpected vehicle type: ${myVehicle}`
  );
}
```

<br>

Now, one of three things will happen in that final `else` block:

- We will have handled every case before reaching it, and thus we will never enter the final `else` block.
- We will catch upstream code changes that need to be handled in this conditional at compile time (e.g., adding the `Boat` case).
- If somehow an unexpected value “slip through” and is not caught until we actually run the code, we will get a meaningful error message.

> Note that this approach works nicely with a `switch` statement, when the `UnreachableError` is thrown from the `default` case clause.
