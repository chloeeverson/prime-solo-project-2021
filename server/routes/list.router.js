const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all saved lists 
router.get('/', (req, res) => {
  console.log(req.user.id);

  let queryText = `SELECT * FROM "list" WHERE user_id= ${req.user.id} ORDER BY start_date DESC;`;
  pool.query(queryText).then(result => {
    // Sends back the results in an array
    res.send(result.rows);
  })
    .catch(error => {
      console.log('error getting lists', error);
      res.sendStatus(500);
    });
});

// Get saved list based on list id as params
router.get('/:id', (req, res) => {
  console.log(req.user.id);

  let queryText = `SELECT * FROM "list" WHERE user_id= ${req.user.id} AND id=$1;`;
  pool.query(queryText, [req.params.id]).then(result => {
    // Sends back the results in an object
    res.send(result.rows[0]);
  })
    .catch(error => {
      console.log('error getting lists', error);
      res.sendStatus(500);
    });
});

//update changes of list properties to database
router.put('/:id', (req, res) => {
  console.log('Checking put, id=', req.params.id, 'body=', req.body);
  const queryText = `UPDATE list SET location=$1, start_date=$2, days=$3 WHERE id = $4;`;
  pool.query(queryText, [req.body.location, req.body.start_date, req.body.days, req.params.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error updating list`, error);
      res.sendStatus(500);
    });
});

//permanently delete specified list from database
router.delete('/:id', (req, res) => {
  console.log(req.params.id);

  console.log('Delete request for id', req.params.id);
  let sqlText = `DELETE FROM item WHERE list_id=$1;`;
  pool.query(sqlText, [req.params.id])

  let secondText = `DELETE FROM list WHERE id = $1;`;
  pool.query(secondText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making database query ${sqlText}`, err);
      res.sendStatus(500)
    })

});

//add new packing list and its items to database
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      location,
      start_date,
      days,
      items
    } = req.body;
    const user_id = req.user.id;
    console.log(`Adding list`, { location }, { start_date });


    await client.query('BEGIN')
    //Creates variable(resultset) to hold id after INSERT
    let queryText = await client.query(`INSERT INTO "list" ("location", "start_date", "days", "user_id")
                   VALUES ($1, $2, $3, $4)
            RETURNING id`, [location, start_date, days, user_id]);
    //takes id generated for list to be used as property for item so items are linked to their specific list
    const listId = queryText.rows[0].id;
    await Promise.all(items.map(item => {
      const insertLineItemText = `INSERT INTO "item" ("amount", "name", "list_id")
                   VALUES ($1, $2, $3);`;
      const insertLineItemValues = [item.amount, item.name, listId];

      return client.query(insertLineItemText, insertLineItemValues);
    }));
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    //Rollback takes back all the code it there is an error.  If one INSERT worked but the other didn't it would take back the first INSERT from the DATABASE
    await client.query('ROLLBACK')
    console.log('Error POST list and item', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

module.exports = router;