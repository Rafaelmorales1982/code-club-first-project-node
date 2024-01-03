/* 
  -Query params => meusite.com/users?nome=rodolfo&age=28   // FILTROS
  -Route params => /users/2    //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO

*/
//importar biblioteca  express - ajuda nas rotas
const express = require("express");
const port = 3000;

//iniciando express em nosso computador é localhost
const app = express();
//avisando ao express que vamos utilizar json como padrão
app.use(express.json());
//criar uma rota  -> pela documentação node  resquest -> solicitar  response -> resposta send -> enviar
//app.get("/users/:id", (request, response) => {
app.get("/users", (request, response) => {
  //const name = request.query.name;
  //const age = request.query.age;
  //const { id } = request.params;
  // const { name, age } = request.query;

  //console.log(name, age); //mostrando os parametros

  //return response.json({ name: name, age: age }); //objetos criado para receber  Query params => meusite.com/users?nome=rodolfo&age=28
  // vai mostrar no Insomnia
  //console.log(request.body);
  const { name, age } = request.body;

  return response.json({ name, age });
});

//adicionando a porta que a aplicação vai rodar
app.listen(port, () => {
  console.log(`🚀 O servidor foi iniciado porta ${port}`);
});
