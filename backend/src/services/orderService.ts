import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../interfaces/orders';
import { sqlConfig } from '../sqlConfig';

export const createOrder = async (userId: string, productId: string, quantity: string) => {
    const orderId = uuidv4();
    try {
        let pool = await sql.connect(sqlConfig);

        // Fetch product details
        const productResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');

        const { price, flavor, name } = productResult.recordset[0];

        // Fetch user details
        const userResult = await pool.request()
            .input('userId', sql.VarChar, userId)
            .query('SELECT address, phoneNumber, email FROM users WHERE userId = @userId');

        const { address, phoneNumber, email } = userResult.recordset[0];

        await pool.request()
            .input('orderId', sql.VarChar, orderId)
            .input('userId', sql.VarChar, userId)
            .input('productId', sql.VarChar, productId)
            .input('quantity', sql.VarChar, quantity)
            .input('price', sql.VarChar, (parseFloat(price) * parseFloat(quantity)).toFixed(2))  // Convert price to string format
            .input('flavor', sql.VarChar, flavor)
            .input('name', sql.VarChar, name)
            .input('address', sql.VarChar, address)  // Include address
            .input('phoneNumber', sql.VarChar, phoneNumber)  // Include phone number
            .input('email', sql.VarChar, email)  // Include email
            .execute('CreateOrder');
    } catch (err) {
        throw new Error(`Error creating order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

export const updateOrder = async (orderId: string, quantity: string) => {
    try {
        let pool = await sql.connect(sqlConfig);

        // Fetch product details
        const productResult = await pool.request()
            .input('orderId', sql.VarChar, orderId)
            .query('SELECT productId FROM orders WHERE orderId = @orderId');

        const productId = productResult.recordset[0].productId;

        const productDetailResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');

        const { price, flavor, name } = productDetailResult.recordset[0];

        await pool.request()
            .input('orderId', sql.VarChar, orderId)
            .input('quantity', sql.VarChar, quantity)
            .input('price', sql.VarChar, (parseFloat(price) * parseFloat(quantity)).toFixed(2))  // Convert price to string format
            .input('flavor', sql.VarChar, flavor)
            .input('name', sql.VarChar, name)
            .execute('UpdateOrder');
    } catch (err) {
        throw new Error(`Error updating order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

export const deleteOrder = async (orderId: string) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('orderId', sql.VarChar, orderId)
            .execute('DeleteOrder');
    } catch (err) {
        throw new Error(`Error deleting order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().execute('GetAllOrders');
        return result.recordset;
    } catch (err) {
        throw new Error(`Error fetching orders: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('orderId', sql.VarChar, orderId)
            .execute('GetOrderById');
        return result.recordset[0];
    } catch (err) {
        throw new Error(`Error fetching order: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
