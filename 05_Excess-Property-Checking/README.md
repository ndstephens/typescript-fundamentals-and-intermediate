# Excess Property Checking

TypeScript helps us catch a particular type of problem around the use of **_object literals_**.

> NOTE: this relates to using a defined `type` versus an `object literal`

<br>

```ts
function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}) {
  // ...
}

printCar({
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
  color: 'RED', // <- ERROR: Excess Property Error
});
```

> Error msg: "... Object literal may only specify known properties, and 'color' does not exist in type '{ make: string; model: string; year: number; chargeVoltage?: number | undefined; }'"

<br>

The possible fixes are:

1. Remove the `color` property from the object
2. Add a `color: string` to the function argument type (can also be optional)
3. Create a variable to hold this value, and then pass the variable into the `printCar` function

<br>

Here's the fix using option 3:

```ts
const myTesla = {
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
  color: 'RED',
};

printCar(myTesla); // NO ERROR
```

<br>

The function body has no possible way to access the `color` property.

If an **_object literal_** is used as the function's input then that object exists only as that input's value and no where else in the code.

If the function can't access the `color` property then there's no reason for that property to exist on the object literal.

However if the input's value comes from a **_variable_**, that variable (and its `color` property) **_might_** be used elsewhere in the code.

Therefore the function doesn't care if it includes extra properties...as long as it includes the properties (and types) it's requiring.
