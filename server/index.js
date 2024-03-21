const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_database',
    password: 'postgres',
    port: 5432
})

app.get('/', (req, res) => {
    pool.query('select *  from todos;', (error, result) => {
        if(error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(result.rows);
        }
    });
    
});


app.post('/new', (req, res) => {
    const {task} = req.body;
if (!task) {
    return res.status(400).json({error:'task is required'});
}
    pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task], (error, result) => {
        if(error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json({id:result.rows[0].id});
        }
    });
});


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


