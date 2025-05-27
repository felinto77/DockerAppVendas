# DockerAppVendas

Somente a mensagem de tente novamente será exibida na aplicação até que algo seja adcionado no banco. tabela "products" assim como consta no migrations.

Primeiramente configurar o banco para a sua preferencia ou acessar o mesmo, depois fazer requisição HTTP com o caminho:
localhost:8000/api/products e adcionar um produto com este body {"name": "Café Tradicional 500g", "price": 12.90, "category_id": 3}

e depois os produtos adcionados será mostrado no frontend.
