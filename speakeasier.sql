DROP TABLE IF EXISTS places;

CREATE TABLE places(
id SERIAL PRIMARY KEY,
city_name VARCHAR(255),
city_description TEXT,
city_url VARCHAR,
packing_list TEXT,
journal TEXT
);
