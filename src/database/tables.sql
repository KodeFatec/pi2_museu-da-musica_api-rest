USE museu_musica;

CREATE TABLE IF NOT EXISTS museu (
    id_museu INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NULL,
    endereco VARCHAR(255) NULL,
    telefone VARCHAR(20) NULL,
    email VARCHAR(150) UNIQUE NULL
);

CREATE TABLE IF NOT EXISTS sala(
    id_sala INT PRIMARY KEY AUTO_INCREMENT,
    id_museu INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NULL,
    capacidade INT NULL,
    CONSTRAINT chk_sala_capacidade CHECK (
        capacidade IS NULL
        OR capacidade >= 0
    ),
    CONSTRAINT fk_sala_museu FOREIGN KEY (id_museu) REFERENCES museu (id_museu) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario UUID NOT NULL default (UUID()),
    nome VARCHAR(150) NOT NULL,
    cpf CHAR(11) NULL,
    email VARCHAR(150) NOT NULL,
    senha_hash VARCHAR(255) NULL,
    telefone VARCHAR(20) NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key(id),
    constraint uk_usuarios_email unique (email),
    constraint uk_usuarios_cpf unique (cpf)
);

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT NULL
);

CREATE TABLE IF NOT EXISTS colecao (
    id_colecao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NULL
);

CREATE TABLE IF NOT EXISTS colecao_item (
    id_colecao INT NOT NULL,
    id_item INT NOT NULL,
    PRIMARY KEY (id_colecao, id_item),
    CONSTRAINT fk_colecao_item_colecao FOREIGN KEY (id_colecao) REFERENCES colecao (id_colecao) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_colecao_item_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS item_acervo (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NULL,
    origem VARCHAR(200) NULL,
    data_aquisicao DATE NULL,
    estado_conservacao VARCHAR(50) NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario_cadastro INT NULL,
    CONSTRAINT fk_item_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_item_usuario_cadastro FOREIGN KEY (id_usuario_cadastro) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS colecao_item (
    id_colecao INT NOT NULL,
    id_item INT NOT NULL,
    PRIMARY KEY (id_colecao, id_item),
    CONSTRAINT fk_colecao_item_colecao FOREIGN KEY (id_colecao) REFERENCES colecao (id_colecao) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_colecao_item_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS midia (
    id_midia INT PRIMARY KEY AUTO_INCREMENT,
    id_item INT NOT NULL,
    tipo_midia VARCHAR(30) NOT NULL,
    arquivo_url VARCHAR(500) NOT NULL,
    descricao VARCHAR(255) NULL,
    CONSTRAINT fk_midia_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS instrumento (
    id_item INT PRIMARY KEY,
    tipo_instrumento VARCHAR(100) NULL,
    fabricante VARCHAR(150) NULL,
    ano_fabricacao SMALLINT NULL,
    antigo_dono VARCHAR(150) NULL,
    CONSTRAINT fk_instrumento_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS item_localizacao (
    id_localizacao INT PRIMARY KEY AUTO_INCREMENT,
    id_item INT NOT NULL,
    id_sala INT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NULL,
    CONSTRAINT chk_localizacao_datas CHECK (
        data_fim IS NULL
        OR data_fim >= data_inicio
    ),
    CONSTRAINT fk_localizacao_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_localizacao_sala FOREIGN KEY (id_sala) REFERENCES sala (id_sala) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS genero_musical (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) UNIQUE NOT NULL,
    descricao TEXT NULL
);

CREATE TABLE IF NOT EXISTS musica (
    id_musica INT PRIMARY KEY AUTO_INCREMENT,
    id_genero INT NULL,
    titulo VARCHAR(150) NOT NULL,
    isrc CHAR(12) UNIQUE NULL,
    duracao TIME NOT NULL,
    ano_gravacao SMALLINT NULL,
    descricao TEXT NULL,
    arquivo_audio VARCHAR(500) NULL,
    spotify_uri VARCHAR(255) UNIQUE NULL,
    youtube_video_id VARCHAR(100) UNIQUE NULL,
    CONSTRAINT fk_musica_genero FOREIGN KEY (id_genero) REFERENCES genero_musical (id_genero) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS partitura (
    id_item INT PRIMARY KEY,
    id_musica INT NULL,
    autor VARCHAR(150) NULL,
    ano_criacao SMALLINT NULL,
    arquivo_url VARCHAR(500) NULL,
    CONSTRAINT fk_partitura_item FOREIGN KEY (id_item) REFERENCES item_acervo (id_item) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_partitura_musica FOREIGN KEY (id_musica) REFERENCES musica (id_musica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS artista (
    id_artista INT PRIMARY KEY AUTO_INCREMENT,
    nome_artistico VARCHAR(150) NULL,
    nome_completo VARCHAR(200) NULL,
    biografia TEXT NULL,
    data_nascimento DATE NULL,
    data_falecimento DATE NULL,
    foto_url VARCHAR(500) NULL
);

CREATE TABLE IF NOT EXISTS musica_artista (
    id_musica INT NOT NULL,
    id_artista INT NOT NULL,
    tipo_participacao VARCHAR(50) NULL,
    PRIMARY KEY (id_musica, id_artista),
    CONSTRAINT fk_musica_artista_musica FOREIGN KEY (id_musica) REFERENCES musica (id_musica) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_musica_artista_artista FOREIGN KEY (id_artista) REFERENCES artista (id_artista) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS letra_trecho (
    id_trecho INT PRIMARY KEY AUTO_INCREMENT,
    id_musica INT NOT NULL,
    tempo_inicio TIME NOT NULL,
    tempo_fim TIME NOT NULL,
    ordem INT NOT NULL,
    texto TEXT NOT NULL,
    CONSTRAINT chk_letra_tempos CHECK (tempo_fim >= tempo_inicio),
    CONSTRAINT fk_letra_musica FOREIGN KEY (id_musica) REFERENCES musica (id_musica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS musica_favorita (
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,
    data_favoritada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_musica),
    CONSTRAINT fk_favorita_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_favorita_musica FOREIGN KEY (id_musica) REFERENCES musica (id_musica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_musica (
    id_historico BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,
    data_reproducao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    progresso TIME NULL,
    CONSTRAINT fk_historico_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_historico_musica FOREIGN KEY (id_musica) REFERENCES musica (id_musica) ON DELETE CASCADE ON UPDATE CASCADE
);