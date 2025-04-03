const { db } = require("../config/firebase.js");

class Kitchen {
    constructor(name, address, dailyProd, avgWaste, certs, delivery, donations) {
        this.name = name;
        this.address = address;
        this.dailyProd = dailyProd;
        this.avgWaste = avgWaste;
        this.certs = certs;
        this.delivery = delivery;
        this.donations = donations;
    }

    static async create(kitchen) {
        const ref = await db.collection("kitchens").add(kitchen.toJSON());
        return ref.id;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = { Kitchen };