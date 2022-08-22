# Type Systems

## What is type checking?

Type-checking can be thought of as a task that attempts to evaluate the question of **_compatibility_** or **_type equivalence_**.

> NOTE: "Compatibility" and "Type Equivalence" are not necessarily the same as "Exact Equality".
>
> This is important to remember.

<br>

```ts
function foo(param) {
  // ...
}

foo(myArg);

// TYPE CHECKING
// -------------
// Is `myArg` type-equivalent to what `foo` whats to receive?
```

The same question is asked in regards to variable assignment and when checking return types.

---

## Nominal vs Structural

### Nominal

Nominal type systems are all about **_NAMES_**.

- Type checking is done primarily with names.
  - All that matters is whether `myCar` is an instance of the `class` **_named_** `Car`.
- This is the type system of most statically typed languages.

<br>

### Structural

Structural type systems are all about **_STRUCTURE_** or **_SHAPE_**.

- For example, a function doesn’t care about which class constructor its argument came from, it only cares about whether the argument passed to it meets its parameter's requirements.
- **_This is the type system TypeScript uses._**

```ts
class Car {
  make: string;
  model: string;
  year: number;
  isElectric: boolean;
}

class Truck {
  make: string;
  model: string;
  year: number;
  towingCapacity: number;
}

const vehicle = {
  make: 'Honda',
  model: 'Accord',
  year: 2017,
};

function printCar(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

printCar(new Car()); // Fine
printCar(new Truck()); // Fine
printCar(vehicle); // Fine
```

---

## Other type systems

### Static vs Dynamic

- Static type systems perform type-checking at `compile time`.
  - TypeScript is a static type system.
- Dynamic type systems perform type-checking at `runtime`.

### Duck typing

- “If it looks like a duck, swims like a duck, and quack like a duck, then it probably is a duck”.
- In practice, this is very similar to structural typing, but “Duck typing” is usually used to describe dynamic type systems.

### "Strong" vs "Weak"

- These terms, while used frequently, have no agreed-upon technical definition.
- In the context of TypeScript it’s common for those who say “strong” to really mean “static”.
