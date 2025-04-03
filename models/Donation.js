const { db } = require("../config/firebase.js");

class Donation {
    constructor(name, email, phone, address, foodType, quantity, pickupDate = "", pickupTime = "", notes = "") {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.foodType = foodType;
        this.quantity = quantity;
        this.pickupDate = pickupDate;
        this.pickupTime = pickupTime;
        this.notes = notes;
        this.dateTime = new Date().toISOString();
    }

    static async create(donation) {
        donation.dateTime = new Date().toISOString();
        const ref = await db.collection("donations").add(donation.toJSON());
        return ref.id;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = { Donation };
