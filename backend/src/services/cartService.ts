import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '../interfaces/cart';
import { sqlConfig } from '../sqlConfig';

// Add an item to the cart
export const addItemToCart = async (userId: string, productId: string, quantity: string) => {
    const cartId = uuidv4();  // Generate a unique ID for the cart item

    try {
        let pool = await sql.connect(sqlConfig);

        // Fetch product details
        const productResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT price, flavor, name FROM products WHERE productId = @productId');

        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }

        const { price, flavor, name } = productResult.recordset[0];

        await pool.request()
            .input('cartId', sql.VarChar, cartId)
            .input('userId', sql.VarChar, userId)
            .input('productId', sql.VarChar, productId)
            .input('quantity', sql.VarChar, quantity)
            .input('price', sql.VarChar, price)
            .input('flavor', sql.VarChar, flavor)
            .input('name', sql.VarChar, name)
            .execute('AddItemToCart');
    } catch (err) {
        console.error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

// Update an item in the cart
export const updateCartItem = async (cartId: string, userId: string, productId: string, quantity: string) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('cartId', sql.VarChar, cartId)
            .input('userId', sql.VarChar, userId)
            .input('productId', sql.VarChar, productId)
            .input('quantity', sql.VarChar, quantity)
            .execute('UpdateCartItem');
    } catch (err) {
        console.error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

// Remove an item from the cart
export const removeItemFromCart = async (cartId: string, userId: string, productId: string) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('cartId', sql.VarChar, cartId)
            .input('userId', sql.VarChar, userId)
            .input('productId', sql.VarChar, productId)
            .execute('RemoveItemFromCart');
    } catch (err) {
        console.error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

// Get all items in the cart
export const getCartItems = async (userId: string): Promise<CartItem[]> => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('userId', sql.VarChar, userId)
            .execute('GetCartItems');
        return result.recordset;
    } catch (err) {
        console.error(`Error fetching cart items: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error fetching cart items: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

// Clear the cart
export const clearCart = async (userId: string) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('userId', sql.VarChar, userId)
            .execute('ClearCart');
    } catch (err) {
        console.error(`Error clearing cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error clearing cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};
