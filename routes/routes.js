const express = require('express');
const routes = express.Router();

const Collection = require('../models/collection');

routes.get('/', (req, res) => {
  Collection.find()

    .then(collections => res.render('listFabric', {
      collections: collections
    }))

    .catch(err => res.send('there was an error'));
});

routes.get('/fabricForm', (req, res) => {
  if (req.query.id) {
    Collection.findById(req.query.id)

      .then(collections => res.render('fabricForm', {
        collections: collections
      }));
  } else {
    res.render('fabricForm');
  }
});

routes.post('/addFabric', (req, res) => {
  // Collection.findByIdAndUpdate(req.body.id, req.body, {
  //     upsert: true
  //   })
  //   .then(() => res.redirect('/'))
  //   // catch validation errors
  //   .catch(err => {
  //     console.log(err);
  //     res.render('fabricForm', {
  //       errors: err.errors,
  //       collection: req.body
  //     });
  //   });
  if (req.body.id) {
    Collection.findById(req.body.id)
  }
  else {
    new Collection(req.body)
      .save()
      // then redirect to the homepage
      .then(() => res.redirect('/'))
      // catch validation errors
      .catch(err => {
        console.log(err.errors);
        res.render('fabricForm', {
          errors: err.errors,
          collections: req.body
        })
      })
  }
});

routes.get('/deleteFabric', (req, res) => {
  Collection.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
