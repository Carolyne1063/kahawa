CREATE PROCEDURE CancelOrder
    @orderId VARCHAR(255)
AS
BEGIN

    UPDATE orders
    SET status = 'Cancelled'
    WHERE orderId = @orderId;
END;

DROP PROCEDURE CancelOrder;