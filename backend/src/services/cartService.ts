import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '../interfaces/cart';
import { sqlConfig } from '../sqlConfig';


export const addItemToCart = async (userId: string, productId: string, quantity: string) => {
    const cartId = uuidv4();  

    try {
        let pool = await sql.connect(sqlConfig);

        
        const productResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT price, flavor, name, stock FROM products WHERE productId = @productId');

        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }

        const { price, flavor, name, stock } = productResult.recordset[0];
        const newStock = stock - parseInt(quantity);
        if (newStock < 0) {
            throw new Error('Not enough stock available');
        }

        const totalPrice = (parseFloat(price) * parseFloat(quantity)).toFixed(2);  

        const transaction = new sql.Transaction(pool);

        try {
            await transaction.begin();

            await transaction.request()
                .input('cartId', sql.VarChar, cartId)
                .input('userId', sql.VarChar, userId)
                .input('productId', sql.VarChar, productId)
                .input('quantity', sql.VarChar, quantity)
                .input('price', sql.VarChar, totalPrice)  
                .input('flavor', sql.VarChar, flavor)
                .input('name', sql.VarChar, name)
                .execute('AddItemToCart');

            await transaction.request()
                .input('productId', sql.VarChar, productId)
                .input('newStock', sql.Int, newStock)
                .query('UPDATE products SET stock = @newStock WHERE productId = @productId');

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    } catch (err) {
        console.error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error adding item to cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};


export const updateCartItem = async (cartId: string, userId: string, productId: string, quantity: string) => {
    try {
        let pool = await sql.connect(sqlConfig);

        
        const productResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT price FROM products WHERE productId = @productId');

        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }

        const { price } = productResult.recordset[0];
        const totalPrice = (parseFloat(price) * parseFloat(quantity)).toFixed(2); 

        await pool.request()
            .input('cartId', sql.VarChar, cartId)
            .input('userId', sql.VarChar, userId)
            .input('productId', sql.VarChar, productId)
            .input('quantity', sql.VarChar, quantity)
            .input('price', sql.VarChar, totalPrice)  
            .execute('UpdateCartItem');
    } catch (err) {
        console.error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error updating cart item: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};

export const removeItemFromCart = async (cartId: string, userId: string, productId: string) => {
    try {
        let pool = await sql.connect(sqlConfig);

        
        const cartResult = await pool.request()
            .input('cartId', sql.VarChar, cartId)
            .query('SELECT quantity FROM cart WHERE cartId = @cartId');

        if (cartResult.recordset.length === 0) {
            throw new Error('Cart item not found');
        }

        const quantity = cartResult.recordset[0].quantity;

       
        const productResult = await pool.request()
            .input('productId', sql.VarChar, productId)
            .query('SELECT stock FROM products WHERE productId = @productId');

        if (productResult.recordset.length === 0) {
            throw new Error('Product not found');
        }

        const { stock } = productResult.recordset[0];
        const newStock = stock + parseInt(quantity);

        const transaction = new sql.Transaction(pool);

        try {
            await transaction.begin();

            await transaction.request()
                .input('cartId', sql.VarChar, cartId)
                .input('userId', sql.VarChar, userId)
                .input('productId', sql.VarChar, productId)
                .execute('RemoveItemFromCart');

            await transaction.request()
                .input('productId', sql.VarChar, productId)
                .input('newStock', sql.Int, newStock)
                .query('UPDATE products SET stock = @newStock WHERE productId = @productId');

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    } catch (err) {
        console.error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
        throw new Error(`Error removing item from cart: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
};


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
