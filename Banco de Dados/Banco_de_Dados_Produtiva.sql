-- DROP DATABASE Produtiva;
-- Criação da banco de dados
CREATE DATABASE Produtiva;
USE Produtiva;

-- Criação das Tabelas
CREATE TABLE empresa (
idEmpresa int primary key,
razaoSocial varchar(45),
cnpj varchar(45),
email varchar(45),
senha varchar(45)
);

CREATE TABLE leads (
idLeads int primary key,
nome varchar(45),
email varchar(45),
telefone varchar(45),
comentario varchar(365)
);

CREATE TABLE endereco (
idEndereco int primary key,
estado char(2),
cidade varchar(45),
cep char(10),
numero varchar(45),
fkEnderecoEmpresa int,

constraint fkEmpresaEndereco foreign key (fkEnderecoEmpresa) references empresa(idEmpresa)
);

CREATE TABLE funcionario (
idFuncionario int primary key auto_increment,
nome varchar(45),
email varchar(45),
telefone varchar(45),
senha varchar(45),
nomeEmpresa varchar(45),
cargo varchar(45)
);

CREATE TABLE dashboard (
idDashboard int primary key,
genero varchar(45),
totalColaborador varchar(100),
satisfacaoPositiva varchar(100),
satisfacaoNegativa varchar(100),
reputacaoEmpresa varchar(100),
ocupacao varchar(100),
produtividade varchar(100),
aspectoNegativo varchar(100),
presencialTrabalhando int,
presencialPessoal int,
remotoTrabalhando int,
remotoPessoal int
);

CREATE TABLE cargo (
idCargo int primary key,
cargo varchar(45),
fkFuncionario int,
fkDashboard int,

constraint fkCargoFuncionario foreign key (fkFuncionario) references funcionario(idFuncionario),
constraint fkCargoDashboard foreign key (fkDashboard) references dashboard(idDashboard)
);

CREATE TABLE alerta_log (
idAlerta int primary key,
tipo varchar(45),
descricao varchar(255),
severidade varchar(45),
dataHora timestamp default current_timestamp,
fkFuncionario int,
fkDashboard int,
constraint fkFuncionarioAlerta foreign key (fkFuncionario) references funcionario (idFuncionario),
constraint fkDashboardAlerta foreign key (fkDashboard) references dashboard (idDashboard)
);


CREATE TABLE DadosTrabalhoRemoto (
    id INT PRIMARY KEY auto_increment,
    ano_nascimento VARCHAR(10),
    genero VARCHAR(50),
    setor VARCHAR(100),
    ocupacao VARCHAR(100),
    qtd_empregados VARCHAR(50),
    facilidade_permissao VARCHAR(50),
    horas_trabalhadas VARCHAR(50),
    horas_pessoais VARCHAR(50),
    produtividade VARCHAR(50),
    comentario_produtividade TEXT,
    conectividade VARCHAR(150),
    gerenciamento_compromissos VARCHAR(150),
    oportunidades_socializacao VARCHAR(150),
    numero_interacoes VARCHAR(150),
    numero_projetos VARCHAR(150),
    numero_horas VARCHAR(150),
    numero_anos_experiencia VARCHAR(150)
);

-- Criação dos selects


