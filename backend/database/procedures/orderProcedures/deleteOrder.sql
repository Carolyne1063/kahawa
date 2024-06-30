CREATE PROCEDURE DeleteOrder
    @orderId VARCHAR(255)
AS
BEGIN
    DELETE FROM orders WHERE orderId = @orderId;
END;
GO