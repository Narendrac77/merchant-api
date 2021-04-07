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
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
  panverification_id INTEGER
);

DROP TABLE IF EXISTS bankverification;

CREATE TABLE bankverification(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
bankverification_id INTEGER
);

DROP TABLE IF EXISTS gstinverification;

CREATE TABLE gstinverification(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
gstinverification_id INTEGER
);



