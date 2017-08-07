const express = require('express');
const routes = express.Router();

const Collection = require('../models/collection');

routes.get('/', (req, res) => {

  res.render('listFabric')
  Collection.find()

    .then(collection => res.render('listFabric', { collection: collection }))

    .catch(err => res.send('there was an error'));
});

routes.get('/fabricForm', (req, res) => {
  if (req.query.id) {
    Collection.findById(req.query.id)

      .then(collection => res.render('fabricForm', { collection: collection }));
  } else {
    res.render('fabricForm');
  }
});

routes.post('/addFabric', (req, res) => {
  Collection.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/'))
    // catch validation errors
    .catch(err => {
      console.log(err);
      res.render('fabricForm', {
        errors: err.errors,
        collection: req.body
      });
    });
});

routes.get('/deleteFabric', (req, res) => {
  Collection.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
