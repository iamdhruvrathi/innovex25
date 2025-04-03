const { db } = require("../config/firebase.js");

class Seeker {
    constructor(type, name, address, dailyNeed, contact, freq) {
        this.type = type;
        this.name = name;
        this.address = address;
        this.dailyNeed = dailyNeed;
        this.contact = contact;
        this.freq = freq;
        this.recieved = 0;
    }

    static async create(seeker) {
        const ref = await db.collection("seekers").add(seeker.toJSON());
        return ref.id;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = { Seeker };