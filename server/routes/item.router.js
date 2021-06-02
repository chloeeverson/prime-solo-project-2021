const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all items
router.get('/:id', (req, res) => {
  req.params
  let queryText = 'SELECT amount, name FROM "item" WHERE list_id=$1;';
  pool.query(queryText, [req.params.id]).then(result => {
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
// router.post('/',  (req, res) => {
//   let newItem = req.body;
//   console.log(`Adding item`, newItem);

//   let queryText = `INSERT INTO "item" ("amount", "name")
//                    VALUES ($1, $2);`;
//   pool.query(queryText, [newItem.amount, newItem.name])
//     .then(result => {
//       res.sendStatus(201);
//     })
//     .catch(error => {
//       console.log(`Error adding new item`, error);
//       res.sendStatus(500);
//     });
// });

router.delete('/:id', (req, res) => {
  console.log(req.params.id);

  console.log('Delete request for id', req.params.id);
  let sqlText = `DELETE FROM item WHERE id = $1;`;
  pool.query(sqlText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making databse query ${sqlText}`, err);
      res.sendStatus(500)
    })

});
// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//   console.log(req.params.id);

//   console.log('Delete request for id', req.params.id);
//   let sqlText = `DELETE FROM item WHERE id = $1 AND user_id = ${req.user.id};`;
//   pool.query(sqlText, [req.params.id])
//     .then((result) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log(`Error making databse query ${sqlText}`, err);
//       res.sendStatus(500)
//     })

// });

module.exports = router;