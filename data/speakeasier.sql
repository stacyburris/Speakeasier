DROP TABLE IF EXISTS boarding;

CREATE TABLE boarding(
id SERIAL PRIMARY KEY,
city_name VARCHAR(255) UNIQUE,
city_description TEXT,
special VARCHAR,
packing_list TEXT,
journal TEXT,
images0 VARCHAR,
images1 VARCHAR,
images2 VARCHAR,
images3 VARCHAR,
images4 VARCHAR,
images5 VARCHAR,
images6 VARCHAR,
images7 VARCHAR,
images8 VARCHAR
);

DROP TABLE IF EXISTS stamped;

CREATE TABLE stamped(
id SERIAL PRIMARY KEY,
city_name VARCHAR(255) UNIQUE,
city_description TEXT,
special VARCHAR,
packing_list TEXT,
journal TEXT,
images0 VARCHAR,
images1 VARCHAR,
images2 VARCHAR,
images3 VARCHAR,
images4 VARCHAR,
images5 VARCHAR,
images6 VARCHAR,
images7 VARCHAR,
images8 VARCHAR
);

