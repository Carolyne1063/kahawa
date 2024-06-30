CREATE PROCEDURE GetOrderById
    @orderId VARCHAR(255)
AS
BEGIN
    SELECT * FROM orders WHERE orderId = @orderId;
END;
GO