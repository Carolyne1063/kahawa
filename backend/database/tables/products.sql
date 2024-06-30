CREATE TABLE products (
    productId VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(255),
    stock VARCHAR(255) NOT NULL,
    flavor VARCHAR(255) NOT NULL
);

SELECT * FROM products;
