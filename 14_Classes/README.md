# Classes

## Access modifier keywords

TypeScript provides three access modifier keywords, which can be used with class fields and methods, to describe who should be able to see and use them.

| KEYWORD:  | WHO CAN ACCESS:                       |
| --------- | ------------------------------------- |
| public    | instances of the class and subclasses |
|           | code within the class itself          |
|           | code within subclasses                |
| protected | code within the class itself          |
|           | code within subclasses                |
| private   | code within the class itself          |

<br>

A few things to note:

- A class can expose `private` functionality **_to a subclass_** by including it in `protected` functionality
- A class and subclass can expose `private` and `protected` functionality by including it in `public` functionality.
- Can think of this almost like `getters` and `setters` where a particular field or method may not be directly accessible, but its value is made accessible through another bit of functionality.

<br>

> **NOTE:** access modifier keywords do NOT provide any real privacy or security benefits at runtime. These are purely development and compile time tools.
>
> These are about `encapsulation`, not security.

---

<br>

## `readonly`

Can be used with access modifier keywords.

Think of it like `const` in that it prevents reassignment, but not mutability.

However remember that primitives are immutable, so trying to update the value of a number (for instance) is not allowed.

```ts
class Car {
  public make: string;
  public model: string;
  public readonly year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  updateYear() {
    this.year++; // <- ERROR
    // Error: Cannot assign to 'year' because it is a read-only property.
  }
}
```

---

<br>

## Param properties

TypeScript provides a more concise syntax when defining classes through the use of _param properties_

BEFORE:

```ts
class Car {
  make: string;
  model: string;
  year: number;
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
```

<br>

AFTER:

```ts
class Car {
  constructor(public make: string, public model: string, public year: number) {}
}
```

<br>

They compile exactly the same.

<br>

> **NOTE:** there are a few possible "gotchas" regarding the order in which "constructor-stuff" runs. See the companion website notes for more info. I doubt it's often relevant unless of course you're using classes often with more complex structures and sub-classes.
