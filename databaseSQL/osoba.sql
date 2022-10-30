

DROP TABLE IF EXISTS osoba;
CREATE TABLE osoba (
  id int NOT NULL AUTO_INCREMENT,
  ime varchar(45) DEFAULT NULL,
  prezime varchar(45) DEFAULT NULL,
  adresa varchar(255) DEFAULT NULL,
  grad varchar(45) DEFAULT NULL,
  datumRodenja date DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  PRIMARY KEY (id));
  


DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
) ;


INSERT INTO roles VALUES (1,'ROLE_USER'),(2,'ROLE_MODERATOR'),(3,'ROLE_ADMIN');


DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
  user_id int NOT NULL,
  role_id int NOT NULL,
  PRIMARY KEY (user_id,role_id)
) ;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(50) DEFAULT NULL,
  password varchar(120) DEFAULT NULL,
  username varchar(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

