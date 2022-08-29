# Template Literal Types

We can use the exact same syntax that one would find in an ECMAScript template literal to create a new type that represents every possible combination of these two union types of string literals.

- But in a **_type expression_** instead of a **_value expression_**

<br>

## Basic Example

```ts
type ArtFeatures = 'tree' | 'sunset';
type Colors = 'darkSienna' | 'sapGreen' | 'titaniumWhite';

type ArtMethodNames = `paint_${Colors}_${ArtFeatures}`;
// type ArtMethodNames =
//   | 'paint_darkSienna_tree'
//   | 'paint_darkSienna_sunset'
//   | 'paint_sapGreen_tree'
//   | 'paint_sapGreen_sunset'
//   | 'paint_titaniumWhite_tree'
//   | 'paint_titaniumWhite_sunset';
```

<br>

In JavaScript or TypeScript it’s more conventional to use `camelCase` instead of `snake_case`.

TypeScript provides a few utility types you can use within these template literal types:

- `UpperCase`
- `LowerCase`
- `Capitalize`
- `Uncapitalize`

```ts
type ArtMethodNames = `paint${Capitalize<Colors>}${Capitalize<ArtFeatures>}`;

// type ArtMethodNames =
//   | 'paintDarkSiennaTree'
//   | 'paintDarkSiennaSunset'
//   | 'paintSapGreenTree'
//   | 'paintSapGreenSunset'
//   | 'paintTitaniumWhiteTree'
//   | 'paintTitaniumWhiteSunset';
```

---

<br>

## Key Mapping

The resultant mapped type has different property names (keys) than the type being “iterated over” during the mapping.

A frequent use-case is analogous to services that provide a basic CRUD API based on data-layer, or database, schemas.

By that I mean if you created a `User` type (or schema) the service would then create an API with naming such as `createUser`, `updateUser`, and `deleteUser`.

With data layer code, where often there are defined types available, you potentially have a lot of `is*`, `get*` and `set*` methods based on that data's property keys.

<br>

### Real-World Example:

- Note the use of the `in` keyword in the index signature for mapping over the keys.
- Note the use of the `as` keyword in the index signature for renaming the keys.
- Note the indexed access type for typing `arg` in each method using the key.

```ts
interface DataState {
  digits: number[];
  names: string[];
  flags: Record<'darkMode' | 'mobile', boolean>;
}
// Record equates to:
// type DataState['flags`] = {
//   darkMode: boolean;
//   mobile: boolean;
// }

// Create a custom type using mapped types and template literal types
// Here we're creating a type to represent `setter` methods of all the `DataState` properties
type DataSDK = {
  // The mapped type
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void;
};

// Using the new type
function load(dataSDK: DataSDK) {
  dataSDK.setDigits([14]);
  dataSDK.setNames(['Joe', 'Jane']);
  dataSDK.setFlags({ darkMode: true, mobile: false });
}
```
