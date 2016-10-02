# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table chat (
  id                            integer not null,
  receptor                      integer,
  emisor                        integer,
  fecha_hora                    timestamp,
  mensaje                       varchar(255),
  constraint pk_chat primary key (id)
);
create sequence chat_seq;

create table ubicacion (
  id                            integer not null,
  lat                           double,
  lng                           double,
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

create table amigos (
  usuarioid                     integer not null,
  amigoid                       integer not null,
  constraint pk_amigos primary key (usuarioid,amigoid)
);

alter table amigos add constraint fk_amigos_usuario_1 foreign key (usuarioid) references usuario (id) on delete restrict on update restrict;
create index ix_amigos_usuario_1 on amigos (usuarioid);

alter table amigos add constraint fk_amigos_usuario_2 foreign key (amigoid) references usuario (id) on delete restrict on update restrict;
create index ix_amigos_usuario_2 on amigos (amigoid);


# --- !Downs

alter table amigos drop constraint if exists fk_amigos_usuario_1;
drop index if exists ix_amigos_usuario_1;

alter table amigos drop constraint if exists fk_amigos_usuario_2;
drop index if exists ix_amigos_usuario_2;

drop table if exists chat;
drop sequence if exists chat_seq;

drop table if exists ubicacion;
drop sequence if exists ubicacion_seq;

drop table if exists usuario;
drop sequence if exists usuario_seq;

drop table if exists amigos;

