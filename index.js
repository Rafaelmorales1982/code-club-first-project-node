/* ROTAS -ROUTERS
  -GET            => Buscar informação no back-end
  -POST          => Criar informação no back-end
  -PUT / PATCH  => Alterar/Atualizar informação no beck-end
  -DELETE      => Deletar informação no back-end
 - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/

const express = require("express");
const port = 3000;
const uuid = require("uuid"); // id utilizando a biblioteca instalada

const app = express();
app.use(express.json());

const users = [];

//função para verificar se o id do usuário existe utilizando um Middleware
const checkUserId = (request, response, next) => {
  const { id } = request.params; //pegando id
  //encontrar a posição dentro do array para atualizar usuário
  const index = users.findIndex((user) => user.id === id);
  //Id não encontrado ele retorna -1 ou seja <0
  if (index < 0) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }

  request.userIndex = index;
  request.userId = id;
  next();
};

//Rota get busca e mostra
app.get("/users", (request, response) => {
  return response.json(users);
});

//Rota post cria usuário
app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name: name, age: age };

  users.push(user); //adiciona o usuário criado pelo método push a lista users

  return response.status(201).json(user); //retorna o usuário criado
});

//Rota atualiza pelo ID

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body; //pegando as informações do usuário
  const index = request.userIndex;
  const id = request.userId;
  const updatedUser = { id, name: name, age: age };

  users[index] = updatedUser;

  return response.json(updatedUser);
});

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.userIndex;

  users.splice(index, 1); //apenas um id é removido
  return response.status(204).json({ message: "usuário excluído com sucesso" });
});

app.listen(port, () => {
  console.log(`🌍 server started on port ${port}`);
});
