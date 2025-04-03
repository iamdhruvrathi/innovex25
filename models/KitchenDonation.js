const { db } = require("../config/firebase.js");
class KitchenDonation {
    constructor(kitchenId, seekerId, foodAmount, foodType, expiryInfo) {
        this.kitchenId = kitchenId;
        this.seekerId = seekerId;
        this.foodAmount = foodAmount;
        this.dateTime = new Date().toISOString();
        this.foodType = foodType;
        this.expiryInfo = expiryInfo;
    }

    static async create(kitchenDonation) {
        kitchenDonation.dateTime = new Date().toISOString();
        const ref = await db.collection("kitchen_donations").add(kitchenDonation.toJSON());
        return ref.id;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = { KitchenDonation };
