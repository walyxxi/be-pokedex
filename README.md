# My Pokemon API Spec

## Catch Pokemon

Endpoint : GET /api/mypokemon/catch

Response Success :

```json
{
  "message": "Gotcha, you got new pokemon.",
  "data": true
}
```

## Create Pokemon

Endpoint : POST /api/mypokemon/

Request Body :

```json
{
  "id": 1,
  "name": "bulbasaur",
  "nickname": "bulbasaur go"
}
```

Response Success :

```json
{
  "message": "Sucessfully create.",
  "data": {
    "id": 1,
    "name": "bulbasaur",
    "nickname": "bulbasaur go"
  }
}
```

## Rename/Update Pokemon

Endpoint : PUT /api/mypokemon/rename/:uid

Request Body :

```json
{
  "id": 1,
  "name": "bulbasaur",
  "nickname": "bulbasaur go",
  "count_update": 0
}
```

Response Success :

```json
{
  "message": "Sucessfully rename.",
  "data": {
    "id": 1,
    "name": "bulbasaur",
    "nickname": "bulbasaur go-0",
    "count_update": 1
  }
}
```

## Release/Remove Pokemon

Endpoint : DELETE /api/mypokemon/release/:uid

Response Success :

```json
{
  "message": "Sucessfully release.",
  "data": {
    "number": 11,
    "isPrimeNumber": true
  }
}
```
