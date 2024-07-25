create database project;
use project;
create table users(email varchar(50) primary key,pwd varchar(30), utype varchar(30),status int DEFAULT 1);
select * from users;