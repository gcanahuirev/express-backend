# USERS
# Get all users:
GET http://localhost:5000/api/users
HTTP 200

# Get one user by id:
GET http://localhost:5000/api/users
[QueryStringParams]
id: 1
HTTP 200

# Create a new user:
# PUT http://localhost:5000/api/users
# {
#     "name": "Jhon Doe",
#     "email": "jhondoe@outlook.com",
#     "age": 3
# }
# HTTP 201

# ITEMS
# Get all items:
GET http://localhost:5000/api/items
HTTP 200

# Get one item by id:
GET http://localhost:5000/api/items
[QueryStringParams]
id: 1
HTTP 200

# Create a new item:
# PUT http://localhost:5000/api/items
# {
#     "code": "COD-ITEM",
#     "name": "New item"
# }
# HTTP 201

# RESOURCES
# Get all resources:
GET http://localhost:5000/api/resources
HTTP 200

# Get one resource by id:
GET http://localhost:5000/api/resources
[QueryStringParams]
id: 1
HTTP 200

# Create a new resource:
# PUT http://localhost:5000/api/resources
# {
#     "code": "COD-RESC",
#     "description": "New resource",
#     "unit": "m",
#     "type_resource": "metal",
#     "unit_cost": 45.50,
#     "project_id": 1
# }
# HTTP 201