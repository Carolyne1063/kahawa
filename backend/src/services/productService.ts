import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../interfaces/products';
import { sqlConfig } from '../sqlConfig';

const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message;
    } else if (typeof err === 'string') {
        return err;
    } else {
        return 'An unknown error occurred';
    }
};

export const createProduct = async (product: Product) => {
    const productId = uuidv4();
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('productId', sql.VarChar, productId)
            .input('name', sql.VarChar, product.name)
            .input('short_description', sql.VarChar, product.short_description)
            .input('price', sql.VarChar, product.price)
            .input('image', sql.VarChar, product.image)
            .input('category', sql.VarChar, product.category)
            .input('stock', sql.VarChar, product.stock)
            .input('flavor', sql.VarChar, product.flavor)
            .execute('CreateProduct');
    } catch (err) {
        throw new Error(`Error creating product: ${getErrorMessage(err)}`);
    }
};

export const updateProduct = async (productId: string, product: Product) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('productId', sql.VarChar, productId)
            .input('name', sql.VarChar, product.name)
            .input('short_description', sql.VarChar, product.short_description)
            .input('price', sql.VarChar, product.price)
            .input('image', sql.VarChar, product.image)
            .input('category', sql.VarChar, product.category)
            .input('stock', sql.VarChar, product.stock)
            .input('flavor', sql.VarChar, product.flavor)
            .execute('UpdateProduct');
    } catch (err) {
        throw new Error(`Error updating product: ${getErrorMessage(err)}`);
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('productId', sql.VarChar, productId)
            .execute('DeleteProduct');
    } catch (err) {
        throw new Error(`Error deleting product: ${getErrorMessage(err)}`);
    }
};

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().execute('GetAllProducts');
        return result.recordset.filter(product => product.stock > 0);  
    } catch (err) {
        throw new Error(`Error fetching products: ${getErrorMessage(err)}`);
    }
};


export const getProductById = async (productId: string): Promise<Product> => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('productId', sql.VarChar, productId)
            .execute('GetProductById');
        return result.recordset[0];
    } catch (err) {
        throw new Error(`Error fetching product: ${getErrorMessage(err)}`);
    }
};
