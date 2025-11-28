1.1 Nome do Projeto
Clothes 90's

1.2 Equipe
Nome João Eduardo Santos Sens 
Matrícula 202502265441

2. VISÃO DO PRODUTO
2.1 Descrição Comercial
Você é um amante dos anos 90? Quer uma loja totalmente o que lhe convém? Então conheça Clothes 90's, uma loja onde o intuito é trazer apenas produtos de moda anos 90.

2.2 Público-Alvo
Amantes do estilo e moda 90's.

2.3 Propósito e Valor do Produto
Nossos produtos oferecem uma ampla disponibilidade de roupas modelo 90's poderá encontrar tudo em uma única loja que é AQUI!

2.4 Benchmarking/Referências
Cansado de vasculhar roupas que se encaixam ao estilo 90's? Relaxa e conta com a gente, pois trazemos isso para ti com o maior carinho e pertencimento ao cliente.

3. ESPECIFICAÇÃO TÉCNICA PRELIMINAR
3.1 Descrição Técnica
O sistema será construído por:

Setores de roupas masculinas e femininas. Dentre esses setores estarão categorias como Chapéus, Camisetas, Blusas, Calças e Acessórios.

Estrutura geral do sistema: Páginas de Setores Roupas Masculinas e Femininas. Páginas de categorias como Chapéus, Camisetas, Blusas, Calças e Acessórios.

Fluxo básico de dados: como os dados entram no sistema (ex .: formulários), como são processados (ex .: scripts do servidor em Node.js/Express), e como são exibidos de volta ao usuário (ex .: páginas dinâmicas, respostas JSON consumidas pelo frontend).

Interações esperadas: o que acontece quando o usuário realiza ações (ex .: clicar em um botão, enviar um formulário) — por exemplo: adicionar produto ao carrinho (front), enviar pedido (front → POST /api/checkout), cadastro/login (front → POST /api/register e /api/login).

Recursos planejados: autenticação, sessões (ou token), integração com banco de dados, uploads de imagens (para catálogo), carrinho de compras, validação client-side e server-side.

3.2 Tecnologias Utilizadas
HTML5: marcação semântica para páginas, formulários e estrutura do site. CSS: layout responsivo; uso de CSS puro e utilitários leves; possibilidade de usar Bootstrap para componentes rápidos. JavaScript (frontend): interatividade, validações, manipulação do DOM e chamadas assíncronas (fetch) para a API. Node.js + Express (backend): rotas, controllers, models e conexão com banco de dados; API REST simples para cadastro, login, listagem de produtos e checkout. Banco: SQLite para desenvolvimento local (arquivo database/app.db); possibilidade de migrar para PostgreSQL em produção. Outros: bcrypt para hash de senhas, CORS configurado, uso de dotenv para variáveis de ambiente.

3.3 Aplicação do Padrão MVC
Models: arquivos em server/models/ (ex.: userModel.js) que representam entidades e encapsulam acesso ao banco.

Views: front-end estático (HTML/CSS/JS) servindo as páginas; o backend fornece endpoints JSON consumidos pelo frontend.

Controllers: em server/controllers/ (ex.: mainControllers.js) contendo a lógica de negócio e chamando os models.

Routes: em server/routes/ (ex.: mainRoutes.js) mapeando endpoints para controllers. Organização: server/ contém routes/, controllers/, models/, database/ e app.js como ponto de entrada.

3.4 Banco de Dados
Tipo: SQLite (desenvolvimento) com opção de migrar para PostgreSQL em produção.

Tabelas principais (exemplo):

users: id, username, email, password_hash, created_at

products: id, title, description, price, image_path, category, stock

orders: id, user_id, total, created_at

order_items: id, order_id, product_id, qty, price Essas tabelas cobrem cadastro, catálogo e fluxo de checkout.

3.5 Arquitetura e Estrutura
Estrutura de pastas planejada (conforme já implementado no projeto):

Code
/projeto
  /server
    /controllers
    /models
    /routes
    /database
    app.js
    package.json
    .env
  /public (ou raiz do frontend)
    index.html (home.html renomeado)
    signup.html
    signin.html
    cart.html
    style.css
    script.js
    /images
3.6 Wireframes ou Mockups Iniciais
Wireframes simples das telas principais: login, cadastro, listagem de produtos, detalhe do produto, carrinho e checkout (anexos ou imagens podem ser adicionados se houver).

4. FUNCIONALIDADES
4.1 Funcionalidades do MVP (Produto Mínimo Viável)
Página inicial com banners e destaques.

