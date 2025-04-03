const { db } = require("../config/firebase.js");

class Kitchen {
    constructor(name, address, dailyProd, avgWaste, certs, delivery_type) {
        this.name = name;
        this.address = address;
        this.dailyProd = dailyProd;
        this.avgWaste = avgWaste;
        this.certs = certs;
        this.delivery_type = delivery_type;
        this.donations = 0;
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