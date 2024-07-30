# Extensions

Extensions are a pattern for adding new functionality to Gleam modules. Consider
Gleam's `http` client (`gleam/http`) as an example. We might want to implement
additional setters on top of the `Request` type.

```gleam
// project/extended/http_ext.gleam
import gleam/option.{type Option}
import gleam/http/request.{type Request}

pub fn set_query_string(
  request: Request(body),
  query: Option(String),
) -> Request(body) {
  Request(..request, query: query)
}
```

Using an extension module, it's easier to read and understand code that uses it.
For example, here's
