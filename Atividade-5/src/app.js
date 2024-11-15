const express = require('express');
const app = express();

// Middleware para tratar o corpo das requisições
app.use(express.json());

// "Banco de dados" em memória
let animes = [
  {
    id: 1,
    name: 'Naruto',
    genre: 'Ação',
    studio: 'Pierrot',
  }
];

// Validações
function validateAnime(anime) {
  if (!anime.name || !anime.genre || !anime.studio) {
    return false;
  }
  return true;
}

// Criar um novo anime
app.post('/animes', (req, res) => {
  const { name, genre, studio } = req.body;

  if (!validateAnime(req.body)) {
    return res.status(400).json({ message: 'Todos os campos (name, genre, studio) são obrigatórios.' });
  }

  const newAnime = {
    id: animes.length + 1,
    name,
    genre,
    studio,
  };

  animes.push(newAnime);
  res.status(201).json(newAnime);
});

// Listar todos os animes
app.get('/animes', (req, res) => {
  res.status(200).json(animes);
});

// Listar um anime por id
app.get('/animes/:id', (req, res) => {
  const anime = animes.find(a => a.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).json({ message: 'Anime não encontrado' });
  }
  res.status(200).json(anime);
});

// Atualizar um anime
app.put('/animes/:id', (req, res) => {
  const { name, genre, studio } = req.body;

  if (!validateAnime(req.body)) {
    return res.status(400).json({ message: 'Todos os campos (name, genre, studio) são obrigatórios.' });
  }

  let anime = animes.find(a => a.id === parseInt(req.params.id));

  if (!anime) {
    return res.status(404).json({ message: 'Anime não encontrado' });
  }

  anime.name = name;
  anime.genre = genre;
  anime.studio = studio;

  res.status(200).json(anime);
});

// Deletar um anime
app.delete('/animes/:id', (req, res) => {
  const animeIndex = animes.findIndex(a => a.id === parseInt(req.params.id));

  if (animeIndex === -1) {
    return res.status(404).json({ message: 'Anime não encontrado' });
  }

  animes.splice(animeIndex, 1);
  res.status(204).send();
});

module.exports = app;
