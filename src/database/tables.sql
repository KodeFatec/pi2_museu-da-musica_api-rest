CREATE table
    genero_musical (
        id_genero int primary key auto_increment,
        nome varchar(80) unique not null,
        descricao text null
    );

CREATE table
    musica (
        id_musica int primary key auto_increment,
        id_genero int null,
        titulo varchar(150) NOT NULL,
        isrc char(12) unique null,
        duracao time NOT NULL, -- está no banco de dados como opcional, mas precisa ter uma duração para poder tocar a música
        ano_gravacao smallint null,
        descricao TEXT null,
        arquivo_audio varchar(500) NULL,
        spotify_uri varchar(255) unique NULL,
        youtube_video_id varchar(100) unique null,
        foreign key (id_genero) references genero_musical (id_genero)
    );

CREATE table
    categoria (
        id_categoria int primary key auto_increment,
        nome varchar(100) unique not null,
        descricao text null
    );

CREATE table
    item_acervo (
        id_item int primary key auto_increment,
        id_categoria int not null,
        titulo varchar(200) not null,
        descricao text null,
        origem varchar(200) null,
        data_aquisicao date null,
        estado_conservacao varchar(50) null,
        data_cadastro timestamp default current_timestamp,
        id_usuario_cadastro int not null,
        foreign key (id_categoria) references categoria (id_categoria),
        foreign key (id_usuario_cadastro) references usuario (id_usuario)
    );

CREATE table
    partitura (
        id_item int primary key,
        id_musica int null,
        autor varchar(150) null,
        ano_criacao smallint null,
        arquivo_url varchar(500) null,
        foreign key (id_item) references item_acervo (id_item),
        foreign key (id_musica) references musica (id_musica)
    );