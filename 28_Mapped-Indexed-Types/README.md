# Use Mapped types with Indexed Access types

## Filtering Properties by _key_

Mapped types work great with indexed access types, because the index is used when defining the value type.

```ts
type PartOfWindow = {
  [Key in 'document' | 'navigator' | 'setTimeout']: Window[Key];
};

// type PartOfWindow = {
//   document: Document;
//   navigator: Navigator;
//   setTimeout: (
//     handler: TimerHandler,
//     timeout?: number | undefined,
//     ...arguments: any[]
//   ) => number;
// };
```

The mapped type "loops over" all of the possible keys and determines the appropriate value type for each key.

---

<br>

## Use with Type Parameters (Generics)

Rework the example above using type parameters.

Let the caller define which keys they’d like to use.

We'll call this type `PickWindowProperties` because you get to specify which properties from `Window` you'd like:

```ts
type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key];
};

type PartOfWindow = PickWindowProperties<
  'document' | 'navigator' | 'setTimeout'
>;
// type PartOfWindow = {
//   document: Document;
//   navigator: Navigator;
//   setTimeout: (
//     handler: TimerHandler,
//     timeout?: number | undefined,
//     ...arguments: any[]
//   ) => number;
// };
```

<br>

`<Keys extends keyof Window>` limits the options of what `Keys` can be...it can only be a union of literal types (strings) that are keys on the `Window` interface.

<br>

Also take note of `[Key in Keys]`. That's the mapped type that "loops" over `Keys` and each time provides that `Key` as an indexed access type to `Window`.

Those loops of `Window[Key]` with the different `Key` values provides the specific value types for `PartOfWindow`.

<br>

### Make it fully generalized:

Let’s generalize it one step further by allowing this type to work on anything, not just `Window`.

Because this is no longer a type that **_exclusively_** works with `Window`, we’ll rename this type to `PickProperties`.

```ts
// Completely Generic
type PickProperties<Keys extends keyof ValueType, ValueType> = {
  [Key in Keys]: ValueType[Key];
};

// Used with `Window`
type PartOfWindow = PickProperties<
  'document' | 'navigator' | 'setTimeout',
  Window
>;
// type PartOfWindow = {
//   readonly document: Document;
//   readonly navigator: Navigator;
//   setTimeout: (
//     handler: TimerHandler,
//     timeout?: number | undefined,
//     ...arguments: any[]
//   ) => number;
// };
```

---

<br>

## Pick -- TS utility type

The `PickProperties` mapped typed created above matches the built-in TS utility type `Pick` exactly:

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<K extends keyof T, T> = {
  [P in K]: T[P];
};
```

---

<br>

## Mapping modifiers -- More TS utility types

There are a couple of final things we can do to the properties as we create each type: set whether the value placed there should be `readonly` and/or `optional`.

This is fairly straightforward, and you can see the use of the `?` and `readonly` in the three more built-in TypeScript utility types below.

If there’s a `-` to the left of `readonly` or `?` in a mapped type, that indicates **_removal_** of this modifier instead of application of the modifier.

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

<br>

There is no built-in TypeScript “utility type” for `readonly` removal, but you could implement one if you needed to (not necessarily a good idea though)

```ts
type NotReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};
```
