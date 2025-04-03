class KitchenDonation {
    constructor(kitchenId, seekerId, foodAmount, dateTime, foodType, expiryInfo) {
        this.kitchenId = kitchenId;  // Kitchen ID
        this.seekerId = seekerId;    // Seeker ID
        this.foodAmount = foodAmount; // Amount of Food
        this.dateTime = dateTime;    // Date & Time of Donation
        this.foodType = foodType;    // Type of Food (Cooked, Raw, etc.)
        this.expiryInfo = expiryInfo; // Estimated Expiry Time
    }

    getInfo() {
        return {
            kitchenId: this.kitchenId,
            seekerId: this.seekerId,
            foodAmount: this.foodAmount,
            dateTime: this.dateTime,
            foodType: this.foodType,
            expiryInfo: this.expiryInfo,
        };
    }
}

module.exports = { KitchenDonation };
