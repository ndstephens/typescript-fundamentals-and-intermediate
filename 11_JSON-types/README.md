# JSON types

Define a type that describes any allowable JSON value, which basically means:

- A JSON value MUST be an
  - object
  - array
  - number
  - string
  - boolean
- Or one of the following three literal names:
  - false
  - true
  - null
- Can NOT be any of the following:
  - function
  - undefined
  - BigInt
  - class

<br>

> The trick is to use Recursive types

```ts
type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = JSONPrimitive | JSONObject | JSONArray;

// Test is a value is a valid JSON value
function isJSON(arg: JSONValue) {}
// as long as the TS compiler doesn't throw an error
```
