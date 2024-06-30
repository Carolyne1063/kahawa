CREATE PROCEDURE UpdateCartItem
    @cartId VARCHAR(255),
    @userId VARCHAR(255),
    @productId VARCHAR(255),
    @quantity VARCHAR(255)
AS
BEGIN
    UPDATE cart
    SET quantity = @quantity
    WHERE cartId = @cartId AND userId = @userId AND productId = @productId;
END;
GO