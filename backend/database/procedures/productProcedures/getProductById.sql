CREATE PROCEDURE GetProductById
    @productId VARCHAR(255)
AS
BEGIN
    SELECT * FROM products WHERE productId = @productId;
END;