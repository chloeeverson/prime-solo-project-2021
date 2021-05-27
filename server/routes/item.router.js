const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all items
router.get('/', (req, res) => {
  req.params
  let queryText = 'SELECT amount, name FROM "item";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting items', error);
    res.sendStatus(500);
  });
});

// Adds a new item to the packing list
// Request body must be an item object with an amount, name, and list id.
router.post('/',  (req, res) => {
  let newItem = req.body;
  console.log(`Adding item`, newItem);

  let queryText = `INSERT INTO "item" ("amount", "name", "list_id")
                   VALUES ($1, $2, $3);`;
  pool.query(queryText, [newItem.amount, newItem.name, newItem.list_id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new item`, error);
      res.sendStatus(500);
    });
});

module.exports = router;