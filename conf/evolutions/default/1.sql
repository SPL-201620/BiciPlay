# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table usuario (
  id                            integer not null,
  name                          varchar(255),
  login                         varchar(255),
  password                      varchar(255),
  constraint pk_usuario primary key (id)
);
create sequence users_id_seq increment by 1;


# --- !Downs

drop table if exists usuario cascade;
drop sequence if exists users_id_seq;

