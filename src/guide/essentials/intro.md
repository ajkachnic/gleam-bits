# Introduction

## Foreword

Gleam is interesting language, especially regarding the features it _does not_ have. There's no
macro system or metaprogramming; There's no interfaces or typeclasses; There's no function
overloading or operator overloading; There's no dedicated `async/await` syntax. The few bits of
syntactic sugar that Gleam does have, like `use`, are general and widely useful. **By eschewing so
many features, Gleam is a geniunely simple language.**

## Prerequisites

This guide picks up where [the Gleam tour](https://tour.gleam.run) leaves off. We won't be
explaining the very basics, like syntax, but we'll cover some of the more nuanced topics.

We'll also be assuming some basic knowledge of the Erlang/OTP runtime. If you're unfamiliar, check
[the resources page](/guide/further/resources#otp) and come back when you're ready.
