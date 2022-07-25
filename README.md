# XP - Backend case 🚀

## Getting started:

-

## Roadmap:

- [X] - Decidir a linguagem e as ferramentas a serem utilizadas
- [X] - Modelar o banco (inserir link para o banco)
- [X] - Gerar o banco e verificar se as tabelas estão corretas
- [X] - Fazer script para dropar banco com o Prisma e reset de banco (abrir uma issue no prisma)
- [X] - Coletar dados para popular o banco
- [X] - Popular o banco:\
  - [X] - Padronizar dados para inserir no banco\
  - [X] - (Bônus) Algoritmo criado para trocar a posição da ordem das datas, problema no birthDate era dd/mm/yyyy -> yyyy-mm-dd\
  - [X] - Algoritmo para padronizar os dados das cotações coletadas no InfoMoney\
  - [X] - (Bônus) Hash com double salt -> pwd + salt estático + salt dinâmico\
  - [X] - Popular as 15 tabelas\
- [X] - API:
  - [X] - Obrigatório:
    - [X] - GET ALL /asset/stocks === GET /ativos
    - [X] - POST /investments/buy === /investimentos/\comprar
    - [X] - POST /investments/sell === /investimentos/vender
    - [X] - GET BY ASSETS /asset/o/{ticker} === /ativos/{cod-ativo} || codAtivo === XPBR31
    - [X] - POST /account/deposit === /conta/deposito (id no jwt)
    - [X] - POST /account/withdraw === /conta/saque (id no jwt)
    - [X] - GET /account/balance === /conta/{cod-cliente} (id no JWT)
  - [X] - Bônus: 
    - [X] - POST /signup -> TOKEN(jwt)
    - [X] - POST /signin -> TOKEN(jwt)
    - [X] - GET /account/statement -> extrato da conta
    - [X] - GET /wallets -> todas as carteiras do client
    - [X] - GET /wallets/:walletName -> carteira específica do cliente
    - [X] - GET /asset/i/companies  -> dados de todas as companhias e seus respectivos tickers agrupados
    - [X] - GET /asset/i/companies/{ticker} -> dados específico de uma companhia baseado no ticker(XPBR31)
    - [X] - GET /asset/i/tickers (ALL COMPLETE INFOS) -> infos parcias das companhias e seus tickers
    - [ ] - GET /asset/i/stocks/{ticker} -> infos parciais de uma única companhia e seus tickers
- [X] Utils:
  - [X] - utils:
    - [X] newDataFormats -> formatadores de datas, optei por fazer scripts ao invés de lib
    - [X] changeFormat data -> publicar no NPM
    - [X] Operation -> Currying function com object literals
    - [X] Hash -> hash simples para salvar o password do usuário com dois salts, salt dinâmico, salt no servidor com password
    - [X] validateHash -> validador do hash para comprovar que é o usuário
    - [X] serializeAndCreate -> padronizar os meus dados e criar um arquivo para alimentar o banco de dados

# Swagger

fakers - https://geradorbrasileiro.com/api-doc


