CREATE PROCEDURE CancelOrder
    @orderId VARCHAR(255)
AS
BEGIN
    -- Update the order status to "Cancelled"
    UPDATE orders
    SET status = 'Cancelled'
    WHERE orderId = @orderId;
END;

DROP PROCEDURE CancelOrder;