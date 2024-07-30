# Error Handling

In production environments, error handling is essential. One of the core tenets
of Erlang - and by extension, Gleam - is fault tolerance, gracefully handling
failure. In large applications, there _will_ be failures, so handling them well
is critical.

These failure scenarios come in two categories: recoverable and unrecoverable.
In Gleam, the `Result` type is used to represent recoverable errors.
In unrecoverable cases, an assertion can be used, crashing if there is an error.

Compared to Erlang and Elixir, **Gleam does not use exceptions for control flow**
and is generally more conservative with assertions. Instead, the `gleam/result`
module is used to explicity handle errors. When working with Erlang or Elixir
code, you can use the [`exception`](https://github.com/lpil/exception) library
to catch exceptions.

## Results

The [`gleam/result`](https://hexdocs.pm/gleam_stdlib/gleam/result.html) module
is useful for working with `Result` types. It provides useful functions for
manipulating and composing them. For an in-depth look, read the documentation,
but here are the most common ones:

- [`map`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#map) applies a
  function to a contained `Ok` value, leaving an `Error` value untouched (useful
  for composing results).
- [`map_error`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#map_error)
  applies a function to a contained `Error` value, leaving an `Ok` value
  untouched (useful for converting between error types).
- [`try`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#try) takes a result
  and runs a result-producing function on it (if it is `Ok`), returning a new
  result.
- [`unwrap`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#unwrap) extracts
  the `Ok` value from a `Result`, returning a default value if it is `Error`.

These functions are even more useful when used in conjunction with the `use`
keyword, syntactic sugar for chaining callbacks. For example:

<!-- TODO: improve example -->

```gleam
import gleam/dict
import gleam/result.{try}

fn get_username(uid: Int) -> Result(String, Nil) {
    use user <- try(db.lookup_user(uid))
    use username <- try(dict.get(user, "username"))

    username
}
```

## Custom `Error` Type

One of the limitations of the `Result` type is that it's difficult to return
different types of errors from one function. For example, an HTTP client and a
database driver likely have different error types. Without wrapping these types,
you'd encounter a type error when attempting to use both in the same function.

To solve this, you can define your own error type, and use it across your
codebase.

```gleam
// src/project/error.gleam
import gleam/dynamic

pub type AppError {
    DecodeError(dynamic.DecodeError)
    DatabaseError(DatabaseError)
    AuthError(AuthError)
}

pub type AuthError {
    Unauthorized
    Forbidden
}

pub type DatabaseError {
}
```

Then, you can use `map_error` to convert to your custom error type:

```gleam
// src/project/foobar.gleam
import gleam/dynamic.{type Dynamic}
import gleam/result

import project/error.{type AppError, AuthError, DatabaseError, DecodeError}

fn authenticate(payload: Dynamic) -> Result(String, AppError) {
  use #(token, username) <- result.try(
    payload
    |> decode_payload()
    |> result.map_error(DecodeError),
  )

  use session <- result.try(
    db.lookup_session(token) |> result.map_error(DatabaseError),
  )

  case session.username == username {
    True -> Ok(session.username)
    False -> Error(AuthError(error.Forbidden))
  }
}
```

## Errors with Context

While a custom error type is useful for unifying errors, it's common to want to
add context to your errors. Imagine a CLI application-- a stray "database error"
wouldn't be very helpful to the user; you'd want a trace of what went wrong and
where it occurred.

To solve this, the [`snag`](https://github.com/lpil/snag) library provides a
custom `Result` type which lets you contextualize errors with minimal
boilerplate.

```gleam
// example taken from snag documentation
import gleam/io
import gleam/result
import my_app.{User}
import snag.{type Result}

pub fn log_in(user_id: Int) -> Result(User) {
  use api_key <- result.try(
    my_app.read_file("api_key.txt")
    |> snag.context("Could not load API key")
  )

  use session_token <- result.try(
    user_id
    |> my_app.create_session(api_key)
    |> snag.context("Session creation failed")
  )

  Ok(session_token)
}

pub fn main() {
  case log_in(42) {
    Ok(session) -> io.println("Logged in!")
    Error(snag) -> {
      io.print(snag.pretty_print(snag))
      my_app.exit(1)
    }
  }
}
```

Ideally, Snag would be used at the top level of your application. Snag's error
type is opaque, so you can't pattern match on it. For example, you wouldn't want
to use Snag in a library, as it would make it challenging for users to match on
errors; they'd be met with a wall of text. However, when the operation is
pass/fail, Snag can provide better error messages.

_This comparison is analogous to the difference between
[`thiserror`](https://docs.rs/thiserror/) and [`anyhow`](https://docs.rs/anyhow)
in Rust._

## Assertions

In Gleam, assertions are used to check for unrecoverable errors. When an
assertion fails, the process crashes. The "let it crash" philosophy is common
in Erlang and Elixir, and slightly less common in Gleam. But, just like in
Erlang, [supervisors](/guide/otp/supervisors) can be used to watch and restart
processes that crash.

In Gleam, assertions follow the form of `let assert`. The `panic` keyword can
also be used to crash the process.

```gleam
fn main() {
    // This will crash if we can't authenticate
    let assert Ok(username) = #("token", "gleam")
        |> dynamic.from()
        |> authencate()

    case username {
        "gleam" -> io.println("Logged in!")
        // This will also crash
        _ -> panic as "invalid username"
    }
}
```
