const express = require('express');
const router = express.Router();
const Poke = require('../../models/Pokemon.model');

/* GET /user/list page */
router.get('/user/list', (req, res, next) => {
  Poke.find()
    .then(titles => {
      console.log('Output for: titles', titles);
      res.render('users/list', { titles });
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
