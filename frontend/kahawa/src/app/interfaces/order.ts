export interface Order {
    editingStatus?: boolean;
    orderId: string;
    userId: string;
    productId: string;
    quantity: string;
    price: string;
    flavor: string;
    name: string;
    status: string; 
    address: string;
    phoneNumber: string;  
    date?: Date;
    totalPrice?: number;
}
