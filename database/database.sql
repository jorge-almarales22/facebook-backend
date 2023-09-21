create table users (
    id int not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    image varchar(255),
    createAt timestamp default current_timestamp,
    primary key(id)
) engine=InnoDB

create table posts (
    id int not null auto_increment,
    user_id int not null,
    content varchar(255) not null,
    image varchar(255),
    createAt timestamp default current_timestamp,
    primary key(id),
    index(user_id),
    foreign key(user_id) references users(id)
) engine=InnoDB

create table comments (
    id int not null auto_increment,
    post_id int not null,
    user_id int not null,
    comment varchar(255) not null,
    createAt timestamp default current_timestamp,
    primary key(id),
    index(post_id),
    foreign key(post_id) references posts(id)
) engine=InnoDB


create table likes(
    id int not null auto_increment,
    post_id int not null,
    user_id int not null,
    createAt timestamp default current_timestamp,
    primary key(id),
    index(post_id),
    foreign key(post_id) references posts(id)
) engine=InnoDB

create table friends(
    id int not null auto_increment,
    user_id int not null,
    friend_id int not null,
    createAt timestamp default current_timestamp,
    primary key(id),
    index(user_id),
    foreign key(user_id) references users(id)
) engine=InnoDB