DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  categorieid  INTEGER PRIMARY KEY,
  description VARCHAR(255) NOT NULL);

DROP TABLE IF EXISTS sub_categories;

 CREATE TABLE sub_categories (
  subCategorieId  INTEGER PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  categorieid  INTEGER,
  merchantCategorie INTEGER NOT NULL,
  FOREIGN KEY (categorieid) REFERENCES categories(categorieid));

DROP TABLE IF EXISTS panverification;

CREATE TABLE panverification(
  panverificationId INTEGER PRIMARY KEY
);

DROP TABLE IF EXISTS bankverification;

CREATE TABLE bankverification(
bankverificationId INTEGER PRIMARY KEY
);

DROP TABLE IF EXISTS gstinverification;

CREATE TABLE gstinverification(
gstinverificationId INTEGER PRIMARY KEY
);



