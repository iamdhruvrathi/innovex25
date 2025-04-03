const { db } = require("../config/firebase.js");

class Donation {
    constructor(name, email, address, type, amount) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.type = type;
        this.amount = amount;
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