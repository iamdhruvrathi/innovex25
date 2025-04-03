const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const { db } = require("./config/firebase.js");
const { Kitchen } = require("./models/Kitchen");
const { Seeker } = require("./models/Seeker");
const { Donation } = require("./models/Donation");
const { Volunteer } = require("./models/Volunteer");

const app = express();
const PORT = process.env.PORT || 8000; // Keep only one PORT setting

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home_page");
}); 

app.get("/donate", (req, res) => {
  res.render("donate_page");
  
});

app.post("/donate", async (req, res) => {
  try {
    const donationData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      foodType: req.body["food-type"], 
      quantity: req.body.quantity,
      pickupDate: req.body["pickup-date"] || "",
      pickupTime: req.body["pickup-time"] || "",
      notes: req.body.notes || "",
    };

    console.log(donationData);

    const donation = new Donation(
      donationData.name,
      donationData.email,
      donationData.phone,
      donationData.address,
      donationData.foodType,
      donationData.quantity,
      donationData.pickupDate,
      donationData.pickupTime,
      donationData.notes
    );

    await Donation.create(donation);
     res.redirect("/thanks");

  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Failed to process donation" });
  }
});


app.get("/kitchen", (req, res) => {
  res.render("kitchen_page_registration.ejs");
});

app.post("/kitchen", async (req, res) => {
  try {
    const kitchen = new Kitchen(
      req.body.name,
      req.body.address,
      req.body.dailyProd,
      req.body.avgWaste,
      req.body.certs,
      req.body.delivery,
      req.body.donations
    );
    res.redirect("/thanks");
    await Kitchen.create(kitchen);
  } catch (error) {
    console.error("Error adding kitchen:", error);
    res.status(500).json({ error: "Failed to register kitchen" });
  }
});

app.get("/volunteer", (req, res) => {
  res.render("volunteer.ejs");
});
app.get("/thanks", (req, res) => {
  res.render("thank_you.ejs");
});

app.post("/volunteer", async (req, res) => {
  try {
    const volunteer = new Volunteer(
      req.body.name,
      req.body.email,
      req.body.phNo,
      req.body.startDate,
      req.body.workType,
      req.body.valid
    );
    await Volunteer.create(volunteer);
     res.redirect("/");
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({ error: "Failed to register volunteer" });
  }
});

app.get("/seeker", (req, res) => {
  res.render("seeker_page.ejs");
});

app.post("/seeker", async (req, res) => {
  try {
    const seeker = new Seeker(
      req.body.type,
      req.body.name,
      req.body.address,
      req.body.dailyNeed,
      req.body.contact,
      req.body.freq
    );
    await Seeker.create(seeker);
     res.redirect("/");
  } catch (error) {
    console.error("Error adding seeker:", error);
    res.status(500).json({ error: "Failed to register seeker" });
  }
});


app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
