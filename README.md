# DockerAppVendas

Foi utilizado a base de um projeto já existente para implementação da tecnologia docker

- Primeiro foi configurado o caminho para a Database para fazer testes em um ambiente vazio.
- A implementação geral do Docker foi o proximo passo, Front / Back / Database foram criados no Docker.
- Após isso foi mudado os caminhos para leitura dos dados no Front-end, que antes puxava de um banco na rede, e agora está instanciado em "localhost".
- Uma bateria de testes foi feita para assegurar as funcionalidades da aplicação.
- Após me certificar que tudo estava funcionando, o projeto foi enviado.

# Utilização do código

Somente a mensagem de tente novamente será exibida na aplicação até que algo seja adcionado no banco. tabela "products" assim como consta no migrations.

Primeiramente configurar o banco para a sua preferencia ou acessar o mesmo, depois fazer requisição HTTP com o caminho:
localhost:8000/api/products e adcionar um produto com este body {"name": "Café Tradicional 500g", "price": 12.90, "category_id": 3}

e depois os produtos adcionados será mostrado no frontend.
