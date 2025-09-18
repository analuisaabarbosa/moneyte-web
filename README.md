# moneyte-web 💸

![Status do Projeto](https://img.shields.io/badge/status-concluído-green)
![Licença](https://img.shields.io/badge/license-MIT-blue)

Interface de usuário para o **moneyte**, um SaaS de gestão financeira pessoal. Construído com React, Vite e Tailwind CSS, focado em uma experiência de usuário moderna, reativa e totalmente responsiva.

---

### Índice

* [Descrição do Projeto](#descrição-do-projeto)
* [Funcionalidades](#funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Como Executar o Projeto](#como-executar-o-projeto)
* [Autor](#autor)
  
---

### Descrição do Projeto

Este repositório contém o front-end da aplicação **moneyte**. O objetivo foi construir uma interface de usuário moderna, consumindo os dados da `moneyte-api`. A arquitetura foi desenvolvida com foco em componentes reutilizáveis, gerenciamento de estado global e um fluxo de autenticação seguro para proteger os dados do usuário.

---

### Funcionalidades

- **Fluxo de Autenticação Completo:** Páginas de Cadastro e Login com validação de formulário e feedback ao usuário.
- **Gerenciamento de Sessão:** A sessão do usuário é persistida no `localStorage`, permitindo que ele permaneça logado mesmo após fechar o navegador.
- **Rotas Protegidas:** Apenas usuários autenticados podem acessar o Dashboard e outras páginas de dados.
- **Dashboard Interativo:** Exibe um resumo financeiro (receitas, despesas, saldo) e uma lista das transações mais recentes, tudo atualizado em tempo real.
- **CRUD de Transações:** Interface com modais para criar, editar e deletar transações, com confirmações para ações destrutivas.
- **UI Responsiva:** O design se adapta a qualquer tamanho de tela, do desktop ao celular, utilizando a filosofia "mobile-first".
- **Notificações:** Feedback visual para o usuário através de notificações "toast" para ações bem-sucedidas ou com erro.

---

### Tecnologias Utilizadas

- **Front-end:**
  - `React.js`
  - `Vite` (Build Tool)
  - `React Router DOM` (Roteamento)
- **Estilização:**
  - `Tailwind CSS`
- **Comunicação com API:**
  - `axios`
- **Estado e Notificações:**
  - `React Context API`
  - `react-toastify`

---

### Como Executar o Projeto

#### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js (v18+)](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- **É necessário que a `moneyte-api` (back-end) esteja rodando localmente.**

#### Passo a Passo

1.  **Clone os repositórios:**
    ```bash
    git clone https://github.com/analuisaabarbosa/moneyte-web.git
    git clone https://github.com/analuisaabarbosa/moneyte-api.git
    ```
2.  **Navegue até o diretório:**
    ```bash
    cd moneyte-web & cd moneyte-api
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).
    A API estará disponível em `http://localhost:3001` (ou na porta indicada).

---

### Autor

Feito por **Ana Luisa**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/analuisaabarbosa/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:analuisaaugustob@gmail.com)
