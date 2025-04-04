const express = require("express");
const router = express.Router();
const { db } = require("./config/firebase");

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
  

module.exports = router;
