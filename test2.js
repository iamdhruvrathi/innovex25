const { Resend } = require("resend"); // Ensure correct import
require("dotenv").config(); // Load environment variables

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev", // Resend test sender (for unverified accounts)
            to: "ankhadatharva15@gmail.com", // Change to the recipient's email
            subject: "Hello World",
            html: "<p>CHUBS MAHARAJ KI JAIII <strong>first email</strong>!</p>",
        });

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

sendEmail();
