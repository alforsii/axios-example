const express = require('express');
const axios = require('axios');
const router = express.Router();
const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
const Poke = require('../../models/Pokemon.model');

/* GET /user/list page for pokemon title*/
router.get('/user/list', (req, res, next) => {
  Poke.find()
    .then(titlesFromDB => {
      // console.log('Output for: titlesFromDB', titlesFromDB);
      res.render('users/list', { titlesFromDB });
    })
    .catch(err => next(err));
});

// title details route
router.get('/user/title-details/:titleId', (req, res, next) => {
  Poke.findById(req.params.titleId)
    .then(theTitleFromDB => {
      axios
        .get(`${pokeApiUrl}/${theTitleFromDB.id}`)
        .then(pokemonFromAPI => {
          const data = {
            title: theTitleFromDB,
            pokemon: pokemonFromAPI.data,
          };

          // console.log({ data });
          res.render('users/title-details', data);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/user/update/:id', (req, res, next) => {
  res.render('users/update-title', { titleId: req.params.id });
});

router.post('/user/update/:id', (req, res, next) => {
  Poke.findByIdAndUpdate(req.params.id, { title: req.body.title })
    .then(titles => {
      // console.log('Output for: titles', titles);
      res.redirect('/user/list');
    })
    .catch(err => next(err));
});

router.post('/user/delete/:id', (req, res, next) => {
  Poke.findByIdAndRemove(req.params.id)
    .then(titles => {
      console.log('removed title: ', titles);
      res.redirect('back');
    })
    .catch(err => next(err));
});

module.exports = router;
