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
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
