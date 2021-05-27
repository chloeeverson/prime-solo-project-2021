const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all lists
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "list" WHERE user_id= ${req.user.id};`;
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting lists', error);
    res.sendStatus(500);
  });
});

// Adds a new list to saved lists
// Request body must be a list object with location, date, days.
router.post('/',  (req, res) => {
  let newList = req.body;
  const user_id = req.user.id;
  console.log(`Adding list`, newList);

  let queryText = `INSERT INTO "list" ("location", "start_date", "days", "user_id")
                   VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [newList.location, newList.start_date, newList.days, user_id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new list`, error);
      res.sendStatus(500);
    });
});

module.exports = router;