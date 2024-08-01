# Testing

Testing is a crucial part of developing software. It can help prevent regressions and ensure
stability. Remember, good tests should grow with your project. If you're constantly having to change
or fiddle with your tests, this is a sign that you may be testing the wrong things.

Gleam's test runner, [gleeunit](https://github.com/lpil/gleeunit/tree/main), binds to Erlang's EUnit
framework and provides a simple interface to it. If gleeunit isn't already configured (new Gleam
projects have it by default), follow the set up instructions in
[the documentation](https://github.com/lpil/gleeunit/tree/main).

## How and What to Test

For some reason, software testing is a very personal, dogmatic issue. Some people swear by 100% code
coverage, others don't test at all; most people are probably somewhere between the two extremes. The
usefulness of testing depends on what you're building. Something error-prone like a parser should
have tons of tests to prevent regressions. A web app may need significantly less.

Be pragmatic here &mdash; don't box yourself into a corner with code coverage goals or brittle
tests. Or ignore my advice, either way.

There's _many_ kinds of testing, but the general categories are:

- Unit testing
- Integration testing
- End-to-end testing

As of writing, Gleam doesn't really have tooling for integration and E2E testing. So for now, we'll
focus on unit testing.

## Unit Testing

Unit testing is about testing small components of your software. Each test should have a relatively
small surface area. This way, you can understand the potential issue when a test breaks.

A gleeunit test is a function with a name ending in `_test`. The test passes by returning an
arbitrary value (ignored by the test runner), or fails by crashing or panicking. Since panics and
assertions will cause a test to fail, we can use idiomatic Gleam in our tests:

```gleam
pub fn results_test() {
    let assert Ok(_) = function_that_might_fail()
}
```

However, gleeunit provides utilities for these common cases. The utilities provide better error
messages and a readable, standardized interface.
[`gleeunit.should`](https://hexdocs.pm/gleeunit/gleeunit/should.html) provides common testing
helpers for checking equality, booleans, `Result`s, and `Option`s.

### Snapshot Testing
