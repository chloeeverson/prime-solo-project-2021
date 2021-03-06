const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all items specific to trip
router.get('/:id', (req, res) => {
  console.log('in items router:', req.params.id)
  let queryText = 'SELECT id, amount, name, complete FROM "item" WHERE list_id=$1 ORDER BY complete ASC;';
  pool.query(queryText, [req.params.id]).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
    .catch(error => {
      console.log('error getting items', error);
      res.sendStatus(500);
    });
});

// Adds a new item to the saved packing list
// Request body must be an item object with an amount, name, and list id.
router.post('/', (req, res) => {
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

//permanently deletes selected saved item from database
router.delete('/:id', (req, res) => {
  console.log(req.params.id);

  console.log('Delete request for id', req.params.id);
  let sqlText = `DELETE FROM item WHERE id = $1;`;
  pool.query(sqlText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making database query ${sqlText}`, err);
      res.sendStatus(500)
    })

});

//edit item in database from saved list in- name/amount or both
router.put('/:id', (req, res) => {
  console.log('Checking put, body=', req.body);
  const queryText = `UPDATE item SET amount=$1, name=$2 WHERE id = $3;`;
  pool.query(queryText, [req.body.amount, req.body.name, req.params.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error updating item`, error);
      res.sendStatus(500);
    });
});

//permanently change whether saved item is packed "complete" or not in database
router.put('/complete/:id', (req, res) => {
  console.log('Checking complete put, body=', req.body);
  const queryText = `UPDATE item SET complete=NOT complete WHERE id = $1;`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error updating complete item`, error);
      res.sendStatus(500);
    });
});

module.exports = router;