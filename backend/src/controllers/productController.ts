import { Request, Response } from 'express';
import * as productService from '../services/productService';

const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message;
    } else if (typeof err === 'string') {
        return err;
    } else {
        return 'An unknown error occurred';
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        await productService.createProduct(req.body);
        res.status(201).send('Product created successfully');
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        await productService.updateProduct(req.params.productId, req.body);
        res.status(200).send('Product updated successfully');
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await productService.deleteProduct(req.params.productId);
        res.status(200).send('Product deleted successfully');
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        res.status(200).json(product);
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};
