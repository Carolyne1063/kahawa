CREATE PROCEDURE CreateOrder
    @orderId VARCHAR(255),
    @userId VARCHAR(255),
    @productId VARCHAR(255),
    @quantity VARCHAR(255),
    @price VARCHAR(255),
    @flavor VARCHAR(255),
    @name VARCHAR(255)
AS
BEGIN
    INSERT INTO orders (orderId, userId, productId, quantity, price, flavor, name)
    VALUES (@orderId, @userId, @productId, @quantity, @price, @flavor, @name);
END;
GO