CREATE PROCEDURE UpdateOrder
    @orderId VARCHAR(255),
    @quantity VARCHAR(255),
    @price VARCHAR(255),
    @flavor VARCHAR(255),
    @name VARCHAR(255)
AS
BEGIN
    UPDATE orders
    SET quantity = @quantity,
        price = @price,
        flavor = @flavor,
        name = @name
    WHERE orderId = @orderId;
END;
GO