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
    const kitchenData = {
      name: req.body.name || "",
      address: req.body.address || "",
      dailyProd: req.body.dailyProd || "",
      avgWaste: req.body.avgWaste || "",
      certs: req.body.certs || "",
      delivery_type: req.body.delivery_type || "",
      donations: req.body.donations || "",
    };
    console.log(kitchenData);

    if (!kitchenData.name || !kitchenData.address || !kitchenData.dailyProd) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.collection("kitchens").add(kitchenData);
    res.redirect("/thanks");
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
    const volunteerData = {
      name: req.body.name || "",
      email: req.body.email || "",
      phone: req.body.phNo || "",
      startDate: req.body.startDate || "",
      workType: req.body.workType || "",
    };

    console.log(volunteerData);

    if (!volunteerData.name || !volunteerData.email || !volunteerData.phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await db.collection("volunteers").add(volunteerData);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({ error: "Failed to register volunteer" });
  }
});

app.post("/seeker", async (req, res) => {
  try {
    const seekerData = {
      type: req.body.type,
      name: req.body.name,
      address: req.body.address,
      dailyNeed: req.body.dailyNeed,
      contact: req.body.contact,
      freq: req.body.freq,
    };

    console.log(seekerData);

    const seeker = new Seeker(
      seekerData.type,
      seekerData.name,
      seekerData.address,
      seekerData.dailyNeed,
      seekerData.contact,
      seekerData.freq
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
