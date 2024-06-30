CREATE PROCEDURE CreateOrder
    @orderId VARCHAR(255),
    @userId VARCHAR(255),
    @productId VARCHAR(255),
    @quantity VARCHAR(255),
    @price VARCHAR(255),
    @flavor VARCHAR(255),
    @name VARCHAR(255),
    @address VARCHAR(255),
    @phoneNumber VARCHAR(255),
    @email VARCHAR(255)
AS
BEGIN
    INSERT INTO orders (orderId, userId, productId, quantity, price, flavor, name, address, phoneNumber, email)
    VALUES (@orderId, @userId, @productId, @quantity, @price, @flavor, @name, @address, @phoneNumber, @email);
END;
GO

DROP PROCEDURE CreateOrder;