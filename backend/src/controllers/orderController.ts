import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message;
    } else if (typeof err === 'string') {
        return err;
    } else {
        return 'An unknown error occurred';
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;
        await orderService.createOrder(userId, productId, quantity);
        res.status(201).json({ message: 'Order created successfully' });  // Changed to JSON
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { quantity } = req.body;
        await orderService.updateOrder(req.params.orderId, quantity);
        res.status(200).json({ message: 'Order updated successfully' });  // Changed to JSON
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        await orderService.deleteOrder(req.params.orderId);
        res.status(200).json({ message: 'Order deleted successfully' });  // Changed to JSON
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.status(200).json(order);
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.params.userId);
        res.status(200).json(orders);
    } catch (err: unknown) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
};