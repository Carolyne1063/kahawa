"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
const productRoutes_1 = __importDefault(require("./routers/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routers/orderRoutes"));
const cartRoutes_1 = __importDefault(require("./routers/cartRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', userRoutes_1.default);
app.use('/api', productRoutes_1.default);
app.use('/api', orderRoutes_1.default);
app.use('/cart', cartRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
app.get('/api/coffee-types', (req, res) => {
    // Fetch number of coffee types from the database
    res.json({ count: 10 });
});
app.get('/api/orders', (req, res) => {
    // Fetch number of orders from the database
    res.json({ count: 150 });
});
app.get('/api/customers', (req, res) => {
    // Fetch number of customers from the database
    res.json({ count: 75 });
});
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
//CUSTOMERS
const customers = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' }
    // Add more customer data as needed
];
app.get('/api/customers', (req, res) => {
    res.json(customers);
});
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
//MENU
const menuItems = [
    { id: 1, image: 'coffee.jpg', name: 'Latte', ingredients: 'Espresso, steamed milk' },
    { id: 2, image: 'cappuccino.jpg', name: 'Cappuccino', ingredients: 'Espresso, steamed milk, foam' }
    // Add more menu items as needed
];
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
//ORDERS
const orders = [
    { id: 101, item: 'Product A', customerId: 1, name: 'John Doe', address: '123 Street, City', tel: '123-456-7890', status: 'Confirmed' },
    { id: 102, item: 'Product B', customerId: 2, name: 'Jane Smith', address: '456 Avenue, Town', tel: '987-654-3210', status: 'Pending' }
    // Add more order data as needed
];
app.get('/api/orders', (req, res) => {
    res.json(orders);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
