Building a **realistic QR Restaurant Ordering System**, It is designed it as if a real backend exists, even if you're using mock APIs initially.

# Overall Architecture

```text
Restaurant
│
├── Customer Dashboard
├── Kitchen Dashboard
├── Cashier Dashboard
└── Admin Dashboard
```

---

# QR Flow

Each table has a unique QR code.

Example:

```text
Table 1

QR →
https://restaurant.com/table/1
```

When customer scans:

```text
/table/1
```

Frontend extracts:

```js
tableId = 1;
```

Store it in Context or Redux.

Then every order automatically includes:

```json
{
  "tableId": 1,
  "items": [...]
}
```

---

# Project Folder Structure

```text
src/

├── app/
│   └── store.js
│
├── api/
│   ├── axios.js
│   ├── authApi.js
│   ├── orderApi.js
│   ├── menuApi.js
│   ├── tableApi.js
│   └── paymentApi.js
│
├── routes/
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleRoute.jsx
│
├── layouts/
│   ├── CustomerLayout.jsx
│   ├── AdminLayout.jsx
│   ├── KitchenLayout.jsx
│   └── CashierLayout.jsx
│
├── pages/
│
│   ├── customer/
│   │   ├── MenuPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── OrderStatusPage.jsx
│   │   └── SuccessPage.jsx
│   │
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Tables.jsx
│   │   ├── MenuManagement.jsx
│   │   ├── Categories.jsx
│   │   └── Reports.jsx
│   │
│   ├── kitchen/
│   │   ├── KitchenDashboard.jsx
│   │   └── OrderQueue.jsx
│   │
│   └── cashier/
│       ├── Billing.jsx
│       ├── Payments.jsx
│       └── Receipts.jsx
│
├── components/
│   ├── common/
│   ├── customer/
│   ├── admin/
│   ├── kitchen/
│   └── cashier/
│
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── TableContext.jsx
│
├── redux/
│   ├── slices/
│   │
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── orderSlice.js
│   │   ├── menuSlice.js
│   │   ├── tableSlice.js
│   │   └── paymentSlice.js
│   │
│   └── store.js
│
├── hooks/
│
├── utils/
│
└── assets/
```

---

# React Router Structure

## Public Routes

```text
/table/:tableId

/cart

/order/:orderId
```

Example:

```text
/table/5
```

Customer is sitting at Table 5.

---

## Admin Routes

```text
/adm/login

/admin

/admin/orders

/admin/menu

/admin/categories

/admin/tables

/admin/reports
```

---

## Kitchen Routes

```text
/kit/login

/kitchen

/kitchen/orders
```

---

## Cashier Routes

```text
/ca/login

/cashier

/cashier/billing

/cashier/payments
```

---

# Context API Usage

Use Context ONLY for UI-related state.

### Auth Context

```js
user;
login();
logout();
```

---

### Table Context

```js
selectedTable;
setSelectedTable();
```

When QR is scanned:

```js
setSelectedTable(tableId);
```

---

### Theme Context

```js
darkMode;
toggleTheme();
```

---

# Redux Usage

Use Redux for business data.

## cartSlice

```js
cartItems;
addItem();
removeItem();
clearCart();
```

---

## orderSlice

```js
orders;
createOrder();
updateStatus();
```

---

## menuSlice

```js
menuItems;
categories;
```

---

## paymentSlice

```js
payments;
```

---

## authSlice

```js
user;
role;
token;
```

---

# Axios Setup

```js
// api/axios.js

import axios from "axios";

export default axios.create({
  baseURL: "https://api.restaurant.com/api",
});
```

---

# Backend Routes

## Authentication

```text
POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me
```

---

# Customer Routes

## Menu

```text
GET /api/menu

GET /api/menu/categories

GET /api/menu/:id
```

---

## Cart

Frontend only.

No API needed.

---

## Orders

```text
POST /api/orders

GET /api/orders/:id

PUT /api/orders/:id/cancel
```

---

## Table Routes

```text
GET /api/tables

GET /api/tables/:id
```

---

# Kitchen Routes

### Get Pending Orders

```text
GET /api/kitchen/orders
```

---

### Update Status

```text
PUT /api/kitchen/orders/:id/preparing

PUT /api/kitchen/orders/:id/ready

PUT /api/kitchen/orders/:id/served
```

---

# Cashier Routes

### Billing

```text
GET /api/cashier/orders

GET /api/cashier/bill/:orderId
```

---

### Payments

```text
POST /api/payments/cash

POST /api/payments/online
```

---

# Admin Routes

### Dashboard

```text
GET /api/admin/dashboard
```

Returns:

```json
{
  "totalOrders": 120,
  "todayRevenue": 25000,
  "activeTables": 12
}
```

---

### Menu Management

```text
GET /api/admin/menu

POST /api/admin/menu

PUT /api/admin/menu/:id

DELETE /api/admin/menu/:id
```

---

### Categories

```text
GET /api/admin/categories

POST /api/admin/categories

PUT /api/admin/categories/:id

DELETE /api/admin/categories/:id
```

---

### Tables

```text
GET /api/admin/tables

POST /api/admin/tables

PUT /api/admin/tables/:id
```

---

### Reports

```text
GET /api/admin/reports/sales

GET /api/admin/reports/orders

GET /api/admin/reports/revenue
```

---

# Database Tables (MVP)

```text
users

tables

categories

menu_items

orders

order_items

payments
```

---

# Login Credentials (Temporary)

```text
Admin
username: admin
password: admin123

Kitchen
username: kitchen
password: kitchen123

Cashier
username: cashier
password: cashier123
```

Customers do **not** log in.

They simply:

```text
Scan QR
↓
Open Menu
↓
Order Food
```

This is how most modern restaurant QR systems work, and it keeps the customer experience frictionless while giving you a clean architecture that's easy to connect to a real Node.js + PostgreSQL backend later.
