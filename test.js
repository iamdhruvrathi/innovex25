const { db } = require("./config/firebase");

async function getAllKitchens() {
    try {
        const snapshot = await db.collection("seekers").get(); // Get all docs
        const kitchens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to array
        return kitchens;
    } catch (error) {
        console.error("Error fetching kitchens:", error);
        return [];
    }
}

// Example usage
getAllKitchens().then(kitchens => console.log(kitchens));
