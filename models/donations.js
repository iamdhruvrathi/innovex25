class Donation {
    constructor(name, email, address, type, amount) {
        this.name = name;      // Donor Name
        this.email = email;    // Email
        this.address = address; // Address
        this.type = type;      // Donation Type (e.g., Food, Money)
        this.amount = amount;  // Donation Amount
    }

    getInfo() {
        return {
            name: this.name,
            email: this.email,
            address: this.address,
            type: this.type,
            amount: this.amount,
        };
    }
}

module.exports = { Donation };
