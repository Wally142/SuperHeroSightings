drop database if exists superhero;

Create database superhero;

use superhero;


create table hero (
id int primary key auto_increment,
name varchar (100) not null,
description varchar(1000),
city varchar (100),
image varchar(1000),
villain boolean
);

create table powers (
id int primary key auto_increment,
name varchar (100)
);

create table hero_power (
hero_id int,
power_id int
);

alter table hero_power
add constraint fk_heroID_hero
foreign key (hero_id) references hero(id);

alter table hero_power
add constraint fk_powerID_power
foreign key (power_id) references powers(id);

create table organization (
id int primary key auto_increment,
name varchar (100) not null,
description varchar(1000),
location varchar(300),
location_id int
);

create table hero_organization (
hero_id int,
organization_id int
);

alter table hero_organization
add constraint fk_heroOrgID_hero
foreign key (hero_id) references hero(id);

alter table hero_organization
add constraint fk_organizationID_organization
foreign key (organization_id) references organization(id);

create table location (
id int primary key auto_increment,
latitude decimal (10, 6),
longitude decimal (10,6),
city varchar(100),
country varchar(100)
);

alter table organization
add constraint fk_locationID_location
foreign key (location_id) references location(id);

create table sighting (
id int primary key auto_increment,
locationId int,
sighted datetime
);

alter table sighting
add constraint fk_locationSightID_location
foreign key (locationId) references location(id);

create table hero_sighting (
hero_id int,
sighting_id int
);

alter table hero_sighting
add constraint fk_heroSightID_hero
foreign key (hero_id) references hero(id);

alter table hero_sighting
add constraint fk_sightingID_sighting
foreign key (sighting_id) references sighting(id);



