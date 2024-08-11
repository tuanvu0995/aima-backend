# API usage

## Gettings started

We're using postman to test the API. You can download the collection [here](/docs/AIMA%20API.postman_collection.json). And the environment file [here](/docs/AIMA%20API.postman_environment.json).

## Basic usage

### Authentication

To authenticate, you need to send a POST request to `/auth/login` with the following body:

```http
POST http://localhost:3000/auth/login
Content-Type: application/json
{
    "email": "admin@gmail.com",
    "password": "password"
}
```

You will receive a response like this:

```json
{
  "accessToken": "eyJhb_GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......"
}
```

You need to include this token in the header of your request to access protected routes:

```http
GET http://localhost:3000/products?page=1&limit=25
Authorization Bearer eyJhb_GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......
```

### API Endpoints

#### Auth

- **POST** `/auth/login` - Login with email and password

#### Products

- **GET** `/products?page=1&limit=25` - Get all products
- **GET** `/products/:id` - Get a product by ID
- **POST** `/products` - Create a new product
- **PATCH** `/products/:id` - Update a product
- **DELETE** `/products/:id` - Delete a product
- **RESTORE** `/products/:id/restore` - Restore a deleted product

#### Suppliers

- **GET** `/suppliers?page=1&limit=25` - Get all suppliers
- **GET** `/suppliers/:id` - Get a supplier by ID
- **POST** `/suppliers` - Create a new supplier
- **PATCH** `/suppliers/:id` - Update a supplier
- **DELETE** `/suppliers/:id` - Delete a supplier
- **RESTORE** `/suppliers/:id/restore` - Restore a deleted supplier

#### Reports

- **GET** `/reports/restock` - Get restock report
- **GET** `/reports/monthly-sales/2023-07-01` - Get monthly sales report for July 2023
