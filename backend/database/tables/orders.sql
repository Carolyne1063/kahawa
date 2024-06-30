CREATE TABLE orders (
    orderId VARCHAR(255) PRIMARY KEY NOT NULL,
    userId VARCHAR(255) NOT NULL,
    productId VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    flavor VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (productId) REFERENCES products(productId)
);

ALTER TABLE orders ADD email VARCHAR(255);

SELECT * FROM orders;