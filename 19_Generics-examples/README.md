# Generics examples

Examples of higher-order functions (map, filter, reduce) that operate on dictionaries.

```ts
const fruits = {
  apple: { color: 'red', mass: 100 },
  grape: { color: 'red', mass: 5 },
  banana: { color: 'yellow', mass: 183 },
  lemon: { color: 'yellow', mass: 80 },
  pear: { color: 'green', mass: 178 },
  orange: { color: 'orange', mass: 262 },
  raspberry: { color: 'red', mass: 4 },
  cherry: { color: 'red', mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

// Array.prototype.map, but for Dict
function mapDict<T, U>(
  inputDict: Dict<T>,
  mapFunction: (item: T, key: string) => U
): Dict<U> {
  const outputDict: Dict<U> = {};

  for (const key in inputDict) {
    outputDict[key] = mapFunction(inputDict[key], key);
  }

  return outputDict;
}

// Array.prototype.filter, but for Dict
function filterDict<T>(
  inputDict: Dict<T>,
  filterFunction: (item: T) => boolean
): Dict<T> {
  const outputDict: Dict<T> = {};

  for (const key in inputDict) {
    if (filterFunction(inputDict[key])) {
      outputDict[key] = inputDict[key];
    }
  }

  return outputDict;
}

// Array.prototype.reduce, but for Dict
function reduceDict<T, A>(
  dict: Dict<T>,
  reduceFunction: (acc: A, item: T) => A,
  accumulator: A
): A {
  return Object.values(dict).reduce(reduceFunction, accumulator);
}
```
