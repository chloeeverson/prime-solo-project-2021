-- CREATE DATABASE: 'packMe'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"location" VARCHAR (50) NOT NULL,
	"start_date" date,
	"days" NUMERIC,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100),
	"amount" NUMERIC,
	"complete" BOOLEAN DEFAULT FALSE,
	"list_id" INT REFERENCES "list"
);



