CREATE DATABASE os_juntos;
USE os_manager;

CREATE TABLE solicitantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_guerra VARCHAR(100) NOT NULL,
    saram VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE setores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

INSERT INTO setores (nome) VALUES
('Informática'),('Infraestrutura'),('Sugestões'),
('Aquisição'),('Ocorrência'),('Administrativo'),('Outros');

CREATE TABLE ordens_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    setor_id INT,
    solicitante_id INT,
    arquivo VARCHAR(255),
    status ENUM('Aberta','Em Andamento','Concluída') DEFAULT 'Aberta',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (setor_id) REFERENCES setores(id),
    FOREIGN KEY (solicitante_id) REFERENCES solicitantes(id)
);