Listagem de produtos por categoria (90's style).

Visualização de produto (título, preço, imagem).

Carrinho de compras (adicionar, remover, alterar quantidade).

Cadastro de usuário (signup) com validação básica.

Login de usuário (signin) com verificação de credenciais.

Checkout simples que registra pedido no banco (sem gateway de pagamento integrado no MVP).

Endpoints API REST básicos: /api/register, /api/login, /api/products, /api/checkout.

4.2 Justificativa do MVP
Essas funcionalidades cobrem o fluxo essencial de uma loja online: descoberta de produtos, autenticação do usuário, seleção de itens e finalização de compra. Permitem demonstrar a integração frontend ↔ backend e persistência de dados.

4.3 Funcionalidades Futuras (Pós-MVP)
Integração com gateway de pagamento (PagSeguro, Stripe, etc.).

Painel administrativo para gerenciar produtos e pedidos.

Filtros avançados e busca por tags.

Sistema de avaliações e comentários.

Recuperação de senha por e-mail.

Implementação de sessões seguras ou JWT com refresh tokens.

4.4 Fluxo de Navegação Principal
Usuário acessa index → vê produtos em destaque.

Navega por categorias → clica em produto → abre página de detalhe.

Adiciona produto ao carrinho → abre cart.html.

Se não estiver logado, pode cadastrar-se ou logar.

Finaliza compra → POST /api/checkout → pedido salvo no banco → confirmação exibida.

5. REQUISITOS E RECURSOS
5.1 Requisitos de Sistema
Backend: Node.js (versão LTS recomendada, ex.: 18.x ou 20.x), npm.

Banco: SQLite para desenvolvimento; PostgreSQL/MySQL recomendado para produção.

Servidor web (frontend): qualquer host de arquivos estáticos (ex.: InfinityFree).

Navegadores suportados: Chrome, Firefox, Edge, Safari (versões recentes).

5.2 Recursos Externos
Bibliotecas JS: Express, bcrypt, sqlite3 (ou pg para Postgres), dotenv, cors.

CDN para Bootstrap (opcional) e ícones.

Imagens do catálogo (armazenadas em /images).

5.3 Requisitos de Hospedagem
Frontend: hospedagem de arquivos estáticos (InfinityFree) — arquivos em htdocs.

Backend: serviço que suporte Node.js (ex.: Railway, Render, Fly.io, VPS).

Banco em produção: preferencialmente um serviço gerenciado (Postgres) para persistência confiável.

6. ORGANIZAÇÃO DA EQUIPE E METODOLOGIA DE TRABALHO
6.1 Papéis e Responsabilidades
João Eduardo Santos Sens — Desenvolvimento full‑stack: implementação do frontend (HTML/CSS/JS), backend (Node.js/Express), integração e deploy. (Se houver outros membros, preencher aqui; mantive apenas o que está claro no trabalho.)

6.2 Metodologia de Trabalho
Frequência de Reuniões: 2x por semana (sugestão: segundas e quartas).

Ferramentas de Comunicação: WhatsApp / Discord (a definir pela equipe).

Controle de Versão: Git / GitHub — repositório para frontend e backend; deploy via integração com Railway (backend) e upload FTP (frontend).

Método de Desenvolvimento: desenvolvimento incremental por funcionalidades (MVP → melhorias).

Revisão de Código: pull requests no GitHub e revisão entre membros antes do merge.

7. PLANEJAMENTO
7.1 Cronograma Preliminar
(Mantenho a estrutura do cronograma; preencha datas específicas conforme o calendário da disciplina. Abaixo, entregas e marcos sem datas fixas.)

Marco 1 — Setup e Definição Entregas esperadas: ambiente de desenvolvimento configurado; estrutura de pastas MVC criada; repositório Git inicializado.

Marco 2 — Protótipo Visual Entregas esperadas: protótipo navegável em HTML/CSS/JS; estrutura de navegação definida; wireframes validados.

Marco 3 — Plano de testes Entregas esperadas: planilha para registro de problemas; casos de teste básicos definidos.

Marco 4 — Back-end Entregas esperadas: conexão com banco de dados operacional; CRUD de pelo menos uma entidade (users ou products).

Marco 5 — Integração Front-end/Back-end Entregas esperadas: JavaScript integrado ao backend; autenticação básica; fluxo de checkout funcionando.

Marco 6 — Finalizado Entregas esperadas: documentação técnica; manual do usuário; deploy realizado.

(As datas e responsáveis podem ser preenchidos por você conforme o cronograma da disciplina.)

7.2 Distribuição Inicial de Tarefas por Sprint/Fase
(Deixe em branco ou preencha conforme a divisão da equipe; mantive a seção para você completar com nomes e datas.)

8. CRITÉRIOS DE SUCESSO E RISCOS
8.1 Critérios de Sucesso do MVP
Cadastro e login funcionando com persistência no banco.

Listagem de produtos e adição ao carrinho funcionando.

Checkout registrando pedidos no banco.

Interface responsiva e navegável em dispositivos móveis.

8.2 Casos de Uso Principais
Usuário visita site, navega por produtos e adiciona ao carrinho.

Usuário realiza cadastro e login.

Usuário finaliza compra e recebe confirmação.

8.3 Casos de Teste
Testes manuais de cadastro, login, navegação, responsividade e fluxo de checkout; registro dos resultados em planilha.

8.4 Registro de Comunicação e Versionamento
Uso de Git/GitHub para versionamento; comunicação via WhatsApp/Discord; reuniões semanais.

8.5 Riscos e Desafios Identificados
Dependências nativas (ex.: sqlite3) podem causar problemas em alguns ambientes de hospedagem; mitigação: usar Node LTS ou migrar para Postgres.

Persistência de arquivos em hosts gratuitos pode ser limitada; mitigação: usar banco gerenciado em produção.

CORS e configuração de HTTPS podem gerar bloqueios se não configurados corretamente; mitigação: testar em ambiente de staging antes do deploy final.

9. DECLARAÇÃO DE ORIGINALIDADE E COMPROMISSO
Declaramos que:

· Este projeto será desenvolvido pela equipe sem uso de framework

· O código será original, desenvolvido pelos membros da equipe

· Utilizaremos as tecnologias HTML5, CSS, Javascript e PHP conforme orientação

· Implementaremos o padrão MVC de forma adequada

· Compreendemos que a nota mínima para aprovação é 6,0.

Data de Submissão: (Preencher a data conforme instrução da disciplina)

ANEXOS / TESTES / WIREFRAMES
Wireframes e mockups podem ser anexados como imagens ou links (Figma) se houver.

Casos de teste principais já descritos no Anexo 2 do documento.
