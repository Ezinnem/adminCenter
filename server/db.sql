CREATE DATABASE reviewhero;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    ON_sale boolean
);

CREATE TABLE resturants(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO resturants (name, location, price_range) values ('Chop Life', 'Nigeria', 4);