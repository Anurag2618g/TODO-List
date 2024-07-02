import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ToDoList",
  password: "chained_86",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async(req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listItems: items,
    });
  } catch (err) {
    res.statusCode(404);
    res.redirect("/");
  }
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)",[item]);
    res.redirect("/");
  } catch (err) {
    res.statusCode(404);
  }
});

app.post("/edit", async(req, res) => {});

app.post("/delete", async(req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
