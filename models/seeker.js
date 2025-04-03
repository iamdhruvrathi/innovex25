class Seeker {
    constructor(type, name, address, dailyNeed, contact, freq) {
        this.type = type;        // Seeker Type
        this.name = name;        // Name
        this.address = address;  // Address
        this.dailyNeed = dailyNeed; // Daily Consumption Requirements
        this.contact = contact;  // Contact Information
        this.freq = freq;        // Frequency of Food Needed Per Day
    }

    getInfo() {
        return {
            type: this.type,
            name: this.name,
            address: this.address,
            dailyNeed: this.dailyNeed,
            contact: this.contact,
            freq: this.freq,
        };
    }
}

module.exports = { Seeker };
