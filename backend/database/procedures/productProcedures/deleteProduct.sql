CREATE PROCEDURE DeleteProduct
    @productId VARCHAR(255)
AS
BEGIN
    DELETE FROM products WHERE productId = @productId;
END;