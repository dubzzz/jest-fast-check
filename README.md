# Property based testing for Jest based on [fast-check](https://github.com/dubzzz/fast-check/)

[![Build Status](https://travis-ci.com/dubzzz/jest-fast-check.svg?branch=master)](https://travis-ci.com/dubzzz/jest-fast-check)
[![npm version](https://badge.fury.io/js/jest-fast-check.svg)](https://badge.fury.io/js/jest-fast-check)

Bring the power of property based testing framework fast-check into jest.
`jest-fast-check` simplifies the integration of fast-check into jest testing framework.

## Getting started

Install `jest-fast-check` and its peer dependencies:

```bash
# With yarn
yarn add -D jest fast-check jest-fast-check

# With npm
npm install --save-dev jest fast-check jest-fast-check
```

## Example

```javascript
import { testProp, fc } from "jest-fast-check";

// for all a, b, c strings
// b is a substring of a + b + c
testProp(
  "should detect the substring",
  [fc.string(), fc.string(), fc.string()],
  (a, b, c) => {
    return (a + b + c).includes(b);
  }
);
```

Please note that the properties accepted by `jest-fast-check` as input can either be synchronous or asynchronous (even just `PromiseLike` instances).

## Advanced

If you want to forward custom parameters to fast-check, `testProp` accepts an optional `fc.Parameters` ([more](https://github.com/dubzzz/fast-check/blob/master/documentation/1-Guides/Runners.md#runners)).

`jest-fast-check` also comes with `.only`, `.skip` and `.todo` from jest.

```javascript
import { itProp, testProp, fc } from "jest-fast-check";

testProp(
  "should replay the test for the seed 4242",
  [fc.nat(), fc.nat()],
  (a, b) => {
    return a + b === b + a;
  },
  { seed: 4242 }
);

testProp.skip("should be skipped", [fc.fullUnicodeString()], (text) => {
  return text.length === [...text].length;
});

describe("with it", () => {
  itProp("should run too", [fc.nat(), fc.nat()], (a, b) => {
    return a + b === b + a;
  });
});
```

## Minimal requirements

| jest-fast-check | jest | fast-check           |
| --------------- | ---- | -------------------- |
| ^1.0.0          | -    | ^2.0.0<sup>(1)</sup> |

- (1) `fast-check@^2.0.0` for hybrid module support: `commonjs` and `esm` together
