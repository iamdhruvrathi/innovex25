const { db } = require("./config/firebase");
const { Kitchen } = require("./models/Kitchen");
const { Seeker } = require("./models/Seeker");
const { Donation } = require("./models/Donation");
const { KitchenDonation } = require("./models/KitchenDonation");
const { Volunteer } = require("./models/Volunteer");

async function runTests() {
    try {
        // Test Kitchen
        const kitchen = new Kitchen("Sunshine Kitchen", "123 Main St", 500, 50, ["ISO 22000"], "Doorstep", []);
        const kitchenId = await Kitchen.create(kitchen);
        console.log("Kitchen Created with ID:", kitchenId);

        // Test Seeker
        const seeker = new Seeker("NGO", "Food Aid", "456 Elm St", 300, "9876543210", 3);
        const seekerId = await Seeker.create(seeker);
        console.log("Seeker Created with ID:", seekerId);

        // Test Donation
        const donation = new Donation("John Doe", "john@example.com", "789 Pine St", "Food", 100);
        const donationId = await Donation.create(donation);
        console.log("Donation Created with ID:", donationId);

        // Test KitchenDonation
        const kitchenDonation = new KitchenDonation(kitchenId, seekerId, 200, "Cooked Meal", "Expires in 2 days");
        const kitchenDonationId = await KitchenDonation.create(kitchenDonation);
        console.log("Kitchen Donation Created with ID:", kitchenDonationId);

        // Test Volunteer
        const volunteer = new Volunteer("Jane Smith", "jane@example.com", "1234567890", "2025-04-01", "Delivery", true);
        const volunteerId = await Volunteer.create(volunteer);
        console.log("Volunteer Created with ID:", volunteerId);
    } catch (error) {
        console.error("Error in test:", error);
    }
}

runTests();
