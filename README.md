# Rest API Express
This project provides a quick and easy implementation of an api rest as proof of concept.

## Requirements
- Nodejs >= v20.5.1
- PrismaORM
- Typegoose
- Express
- Pnpm >= 8.7.4

## Installation
- Install deps and devDeps with `pnpm`
```sh
$ pnpm install
```
- Run prisma ORM migrations
```sh
$ npx prisma migrate dev
```
## Configuration
- Add the `.env` file with values
- Raise an instance of postgres and mongodb (use your mongo atlas account)

## Usage
- Run in development mode
```sh
$ pnpm run dev
```
- Output
```sh
[INFO] 01:27:04 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
┌─────────┬─────────┬──────────────────────┬──────────────────────────────────────┐
│ (index) │ METHOD  │         PATH         │               HANDLER                │
├─────────┼─────────┼──────────────────────┼──────────────────────────────────────┤
│    0    │  'GET'  │     '/api/users'     │      'UserController.getUsers'       │
│    1    │  'GET'  │   '/api/users/:id'   │     'UserController.getUserById'     │
│    2    │ 'PATCH' │     '/api/users'     │     'UserController.createUser'      │
│    3    │  'GET'  │     '/api/items'     │      'ItemController.getItems'       │
│    4    │  'GET'  │   '/api/items/:id'   │     'ItemController.getItemById'     │
│    5    │ 'PATCH' │     '/api/items'     │     'ItemController.createItem'      │
│    6    │  'GET'  │   '/api/resources'   │  'ResourceController.getResources'   │
│    7    │  'GET'  │ '/api/resources/:id' │ 'ResourceController.getResourceById' │
│    8    │ 'PATCH' │   '/api/resources'   │ 'ResourceController.createResource'  │
└─────────┴─────────┴──────────────────────┴──────────────────────────────────────┘
INFO [21-10-2023 1:27:05 AM GMT-0500]: Server is running on port 5000
INFO [21-10-2023 1:27:05 AM GMT-0500]: Successful mongodb connection
```

## License

[MIT](https://github.com/gcanahuirev/express-backend/blob/main/LICENSE.md)