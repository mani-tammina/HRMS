const nodemailer = require("nodemailer");

// Create Transporter dynamically from environment variables
const host = process.env.EMAIL_HOST || "smtp.gmail.com";
const port = parseInt(process.env.EMAIL_PORT || "587");
const secure = process.env.EMAIL_PORT === "465";
const user = process.env.EMAIL_USER;

console.log(host, "\n", port, "\n", secure, "\n", user, "\n", process.env.EMAIL_PASS)

console.log("[MailService] Initializing transporter with config:", {
    host,
    port,
    secure,
    user,
});

const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for 587/STARTTLS
    auth: {
        user: user,
        pass: process.env.EMAIL_PASS,
    },
});

// Exported sendMail function
const sendMail = async (options) => {
    console.log("[MailService] Attempting to send email with options:", {
        to: options.to,
        subject: options.subject,
        text: options.text ? `${options.text.substring(0, 100)}...` : undefined,
        html: options.html ? "[HTML Content]" : undefined,
    });
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME || 'My App'}" <${process.env.EMAIL_USER}>`,
            ...options,
        });
        console.log("[MailService] Email sent successfully:", info);
        return info;
    } catch (error) {
        console.error("[MailService] Error sending email:", error);
        throw error;
    }
};

module.exports = { sendMail };

