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

CREATE TABLE 
    musica_favorita (
        id_usuario INT NOT NULL,
        id_musica int not null,
        data_favoritada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_usuario, id_musica),
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
        FOREIGN KEY (id_musica) REFERENCES musica(id_musica)
);

CREATE TABLE
    artista (
        id_artista int primary key auto_increment,
        nome_artistico varchar(150) null,
        nome_completo varchar(200) null,
        biografia text null,
        data_nascimento date null,
        data_falecimento date null,
        foto_url varchar(500) null
    );

CREATE TABLE
    musica_artista (
        id_musica int not null,
        id_artista int not null,
        tipo_participacao varchar(150) null,
        PRIMARY KEY (id_musica, id_artista),
        FOREIGN KEY (id_musica) REFERENCES musica (id_musica),
        FOREIGN KEY (id_artista) REFERENCES artista (id_artista)
    );

CREATE TABLE
    letra_trecho (
        id_trecho int primary key auto_increment,
        id_musica int not null,
        tempo_inicio time not null,
        tempo_fim time not null,
        ordem int not null,
        texto text not null
        foreign key (id_musica) references musica (id_musica),
    );

CREATE TABLE
    historico_musicas (
        id_historico bigint primary key auto_increment,
        id_usuario int not null,
        id_musica int not null,
        data_reproducao datetime not null default current_timestamp,
        progresso time null,
        foreign key (id_usuario) references usuario (id_usuario),
        foreign key (id_musica) references musica (id_musica)
    );