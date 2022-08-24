# Basics

## `package.json`

```json
{
  "name": "hello-ts",
  "license": "NOLICENSE",
  "devDependencies": {
    "typescript": "^4.3.2"
  },
  "scripts": {
    "dev": "tsc --watch --preserveWatchOutput"
  }
}
```

- TS should be saved as a `devDependency`
- `--preserveWatchOutput` prevents your console from being cleared after every save and rerun of the compiler.
