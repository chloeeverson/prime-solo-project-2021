const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all lists
router.get('/', (req, res) => {
    console.log(req.user.id);
    
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

router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
    let newList = req.body;
    const user_id = req.user.id;
    console.log(`Adding list`, newList);

    // try {
//     //     //Destructurs req.body
//         // const {
//         //     year_number,
//         //     game_id,
//         //     total_yield,
//         //     total_money,
//         //     stocks
//         // } = req.body;
        await client.query('BEGIN')
        //Creates variable(resultset) to hold id after INSERT
        let queryText = await client.query(`INSERT INTO "list" ("location", "start_date", "days", "user_id")
                   VALUES ($1, $2, $3, $4)
            RETURNING id`,   [newList.location, newList.start_date, newList.days, user_id]);
            const listId = queryText.rows[0].id;
            
//         // const yearInsertResults = await client.query(`INSERT INTO "year" ("year_number", "game_id", "total_yield", "total_money")
//         // // VALUES ($1, $2, $3, $4)
//         // RETURNING id`, [year_number, game_id, total_yield, total_money]);
//         //Sets the id to a usable variable
//         // const yearId = yearInsertResults.rows[0].id;
//         //takes the array of objects(stocks) and maps them out to INSERT each one into stock_year, using the yearId from the previous INSERT
    
        await Promise.all(items.map(item => {
            const insertLineItemText = `INSERT INTO "item" ("amount", "name", "list_id")
                   VALUES ($1, $2, $3);`;
                   const insertLineItemValues = [item.amount, item.name, listId];
//             // const insertLineItemText = INSERT INTO "" ("year_id", "stock_id", "value", "stock_amount", "game_id") VALUES ($1, $2, $3, $4, $5);
//             // const insertLineItemValues = [yearId, stock.stock_id, stock.value, stock.stock_amount, game_id];
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