use project;
create table iprofile(emailid varchar(50) primary key,iname varchar(30), gender varchar(30),dob date,address varchar(30),city varchar(30),contact int,fields varchar(60),insta varchar(200),fb varchar(200),youtube varchar(200),picpath varchar(300));
select * from iprofile;
drop table iprofile;
create table iprofile(emailid varchar(50) primary key,iname varchar(30), gender varchar(30),dob date,address varchar(30),city varchar(30),contact int,fields varchar(60),insta varchar(200),fb varchar(200),youtube varchar(200),others varchar(300),picpath varchar(300));
select * from iprofile;