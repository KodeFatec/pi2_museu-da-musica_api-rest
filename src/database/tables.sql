CREATE table
    genero_musical (
        id_genero int primary key auto_increment,
        nome varchar(80) unique not null,
        descricao text null
    );

CREATE table
    musica (
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