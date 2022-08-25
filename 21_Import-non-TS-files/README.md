# Importing non-TS things

```ts
import img from './file.png';
// Error: Cannot find module './file.png' or its corresponding type declarations.
```

`file.png` is obviously not a TypeScript file — we just need to tell TypeScript that whenever we import a `.png` file, it should be treated as if it’s a JS module with a string value as its default export

This can be accomplished through a module declaration as shown below:

```ts
// @filename: global.d.ts
declare module '*.png' {
  const imgUrl: string;
  export default imgUrl;
}
// @filename: component.ts
import img from './file.png';
```
