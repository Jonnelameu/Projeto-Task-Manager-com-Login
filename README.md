Projeto full stack de gerenciamento de tarefas com autenticação de usuários.

Tecnologias utilizadas

Backend:
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)

Frontend:
- HTML
- CSS
- JavaScript

Infraestrutura:
- Docker
- Docker Compose

Versionamento:
- Git
- GitHub



Funcionalidades

 Registro de usuário  
 Login com autenticação JWT  
 Adicionar tarefas  
 Listar tarefas do usuário  
 Proteção de rotas com middleware de autenticação  
 Backend em API REST  
 Integração com MongoDB  
 Containerização com Docker



🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação.

Após o login, o token é enviado no header:
Authorization: Bearer TOKEN

Esse token é validado pelo middleware antes de acessar as rotas protegidas.


Estrutura do Projeto

backend
├── middleware
│ └── auth.js
├── models
│ └── Task.js
├── routes
│ ├── auth.js
│ └── tasks.js
└── server.js

frontend
├── index.html
├── script.js
└── style.css


 Como rodar o projeto

1️ Clonar o repositório

git clone https://github.com/Jonnelameu/Projeto-Task-Manager-com-Login.git

2️ Entrar na pasta

cd Projeto-Task-Manager-com-Login


3 Rodar com Docker

docker compose up --build


O servidor irá rodar em:

http://localhost:5000



Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar:

- criação de APIs REST
- autenticação com JWT
- integração com banco de dados MongoDB
- containerização com Docker
- versionamento com Git e GitHub
