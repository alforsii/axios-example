const express = require('express');
const axios = require('axios');
const router = express.Router();
const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
const Poke = require('../../models/Pokemon.model');

router.get('/', (req, res, next) => {
  axios
    .get(`${pokeApiUrl}?limit=100`)
    .then(allPokemon => {
      // console.log('Output for: allPokemon', allPokemon.data);
      res.render('pokemon/pokemon-lists', {
        pokemons: allPokemon.data.results,
      });
    })
    .catch(err => next(err));
});

router.get('/details/:pokeId', (req, res, next) => {
  // console.log({ params: req.params.pokeId });
  axios
    .get(`${pokeApiUrl}/${Number(req.params.pokeId) + 1}`)
    .then(pokemon => {
      // console.log('pokemon: ', pokemon.data);
      res.render('pokemon/pokemon-details', { pokemon: pokemon.data });
    })
    .catch(err => next(err));
});

router.post('/create/:pokeId', (req, res, next) => {
  const pokeData = req.body;
  pokeData.id = req.params.pokeId;
  Poke.create(pokeData)
    .then(savedPokemon => {
      res.redirect('/user/list');
    })
    .catch(err => next(err));
});

module.exports = router;
