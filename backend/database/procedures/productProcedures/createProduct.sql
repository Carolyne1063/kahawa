CREATE PROCEDURE CreateProduct
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
    INSERT INTO products (productId, name, short_description, price, image, category, stock, flavor)
    VALUES (@productId, @name, @short_description, @price, @image, @category, @stock, @flavor);
END;