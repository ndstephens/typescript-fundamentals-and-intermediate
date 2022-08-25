# Generic Constraints and Scope

## Constraints

Type params ( `<T>` ) start out as `any` until they're given a type (provided by your input values).

**_Generic constraints_** allow us to describe the “minimum requirement” for a type param, such that we can achieve a high degree of flexibility, while still being able to safely assume some minimal structure and behavior.

<br>

> **_REMEMBER:_** TypeScript is a "structural type system".
>
> Constraints provide a **_minimum requirement_** of an input type's structure.
>
> If you need an **_exact requirement_** then you'd simply demand that specific type and not use a generic since the point of a generic is to provide a level of flexibility.

<br>

### Example:

A completely flexible generic, where `T` could be anything:

```ts
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};

  for (let item of list) {
    dict[idGen(item)] = item;
  }

  return dict;
}
```

<br>

### `T extends Type-Constraint`

What if we wanted to make an assumption about `T`, or rather demand a minimum requirement of `T`.

What if every `T` had to be an object with at least a property `id` that is of type `string`.

We could then safely use that `id: string` as each key `[k: string]: T` in the response object, and would no longer need the `idGen` function to generate a key.

```ts
interface HasId {
  id: string;
}
interface Dict<T> {
  [k: string]: T;
}

function listToDict<T extends HasId>(list: T[]): Dict<T> {
  const dict: Dict<T> = {};

  list.forEach((item) => {
    dict[item.id] = item;
  });

  return dict;
}
```

### `T extends HasId` guarantees that "T is at least a HasId"

---

<br>

## Scopes

Type params work a similar way as function parameters, in that “inner scopes” have the ability to access “outer scopes” but not vice versa:

```ts
// outer function
function tupleCreator<T>(first: T) {
  // inner function
  return function finish<S>(last: S): [T, S] {
    return [first, last];
  };
}

const finishTuple = tupleCreator(3);
const t1 = finishTuple(null);
// const t1: [number, null]
```
