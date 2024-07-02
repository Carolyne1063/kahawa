CREATE PROCEDURE GetOrdersByUserId
    @userId VARCHAR(50)
AS
BEGIN
    SELECT orderId, userId, productId, quantity, price, flavor, name, status, date
    FROM orders
    WHERE userId = @userId;
END
