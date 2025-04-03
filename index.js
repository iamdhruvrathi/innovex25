const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
app.use(express.json()); 

app.listen(8000, () => {
  console.log("http://localhost:8000");
});

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home_page.ejs");
});

app.get("/donate", (req, res) => {
  res.render("donate_page");
});

app.post("/donate", (req, res) => {
  console.log("Received Donation:", req.body); 
  res.json({ message: "Donation received. Thank you!" });
});

app.get("/kitchen", (req, res) => {
  res.render("kitchen_page_registration.ejs");
});

app.post("/kitchen", (req, res) => {
  console.log("Received Kitchen:", req.body); 
  res.json({ message: "Kitchen registered successfully!" });
});

app.get("/volunteer", (req, res) => {
  res.render("volunteer.ejs");
});

app.post("/volunteer", (req, res) => {
  console.log("Received volunteer:", req.body); 
  res.json({ message: "volunteer registered successfully!" });
});

app.get("/seeker", (req, res) => {
  res.render("seeker_page.ejs");
});

app.post("/seeker", (req, res) => {
  console.log("Received seeker:", req.body);
  res.json({ message: "seeker registered successfully!" });
});

