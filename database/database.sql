create table users (
    id int not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    image varchar(255),
    createAt timestamp default current_timestamp,
    primary key(id)
) engine=InnoDB