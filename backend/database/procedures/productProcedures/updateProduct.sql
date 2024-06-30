CREATE PROCEDURE UpdateProduct
    @productId VARCHAR(255),
    @name VARCHAR(255),
    @short_description VARCHAR(255),
    @price VARCHAR(255),
    @image VARCHAR(255),
    @category VARCHAR(255),
    @stock VARCHAR(255),
    @flavor VARCHAR(255)
AS
BEGIN
    UPDATE products
    SET name = @name, short_description = @short_description, price = @price,
        image = @image, category = @category, stock = @stock, flavor = @flavor
    WHERE productId = @productId;
END;