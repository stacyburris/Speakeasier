DROP TABLE IF EXISTS boarding;

CREATE TABLE boarding(
id SERIAL PRIMARY KEY,
city_name VARCHAR(255),
city_description TEXT,
image_url VARCHAR,
packing_list TEXT,
journal TEXT
);

DROP TABLE IF EXISTS stamped;

CREATE TABLE stamped(
id SERIAL PRIMARY KEY,
city_name VARCHAR(255),
city_description TEXT,
image_url VARCHAR,
packing_list TEXT,
journal TEXT 
);

