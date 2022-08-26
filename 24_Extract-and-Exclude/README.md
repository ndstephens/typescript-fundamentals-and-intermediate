# Extract and Exclude

These utility types, included with TS, are used to obtain a sub-part of a type either through specifying what you're looking for or what you're _not_ looking for.

Behind the scenes they are implemented using conditional types.

<br>

## Extract

What you're looking for.

Useful for obtaining some sub-part of a type that is assignable to some other type.

`type Extract<T, U> = T extends U ? T : never`

<br>

```ts
type FavoriteColors =
  | 'dark sienna'
  | 'van dyke brown'
  | 'yellow ochre'
  | 'sap green'
  | 'titanium white'
  | 'phthalo green'
  | 'prussian blue'
  | 'cadium yellow'
  | [number, number, number]
  | { red: number; green: number; blue: number };

type StringColors = Extract<FavoriteColors, string>;
// type StringColors = "dark sienna" | "van dyke brown" | "yellow ochre" | "sap green" | "titanium white" | "phthalo green" | "prussian blue" | "cadium yellow"

type ObjectColors = Extract<FavoriteColors, { red: number }>;
// type ObjectColors = {
//   red: number;
//   green: number;
//   blue: number;
// }

type TupleColors = Extract<FavoriteColors, [number, number, number]>;
// type TupleColors = [number, number, number]
```

<br>

For `type StringColors` you could say:

> We're `Extract`ing the subset of `FavoriteColors` that is assignable to `string`.

<br>

> **_NOTE:_** this is similar to the example of using `keyof` with the "`&`" intersection operator in the `Type-Queries` section.

<br>

---

<br>

## Exclude

What you're **_NOT_** looking for.

Useful for obtaining some sub-part of a type that is **_NOT_** assignable to some other type.

`type Exclude<T, U> = T extends U ? never : T`

<br>

```ts
type FavoriteColors =
  | 'dark sienna'
  | 'van dyke brown'
  | 'yellow ochre'
  | 'sap green'
  | 'titanium white'
  | 'phthalo green'
  | 'prussian blue'
  | 'cadium yellow'
  | [number, number, number]
  | { red: number; green: number; blue: number };

type NonStringColors = Exclude<FavoriteColors, string>;
// type NonStringColors =
//   | [number, number, number]
//   | {
//       red: number;
//       green: number;
//       blue: number;
//     }
```

<br>

For `type NonStringColors` you could say:

> We're `Exclude`ing the subset of `FavoriteColors` that is assignable to `string`.
