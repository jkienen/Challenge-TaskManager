/ --------------------------------------------------------------------------------------------------------------------- /

- Projeto: desafio-dev-fullstack
- Data de criação: 04/01/2026

---

## ⚙️ Raciocínio Técnico (Resumo)

- `**Next.js**` utilizado em Frontend, permite fácil integração com o backend e possibilita renderizar páginas no servidor antes de enviar para o usuário (SSR/SSG), garantindo melhor performance e SEO. React puro não faz isso nativamente, sendo apenas client-side.  
- `**SQLite**` utilizado para armazenar dados, suficiente para o challenge, evitando complexidade.  
- `**Docker Compose**` utilizado para deploy dos ambientes, configurado para garantir isolamento entre Backend e Frontend.  
- `**Testes automatizados**` utilizado para testes antes de integrar com frontend, com pytest/TestClient asseguram funcionamento correto dos endpoints.  

---

## ⚙️ Estrutura dos Endpoints Backend

**`/Datas`**      -> Contém a base de dados SQLite.  
**`/Endpoints`**  -> Contém as rotas da API: GET /tasks, POST /tasks, PUT /tasks/{id}, DELETE /tasks/{id}  
**`/Models`**     -> Define os modelos de dados usados no corpo das requisições e nos retornos, e contém os campos da base de dados utilizados.  
**`/Services`**   -> Contém a lógica das tarefas que será utilizada pelas rotas dos endpoints.  
**`/tests`**      -> Contém os testes automatizados do backend.  
**`config.py`**   -> Configurações gerais do backend.  
**`main.py`**     -> Valida se o banco existe e sobe o backend.  

---

## ⚙️ Estrutura dos arquivos Docker

Abaixo estão os principais arquivos que compõem o ambiente Docker do Backend e Frontend:

- 📄 **`docker-compose.yml`**  
  Arquivo principal que define:
  - Os serviços do Backend (FastAPI) e Frontend (Next.js)
  - As imagens Docker utilizadas para cada serviço
  - As variáveis de ambiente de cada container
  - As portas expostas para acesso externo
  - A rede interna para comunicação entre os serviços

- 🐳 **`Dockerfile`**  
  Arquivos responsáveis por definir a imagem de cada aplicação:
  
  Backend:
    - Utiliza uma imagem base do Python
    - Instalação automática das dependências via requirements.txt
    - Execução do servidor FastAPI via Uvicorn
  
  Frontend:
    - Utiliza uma imagem base do Node.js
    - Instalação das dependências via package.json
    - Build e execução da aplicação Next.js

> Esses arquivos devem ser mantidos versionados e documentados para garantir reprodutibilidade e segurança do ambiente.

---

## ⚙️ Comandos com Docker Compose

**`Instruções de execução (Produção)`**

- `docker compose up --build -d`  
  Inicia o container com base no Dockerfile em (background).

- `docker compose restart`  
  Reinicia o container sem apagar os dados.

- `docker compose stop`  
  Para o container sem apagar os dados.

- `docker compose down`  
  Remove o container.

**`Instruções de execução (Testes do Backend)`**

- `docker compose run --rm backend pytest -v`
  Sobe um container isolado para testes automatizados e remove o container ao término.

**`Instruções de execução (Investigação e Debug)`**

- `docker compose ps`
   Validar containers ativos.

- `docker compose logs -f backend`
  Validar logs do Backend.

- `docker compose logs -f frontend`
  Valida logs do Frontend.

/ --------------------------------------------------------------------------------------------------------------------- /
