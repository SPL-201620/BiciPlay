# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table ubicacion (
  id                            integer not null,
  lat                           float,
  lng                           float,
  nombre                        varchar(255),
  constraint pk_ubicacion primary key (id)
);
create sequence ubicacion_seq;

create table usuario (
  id                            integer not null,
  name                          varchar(255),
  email                         varchar(255),
  password                      varchar(255),
  foto                          varchar(255),
  constraint pk_usuario primary key (id)
);
create sequence usuario_seq;


# --- !Downs

drop table if exists ubicacion cascade;
drop sequence if exists ubicacion_seq;

drop table if exists usuario cascade;
drop sequence if exists usuario_seq;

