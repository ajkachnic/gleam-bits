# Error Handling

In production environments, error handling is essential. One of the core tenets
of Erlang - and by extension, Gleam - is fault tolerance, gracefully handling
failure. In large applications, there _will_ be failures, so handling them well
is critical.

These failure scenarios come in two categories: recoverable and unrecoverable.
In Gleam, the `Result` type is used to represent recoverable errors.
In unrecoverable cases, an assertion can be used, crashing if there is an error.

Notably, idiomatic Gleam **does not** use exceptions for control flow. Rather,
the `result` module is used to explicity handle errors. If you're working with
Erlang or Elixir code which uses exceptions, you can use the
[`exception`](https://github.com/lpil/exception) library to catch them.

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
import gleam/decode

pub type AppError {
    DecodeError(decode.DecodeError)
    DatabaseError(DatabaseError)
    AuthError(AuthError)
}

pub type AuthError {
    Unauthorized
    Forbidden
}
```

Then, you can use `map_error` to convert to your custom error type:

```gleam
// src/project/foobar.gleam
import gleam/dynamic.{Dynamic}
import project/error.{AppError, AuthError, DatabaseError}

fn authenticate(payload: Dynamic) -> Result(User, AppError) {
    use #(token, username) <- payload
        |> dynamic.tuple2(dynamic.string, dynamic.string)
        |> result.map_error(DecodeError)

    use session <- db.lookup_session(token).map_error(DatabaseError)

    if session.user == username {
        Ok(session.user)
    } else {
        Error(AuthError(error.Unauthorized))
    }
}
```

## Errors with Context
