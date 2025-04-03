
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

app.get("/",async(req, res)=>{
    res.render("home_page");
})