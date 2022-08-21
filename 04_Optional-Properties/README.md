# Optional Properties

Optional properties can be left out. If so, their `type` (if checked) is `undefined`.

```ts
function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number; // 'number | undefined'
}) {
  // ...
}

// Works
printCar({
  make: 'Honda',
  model: 'Accord',
  year: 2017,
});

// Also works
printCar({
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
});
```

<br>

However, just b/c the type of `chargeVoltage` is `number | undefined` doesn't mean you can directly `type` it that way and get the same result. The property is only optional if you use the `?`

```ts
function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage: number | undefined; // <- no longer optional
}) {
  // ...
}

// ERRORS !!
printCar({
  make: 'Honda',
  model: 'Accord',
  year: 2017,
});
// Property 'chargeVoltage' is missing in type ...

// You would have to include it as 'undefined'
printCar({
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: undefined, // <- always needs to be included
});
```

<br>

> Therefore, an optional property is MORE than just its type being `<type> | undefined`
