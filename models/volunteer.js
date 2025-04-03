const { db } = require("../config/firebase.js");
class Volunteer {
    constructor(name, email, phNo, startDate, workType, valid) {
        this.name = name;
        this.email = email;
        this.phNo = phNo;
        this.startDate = startDate;
        this.workType = workType;
        this.valid = valid;
    }

    static async create(volunteer) {
        const ref = await db.collection("volunteers").add(volunteer.toJSON());
        return ref.id;
    }

    toJSON() {
        return { ...this };
    }
}

module.exports = { Volunteer };
