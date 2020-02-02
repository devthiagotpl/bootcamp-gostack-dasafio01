const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

// MIDDLEWARES
function logRequests(req, res, next) {

  console.count("Numero de requisições");

  return next();
}

server.use(logRequests);


function checkProjectExists(req, res, next) {
  if(!req.body.title){
    return res.status(400).json({error: 'Project not found'})
  }

  return next();
}



// LISTANDO TODOS PROJETOS
server.get('/projects', (req, res) =>{
  return res.json(projects)


})

// CRIANDO PROJETO
server.post('/projects', (req, res) =>{
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);


  return res.json(project);

});

// ADD NOVA TAREFA
server.post('/projects/:id/tasks', checkProjectExists, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.tasks.push(title);
  
  return res.json(project)
});

// EDITANDO PROJETO ATRAVÉS DO "ID"
server.put('/projects/:id', checkProjectExists, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;


  const project = projects.find(p => p.id == id);

  project.title = title;
  

  return res.json(project);

})

// DELETANDO PROJETO ATRAVÉS DO "ID"
server.delete('/projects/:id', checkProjectExists, (req, res) =>{
  const { id } = req.params;

  
  projects.splice(id, 1);

  return res.json(projects)
})

// SERVIDOR LOCAL
server.listen(3001);
