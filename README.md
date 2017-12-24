mock-jwks-endpoint
==================
![build status](https://gitlab.com/jorge.suit/mock-jwks-endpoint/badges/master/build.svg)

If you need use a JWKS endpoint while testing your code this could be
good ally.

It implement the routes `/make_jws` and `/.well-known/jwks.json`

## POST /make_jws

This route will create a signed JWT with the payload provided in the
body of the request.

### Body

The body must be a json including a payload property which must be an
object.

#### Example

```json
{
  sub: 'user@domain.com',
  admin: true
}
```

### Success

`200 OK`

The body of the response is and object with the property `token` whose
value if the signed JWT.

### Error

`400`

If the body is not a valid json object.

## GET /.well-known/jwks.json

Return the jwks object needed to validate the JWS tokens generated
from this service.

