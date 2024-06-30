CREATE PROCEDURE AddItemToCart
    @cartId VARCHAR(255),
    @userId VARCHAR(255),
    @productId VARCHAR(255),
    @quantity VARCHAR(255),
    @price VARCHAR(255),
    @flavor VARCHAR(255),
    @name VARCHAR(255)
AS
BEGIN
    INSERT INTO cart (cartId, userId, productId, quantity, price, flavor, name)
    VALUES (@cartId, @userId, @productId, @quantity, @price, @flavor, @name);
END;
GO