CREATE PROCEDURE GetCartItems
    @userId VARCHAR(255)
AS
BEGIN
    SELECT * FROM cart
    WHERE userId = @userId;
END;
GO