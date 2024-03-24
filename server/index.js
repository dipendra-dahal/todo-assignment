require('dotenv').config()
console.log(process.env)

const express = require("express");
const cors = require("cors");

const { query } = require('./helpers/db.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT;



app.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM task");
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/new", async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO task (description) VALUES ($1) RETURNING *",
      [req.body.description]);
    res.status(201).json({id:result.rows[0].id});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
app.delete('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM task WHERE id = $1', [id])
      res.status(200).json({ id: id });
    } catch (error) {
      res.statusMessage = error.message
    }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

