import { testProp, fc } from "jest-fast-check";

// for all a, b, c strings
// b is a substring of a + b + c
testProp(
  "should detect the substring",
  [fc.string(), fc.string(), fc.string()],
  (a, b, c) => {
    expect((a + b + c).includes(b)).toBe(true);
  }
);
