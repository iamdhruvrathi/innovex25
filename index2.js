const express = require("express");
const router = express.Router();
const { db } = require("./config/firebase");
const sendEmail = require("./config/email"); // import your reusable email sender


// GET /deliveries - Show delivery tasks
router.get("/deliveries", async (req, res) => {
  try {
    // Get kitchens and seekers
    const kitchensSnapshot = await db.collection("kitchens").limit(2).get();
    const seekersSnapshot = await db.collection("seekers").limit(2).get();

    const kitchens = kitchensSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const seekers = seekersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Pair 2 kitchens with 2 seekers
    const deliveries = kitchens.map((kitchen, idx) => ({
      kitchen,
      seeker: seekers[idx] || null,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // expires in 30 minutes
    }));

    res.render("deliveries", { deliveries });
  } catch (err) {
    console.error("Error fetching deliveries:", err);
    res.status(500).send("Failed to load delivery tasks");
  }
});



// POST /deliveries/accept - Accept a delivery
router.post("/deliveries/accept", async (req, res) => {
    const { email, kitchenId, seekerId } = req.body;
  
    if (!email || !kitchenId || !seekerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      // Check if the email exists in the "deliverers" collection
      const delivererSnapshot = await db.collection("delivers").where("email", "==", email).get();
  
      if (delivererSnapshot.empty) {
        return res.status(403).json({ error: "Unauthorized: Email not found in deliverers list" });
      }
  
      res.json({ success: true, kitchenId, seekerId });
    } catch (err) {
      console.error("Error accepting delivery:", err);
      res.status(500).json({ error: "Failed to accept delivery" });
    }
  });

// Show the notify page with a button
router.get("/notify", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notify Deliverers</title>
        <style>
          body { font-family: Arial; text-align: center; padding-top: 50px; }
          button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <h2>Notify All Delivery Partners</h2>
        <form method="POST" action="/notify">
          <button type="submit">Send Emails</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the POST request to send emails
router.post("/notify", async (req, res) => {
  try {
    const snapshot = await db.collection("delivers").get();
    const deliverers = snapshot.docs.map(doc => doc.data());

    if (deliverers.length === 0) {
      return res.send("No deliverers found.");
    }

    for (const deliverer of deliverers) {
      const subject = "🚚 New Deliveries Available!";
      const text = `
Hi ${deliverer.name},

We have fresh delivery tasks available now!

Click below to view and accept available tasks:
http://localhost:3000/deliveries

Thank you for being part of our mission to serve the community.

– Team FoodAid
      `;

      await sendEmail(deliverer.email, subject, text);
    }

    res.send("Emails sent successfully to all deliverers!");
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).send("Something went wrong while sending emails.");
  }
});


module.exports = router;
