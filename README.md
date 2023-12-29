# Rest API Express

This project provides a quick and easy implementation of an api rest as proof of concept.

## Requirements

- Nodejs >= v20.10.0
- PrismaORM
- Typegoose
- Express
- Pnpm >= 8.13.1

## Installation

- Install deps and devDeps with `pnpm`

```sh
pnpm install
```

- Run prisma ORM migrations

```sh
npx prisma migrate dev
```

## Configuration

- Add the `.env` file with values
- Raise an instance of postgres and mongodb (use your mongo atlas account)

## Usage

- Run in development mode

```sh
pnpm run dev
```

- Output

```sh
┌─────────┬─────────┬──────────────────────┬──────────────────────────────────────┐
│ (index) │ METHOD  │         PATH         │               HANDLER                │
├─────────┼─────────┼──────────────────────┼──────────────────────────────────────┤
│    0    │  'GET'  │     '/api/users'     │      'UserController.getUsers'       │
│    1    │  'GET'  │   '/api/users/:id'   │     'UserController.getUserById'     │
│    2    │  'PUT'  │     '/api/users'     │     'UserController.createUser'      │
│    3    │  'GET'  │     '/api/items'     │      'ItemController.getItems'       │
│    4    │  'GET'  │   '/api/items/:id'   │     'ItemController.getItemById'     │
│    5    │  'PUT'  │     '/api/items'     │     'ItemController.createItem'      │
│    6    │  'GET'  │   '/api/resources'   │  'ResourceController.getResources'   │
│    7    │  'GET'  │ '/api/resources/:id' │ 'ResourceController.getResourceById' │
│    8    │  'PUT'  │   '/api/resources'   │ 'ResourceController.createResource'  │
└─────────┴─────────┴──────────────────────┴──────────────────────────────────────┘
```
## License

[MIT](https://github.com/gcanahuirev/express-backend/blob/main/LICENSE.md)
