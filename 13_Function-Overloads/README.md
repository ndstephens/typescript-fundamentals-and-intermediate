# Function Overloads

This is used to resolve a similar issue that Discriminated (or "Tagged") Unions resolve.

We want the type of one value to identify what the type of another value will be (there needs to be a _linkage_).

Often this involves multiple params or values that are `union types`, but TypeScript can't identify the linkage unless we're explicit about it.

In the case of Discriminated Unions, if we knew the type of one value then TypeScript would be able to infer another value's type (from its union type).

<br>

Here we're talking about a function's parameter types. If we know the type of one parameter, we want TS to infer the type of the other parameter(s).

The problem:

```ts
type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (evt: MessageEvent) => void;

function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {}

const myFrame = document.getElementsByTagName('iframe')[0];
// const myFrame: HTMLIFrameElement

handleMainEvent(myFrame, (val) => {});
// (parameter) val: any
```

Even though `myFrame`'s type sets `handleMainEvent`'s param `elem` to `HTMLIFrameElement`, TypeScript has no way of knowing we therefore want the `handler` param to be of type `MessageHandler`.

<br>

> We need to create a linkage between the first and second arguments, which allows our callback’s argument type to change, based on the type of handleMainEvent’s first argument.

<br>

We solve this using **_function overloads_**:

```ts
type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (evt: MessageEvent) => void;

function handleMainEvent(elem: HTMLFormElement, handler: FormSubmitHandler);
function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler);
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {}

const myFrame = document.getElementsByTagName('iframe')[0];
// const myFrame: HTMLIFrameElement

const myForm = document.getElementsByTagName('form')[0];
// const myForm: HTMLFormElement

handleMainEvent(myFrame, (val) => {});
// function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler): any (+1 overload)

handleMainEvent(myForm, (val) => {});
// function handleMainEvent(elem: HTMLFormElement, handler: FormSubmitHandler): any (+1 overload)
```

This looks like three function declarations, but it’s really two “heads” that define an argument list and a return type, followed by our original implementation.

If you take a close look at tooltips and autocomplete feedback you get from the TypeScript language server, it’s clear that you are only able to call into the two “heads”, leaving the underlying “third head + implementation” inaccessible from the outside world.

One last thing that’s important to note: the “implementation” function signature must be **_general enough to include everything that’s possible through the exposed first and second function heads._**
