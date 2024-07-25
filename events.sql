use project;
create table eventss (emailid varchar(50), events varchar(50),doe date, tos time,city varchar(30),venue varchar(30));
select * from eventss;
drop table eventss;
create table eventss (rid int primary key auto_increment,emailid varchar(50), events varchar(50),doe date, tos time,city varchar(30),venue varchar(30));
select * from eventss;
