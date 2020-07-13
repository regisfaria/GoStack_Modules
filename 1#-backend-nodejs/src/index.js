const express = require('express');
// Below lib is used to create unique IDs
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

//  If I don't call the next param function, the actual request that called my middleware
// will be stoped
//  Returning next() by the end of my middleware, I can continue the original requisition execution
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();       // Next request

  console.timeEnd(logLabel);
}

function validateProjectId(request, resposne, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({error: "Invalid project ID"});
  }

  return next();
}

app.use(logRequests);
app.use("/projects/:id", validateProjectId);

app.get('/projects', (request, response) => {
  const { owner } = request.query;

  const results = owner ? projects.filter(project => project.owner == owner) : projects;

  // response.send() let me return a text
  // resposne.json returns a json object
  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner}

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({error:"Project not found"});
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({error:"Project not found"});
  }

  projects.splice(projectIndex, 1);

  // At deletion, we usually return a send response, with status 204
  return response.status(204).send(); 
});

//  Open localhost port 3333 for the api
//  The second param of listen functionn is a arrow function that runs
// when the API is loaded
app.listen(3333, () => {
  console.log("Backend online")
});