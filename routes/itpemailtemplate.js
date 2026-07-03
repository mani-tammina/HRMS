const { sendMail } = require("../utils/mail.service");
async function test() {
    await sendMail({
        to: 'sivameesala97@gmail.com',
        subject: "Master HRMS - OTP for Creating Password",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px;">
            <h2 style="color: #0054e9; margin-top: 0;">Welcome to Master HRMS</h2>
            <p>Hello <strong> Hii || 'Employee'}</strong>,</p>
            <p>Please use the following One-Time Password (OTP) to create your password and set up your account:</p>
            <div style="background: #f4f7fe; padding: 15px; text-align: center; border-radius: 4px; margin: 20px 0;">
              <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #0054e9;">12321</span>
            </div>
            <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">© 2024 Tech Tammina. All rights reserved.</p>
          </div>
        `
    });
}
test();