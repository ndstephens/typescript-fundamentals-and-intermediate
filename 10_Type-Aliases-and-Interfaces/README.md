# Type Aliases and Interfaces

These are created for naming convenience and reusability.

But remember...TypeScript is still a `Structural` type system, not a `Nominal` one.

- Types are checked against their **_structure_**, not the name of an associated type-alias or interface.

<br>

## Type Aliases

- Can only declare a type alias of a given name _once_ within a given scope (unlike interfaces as discussed below).
- A type alias can hold _any type_, as it's literally an alias (name) for a type of some sort.

<br>

### Inheritance in type aliases

You can create type aliases that combine existing types with new behavior by using Intersection (`&`) types.

```ts
type SpecialDate = Date & { getReason(): string };

const newYearsEve: SpecialDate = {
  ...new Date(),
  getReason: () => 'Last day of the year',
};

// `newYearsEve` has all the properties of the Date object, and a method named "getReason"
```

While there’s no true `extends` keyword that can be used when defining type aliases, this pattern has a very similar effect

---

<br>

## Interfaces

- An interface is a way of defining an _object type_. An “object type” can be thought of as, “an instance of a class could conceivably look like this”.
- For example, `string | number` is **_not_** an object type, because it makes use of the **_union type operator_**.

<br>

### Inheritance in interfaces

#### \- `EXTENDS`

A “sub-interface” `extends` from a base interface

```ts
interface Animal {
  isAlive(): boolean;
}
interface Mammal extends Animal {
  getFurOrHairColor(): string;
}
interface Dog extends Mammal {
  getBreed(): string;
}
function careForDog(dog: Dog) {
  dog.getBreed();
  dog.getFurOrHairColor();
  dog.isAlive();
}
```

#### \- `IMPLEMENTS`

Used to state that a given `class` should produce instances that confirm to a given `interface`.

While it’s possible to use `implements` with a `type` alias, if the type ever breaks the “object type” rules there’s some potential for problems. For this reason, it is best to use `interfaces` for types that are used with `implements` .

```ts
interface AnimalLike {
  eat(food): void;
}

class Dog implements AnimalLike {
  bark() {
    return 'woof';
  }
  eat(food) {
    consumeFood(food);
  }
}
```

The `implements` keyword gives us the ability to validate, at compile time, that instances of a class conform to one or more “contracts” (types).

Note that both `extends` and `implements` can be used together:

```ts
class LivingOrganism {
  isAlive() {
    return true;
  }
}
interface AnimalLike {
  eat(food): void;
}
interface CanBark {
  bark(): string;
}

class Dog extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return 'woof';
  }
  eat(food) {
    consumeFood(food);
  }
}
```

<br>

### Open Interfaces

TypeScript interfaces are “open”, meaning that unlike in type aliases, you can have multiple declarations in the same scope:

```ts
interface AnimalLike {
  isAlive(): boolean;
}
function feed(animal: AnimalLike) {
  animal.eat('meat');
  animal.isAlive();
}

// SECOND DECLARATION OF THE SAME NAME
interface AnimalLike {
  eat(food): void;
}
```

These declarations are merged together to create a result identical to what you would see if both the `isAlive` and `eat` methods were on a single interface declaration.

#### \- Where and how is this useful?

Imagine a situation where you want to add a global property to the `window` object.

```ts
window.document; // an existing property

window.exampleProperty = 42;

// tells TS that `exampleProperty` exists
interface Window {
  exampleProperty: number;
}
```

What we have done here is augment an existing `Window` interface that TypeScript has set up for us behind the scene.

---

<br>

## Choosing between a `type` or an `interface`

In many situations, either a `type` alias or an `interface` would be perfectly fine, however...

1. **_If you need to define something other than an object type_** (e.g., use of the `|` union type operator), you must use a type alias
1. If you need to define a type **_to use with the `implements` heritage term_**, it’s best to use an interface
1. If you need to **_allow consumers of your types to augment them_**, you must use an interface.
   1. If you're creating an open-source library, for instance, use interfaces.

---

<br>

## Recursion

Recursive types, are self-referential, and are often used to describe infinitely nestable types. For example, consider infinitely nestable arrays of numbers.

You may read or see things that indicate you must use a combination of `interface` and `type` for recursive types. As of **TypeScript 3.7** this is now much easier, and works with either type aliases or interfaces.

```ts
type NestedNumbers = number | NestedNumbers[];

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221];
```

> These will be used in the next section on creating a custom type to handle JSON files.
