CREATE DATABASE produtiva;

USE produtiva; 

CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    cep CHAR(10),
    logradouro VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    numero VARCHAR(100),
    complemento VARCHAR(100),
    qtdFuncionarios INT
);

CREATE TABLE tipoFuncionario (
    idTipoFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    funcao VARCHAR(45) NOT NULL
);
insert into tipoFuncionario (funcao) values (
'RH'
);
insert into tipoFuncionario (funcao) values (
'Gestor'
);

CREATE TABLE funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(90) NOT NULL,
    email VARCHAR(45) NOT NULL,
    telefone VARCHAR(45),
    senha VARCHAR(20) NOT NULL,
    fkEmpresa INT NOT NULL,
    fkTipoFuncionario INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkTipoFuncionario) REFERENCES tipoFuncionario(idTipoFuncionario)
);

CREATE TABLE calendario (
    idEvento INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    fkFuncionario INT NOT NULL,
    FOREIGN KEY (fkFuncionario) REFERENCES funcionario(idFuncionario)
);

CREATE TABLE participantes_evento (
    idParticipacao INT AUTO_INCREMENT PRIMARY KEY,
    fkEvento INT NOT NULL,
    fkFuncionario INT NOT NULL,
    status VARCHAR(20),
    FOREIGN KEY (fkEvento) REFERENCES calendario(idEvento),
    FOREIGN KEY (fkFuncionario) REFERENCES funcionario(idFuncionario)
);

CREATE TABLE dadosDashboard (
    idDados INT AUTO_INCREMENT PRIMARY KEY,
    anoNascimento YEAR NOT NULL,
    genero VARCHAR(255),
    setor VARCHAR(255),
    ocupacao VARCHAR(255),
    tamanhoFamilia VARCHAR(255),
    colaboracaoComColegasAnoAnterior VARCHAR(100),
    recomendacao VARCHAR(255),
    colaboracaoComColegas3meses VARCHAR(100),
    preferenciaTrabalhoRemoto VARCHAR(255),
    produtividade VARCHAR(100),
    piorAspectoTrabalhoRemoto VARCHAR(100),
    piorAspectoTrabalhoPresencial VARCHAR(150),
    tempoDedicadoTrabalhoPresencial INT,
    tempoDedicadoTarefasPresencial INT,
    tempoDedicadoTrabalhoRemoto INT,
    tempoDedicadoTarefasRemoto INT,
    maiorBarreiraTrabalhoRemoto VARCHAR(145),
    menorBarreiraTrabalhoRemoto VARCHAR(145)
);

CREATE TABLE leads (
    idEmail INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(256) NOT NULL,
    sobrenome VARCHAR(256),
    email VARCHAR(45) NOT NULL,
    telefone VARCHAR(45),
    mensagem VARCHAR(900)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date VARCHAR(10) NOT NULL,
    title VARCHAR(200) NOT NULL
);

select * from dadosDashboard;
truncate table dadosDashboard;
SELECT * FROM tipoFuncionario;

