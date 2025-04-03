class Volunteer {
    constructor(name, email, phNo, startDate, workType, valid) {
        this.name = name;        // Volunteer Name
        this.email = email;      // Email
        this.phNo = phNo;        // Phone Number
        this.startDate = startDate; // Start Date of Volunteering
        this.workType = workType; // Type of Work (e.g., Delivery, Cooking)
        this.valid = valid;      // Whether the Volunteer is Active (true/false)
    }

    getInfo() {
        return {
            name: this.name,
            email: this.email,
            phNo: this.phNo,
            startDate: this.startDate,
            workType: this.workType,
            valid: this.valid,
        };
    }
}

module.exports = { Volunteer };
