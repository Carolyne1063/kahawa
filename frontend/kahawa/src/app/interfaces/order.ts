export interface Order {
    orderId: string;
    userId: string;
    productId: string;
    quantity: string;
    price: string;
    flavor: string;
    name: string;
    status: string;   // Add status field
    date: string;
    totalPrice?: number;
}
