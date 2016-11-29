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

create table configurador (
  id                            integer not null,
  manubrio                      varchar(255),
  marco                         varchar(255),
  tenedor                       varchar(255),
  frenos                        varchar(255),
  cambios                       varchar(255),
  llantas                       varchar(255),
  otros                         varchar(255),
  constraint pk_configurador primary key (id)
);
create sequence Configurador_seq;

create table recorrido_grupal (
  id                            integer not null,
  usuario_creador               integer,
  name                          varchar(255),
  fecha_recorrido               varchar(255),
  frecuencia                    integer,
  unidad_frecuencia             varchar(255),
  inicio                        varchar(255),
  destino                       varchar(255),
  constraint pk_recorrido_grupal primary key (id)
);
create sequence recorrido_grupal_seq;

create table usuario_recorridos (
  idusuarios                    integer not null,
  idrecorrido                   integer not null,
  constraint pk_usuario_recorridos primary key (idusuarios,idrecorrido)
);

create table recorridoindividual (
  id                            integer not null,
  usuario_creador               integer,
  name                          varchar(255),
  fecha                         timestamp,
  duracion                      integer,
  distancia                     double precision,
  calorias                      float,
  clima                         varchar(255),
  icono_clima                   varchar(255),
  constraint pk_recorridoindividual primary key (id)
);
create sequence RecorridoIndividual_seq;

create table reporte (
  id                            integer not null,
  tipo                          varchar(255),
  cantidad                      double precision,
  periodo                       integer,
  usuario_id                    integer,
  constraint pk_reporte primary key (id)
);
create sequence reporte_seq;

create table reto (
  id                            integer not null,
  creador_id                    integer,
  retado_id                     integer,
  recorrido_id                  integer,
  recorrido_realizado_id        integer,
  constraint pk_reto primary key (id)
);
create sequence reto_seq;

create table ubicacion (
  id                            integer not null,
  lat                           float,
  lng                           float,
  nombre                        varchar(255),
  recorrido_grupal_id           integer,
  recorrido_individual_id       integer,
  constraint pk_ubicacion primary key (id)
);
create sequence ubicacion_seq;

create table usuario (
  id                            integer not null,
  name                          varchar(255),
  email                         varchar(255),
  password                      varchar(255),
  foto                          varchar(255),
  type                          varchar(255),
  constraint pk_usuario primary key (id)
);
create sequence usuario_seq;

create table amigos (
  usuarioid                     integer not null,
  amigoid                       integer not null,
  constraint pk_amigos primary key (usuarioid,amigoid)
);

alter table usuario_recorridos add constraint fk_usuario_recorridos_recorrido_grupal foreign key (idusuarios) references recorrido_grupal (id) on delete restrict on update restrict;
create index ix_usuario_recorridos_recorrido_grupal on usuario_recorridos (idusuarios);

alter table usuario_recorridos add constraint fk_usuario_recorridos_usuario foreign key (idrecorrido) references usuario (id) on delete restrict on update restrict;
create index ix_usuario_recorridos_usuario on usuario_recorridos (idrecorrido);

alter table reporte add constraint fk_reporte_usuario_id foreign key (usuario_id) references usuario (id) on delete restrict on update restrict;
create index ix_reporte_usuario_id on reporte (usuario_id);

alter table reto add constraint fk_reto_creador_id foreign key (creador_id) references usuario (id) on delete restrict on update restrict;
create index ix_reto_creador_id on reto (creador_id);

alter table reto add constraint fk_reto_retado_id foreign key (retado_id) references usuario (id) on delete restrict on update restrict;
create index ix_reto_retado_id on reto (retado_id);

alter table reto add constraint fk_reto_recorrido_id foreign key (recorrido_id) references recorridoindividual (id) on delete restrict on update restrict;
create index ix_reto_recorrido_id on reto (recorrido_id);

alter table reto add constraint fk_reto_recorrido_realizado_id foreign key (recorrido_realizado_id) references recorridoindividual (id) on delete restrict on update restrict;
create index ix_reto_recorrido_realizado_id on reto (recorrido_realizado_id);

alter table ubicacion add constraint fk_ubicacion_recorrido_grupal_id foreign key (recorrido_grupal_id) references recorrido_grupal (id) on delete restrict on update restrict;
create index ix_ubicacion_recorrido_grupal_id on ubicacion (recorrido_grupal_id);

alter table ubicacion add constraint fk_ubicacion_recorrido_individual_id foreign key (recorrido_individual_id) references recorridoindividual (id) on delete restrict on update restrict;
create index ix_ubicacion_recorrido_individual_id on ubicacion (recorrido_individual_id);

alter table amigos add constraint fk_amigos_usuario_1 foreign key (usuarioid) references usuario (id) on delete restrict on update restrict;
create index ix_amigos_usuario_1 on amigos (usuarioid);

alter table amigos add constraint fk_amigos_usuario_2 foreign key (amigoid) references usuario (id) on delete restrict on update restrict;
create index ix_amigos_usuario_2 on amigos (amigoid);


# --- !Downs

alter table if exists usuario_recorridos drop constraint if exists fk_usuario_recorridos_recorrido_grupal;
drop index if exists ix_usuario_recorridos_recorrido_grupal;

alter table if exists usuario_recorridos drop constraint if exists fk_usuario_recorridos_usuario;
drop index if exists ix_usuario_recorridos_usuario;

alter table if exists reporte drop constraint if exists fk_reporte_usuario_id;
drop index if exists ix_reporte_usuario_id;

alter table if exists reto drop constraint if exists fk_reto_creador_id;
drop index if exists ix_reto_creador_id;

alter table if exists reto drop constraint if exists fk_reto_retado_id;
drop index if exists ix_reto_retado_id;

alter table if exists reto drop constraint if exists fk_reto_recorrido_id;
drop index if exists ix_reto_recorrido_id;

alter table if exists reto drop constraint if exists fk_reto_recorrido_realizado_id;
drop index if exists ix_reto_recorrido_realizado_id;

alter table if exists ubicacion drop constraint if exists fk_ubicacion_recorrido_grupal_id;
drop index if exists ix_ubicacion_recorrido_grupal_id;

alter table if exists ubicacion drop constraint if exists fk_ubicacion_recorrido_individual_id;
drop index if exists ix_ubicacion_recorrido_individual_id;

alter table if exists amigos drop constraint if exists fk_amigos_usuario_1;
drop index if exists ix_amigos_usuario_1;

alter table if exists amigos drop constraint if exists fk_amigos_usuario_2;
drop index if exists ix_amigos_usuario_2;

drop table if exists chat cascade;
drop sequence if exists chat_seq;

drop table if exists configurador cascade;
drop sequence if exists Configurador_seq;

drop table if exists recorrido_grupal cascade;
drop sequence if exists recorrido_grupal_seq;

drop table if exists usuario_recorridos cascade;

drop table if exists recorridoindividual cascade;
drop sequence if exists RecorridoIndividual_seq;

drop table if exists reporte cascade;
drop sequence if exists reporte_seq;

drop table if exists reto cascade;
drop sequence if exists reto_seq;

drop table if exists ubicacion cascade;
drop sequence if exists ubicacion_seq;

drop table if exists usuario cascade;
drop sequence if exists usuario_seq;

drop table if exists amigos cascade;
