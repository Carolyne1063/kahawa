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
    @email VARCHAR(255),
     @status VARCHAR(50),
    @date DATETIME
AS
BEGIN
    INSERT INTO orders (orderId, userId, productId, quantity, price, flavor, name, address, phoneNumber, email, status, date)
    VALUES (@orderId, @userId, @productId, @quantity, @price, @flavor, @name, @address, @phoneNumber, @email, @status, @date);
END;
GO

