import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "1296",
  port: 5432,
});
db.connect();

let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async(req, res) => {
  try{
    const result= await db.query("SELECT * FROM items ORDER BY id ASC");
    items=result.rows;
    res.render("index.ejs", {
      listTitle: "Books I Read",
      listItems: items,
    });
  } catch(error){
    console.log(err);
  }
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  //items.push(item);
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch(error){
    console.log(err);
  }
});

app.post("/edit", async(req, res) => {
  const item= req.body.UpdatedItemTitle;
  const id= req.body.UpdatedItemId;
  try{
    await db.query("UPDATE items SET title = ($1) WHERE id= $2 ", [item,id]);
    res.redirect("/");
  } catch(error){
    console.log(err);
  }
});

app.post("/delete", async(req, res) => {
  const id=req.body.deleteItemId;
  try{
    await db.query("DELETE FROM items WHERE id= $1 ", [id]);
    res.redirect("/");
  }catch(error){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
