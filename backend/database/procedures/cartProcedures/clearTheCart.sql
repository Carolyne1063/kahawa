CREATE PROCEDURE ClearCart
    @userId VARCHAR(255)
AS
BEGIN
    DELETE FROM cart
    WHERE userId = @userId;
END;
GO