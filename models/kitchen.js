class Kitchen {
    constructor(name, address, dailyProd, avgWaste, certs, delivery, donations) {
        this.name = name;          // Kitchen Name
        this.address = address;    // Address
        this.dailyProd = dailyProd; // Per Day Production
        this.avgWaste = avgWaste;  // Average Wastage
        this.certs = certs;        // Certifications
        this.delivery = delivery;  // Delivery Type
        this.donations = donations; // Donations
    }

    getInfo() {
        return {
            name: this.name,
            address: this.address,
            dailyProd: this.dailyProd,
            avgWaste: this.avgWaste,
            certs: this.certs,
            delivery: this.delivery,
            donations: this.donations,
        };
    }
}

module.exports = { Kitchen };
