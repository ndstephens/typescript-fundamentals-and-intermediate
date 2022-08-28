# Indexed Access Types

The concept is you grab a piece of type information from another type using something that _feels like_ a property key.

Indexed Access types provide a mechanism for retrieving part(s) of an array or object type via indices.

At the simplest level, these kinds of types are all about _accessing_ some part of another type, via an _index_.

<br>

```ts
interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  };
}

let carColor: Car['color'];
// let carColor: {
//   red: string;
//   green: string;
//   blue: string;
// };
```

<br>

You can also reach deeper into the object through multiple “accesses”:

```ts
let carColorRedComponent: Car['color']['red'];
// let carColorRedComponent: string;
```

<br>

You can pass or “project” a union type (`|`) through `Car` as an index, as long as all parts of the union type are _each_ a valid index:

```ts
let carProperty: Car['year' | 'color'];
// let carProperty:
//   | number
//   | {
//       red: string;
//       green: string;
//       blue: string;
//     };
```
