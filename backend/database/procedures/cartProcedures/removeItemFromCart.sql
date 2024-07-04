CREATE PROCEDURE RemoveItemFromCart
    @cartId VARCHAR(255),
    @userId VARCHAR(255),
    @productId VARCHAR(255)
AS
BEGIN
    DELETE FROM cart
    WHERE cartId = @cartId AND userId = @userId AND productId = @productId;
END;
GO

 