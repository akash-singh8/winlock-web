import nodemailer from "nodemailer";

const mailContent = {
  subscription: {
    subject: "Welcome to Winlock Updates!",
    text: `Dear Valued Subscriber,

        Thank you for subscribing to Winlock updates.

        We're excited to share our latest news, exclusive offers, and product updates with you. Stay tuned for more information on how Winlock continues to secure your folders with cutting-edge, in-place encryption.

        If you have any questions or need further assistance, feel free to reach out.

        Best regards,
        The Winlock Team`,
    html: `<div class="container">
          <div class="header">
            <h2>Welcome to Winlock Updates!</h2>
          </div>
          <div class="content">
            <p>Dear Valued Subscriber,</p>
            <p>Thank you for subscribing to Winlock updates. We're thrilled to have you on board and excited to share our latest news, exclusive offers, and product updates with you.</p>
            <p>Stay tuned for regular updates and be among the first to hear about new features and security enhancements designed to keep your folders safe with in-place encryption.</p>
            <p>If you have any questions or need further assistance, feel free to reach out.</p>
            <p>Best Regards,<br>The Winlock Team</p>
          </div>
          <div class="footer">
            <p><strong>Winlock</strong></p>
            <p>Secure your folders with passwords using in-place encryption—no file moving needed.</p>
          </div>
        </div>`,
  },
  purchase: {
    subject: "Your Winlock Purchase & Activation Key",
    text: (plan: string, key: string) => `Dear Valued Customer,

        Thank you for purchasing the ${plan} plan of Winlock.

        Your Activation Key: ${key}

        If you have any questions, feel free to contact us.

        Best regards,
        The Winlock Team`,
    html: (plan: string, key: string) => `
    <div class="container">
          <div class="header">
            <h2>Welcome to Winlock!</h2>
          </div>
          <div class="content">
            <p>Dear Valued Customer,</p>
            <p>Thank you for purchasing the <strong>${plan}</strong> plan of Winlock. Please find your activation key below. Keep it safe and secure!</p>
            <div class="activation-key">
              ${key}
            </div>
            <p>If you have any questions or need support, feel free to reach out to us.</p>
            <p>Best Regards,<br> The Winlock Team</p>
          </div>
          <div class="footer">
            <p><strong>Winlock</strong></p>
            <p>Secure your folders with passwords using in-place encryption—no file moving needed.</p>
          </div>
        </div>`,
  },
};

const sendEmail = async (
  email: string,
  isPurchase: boolean,
  plan?: string,
  key?: string
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASS,
    },
  });

  const mailOptions = {
    from: `"Winlock" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: isPurchase
      ? mailContent.purchase.subject
      : mailContent.subscription.subject,
    text: isPurchase
      ? mailContent.purchase.text(plan!, key!)
      : mailContent.subscription.text,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Winlock Activation Key</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #007BFF, #00C6FF);
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
          }
          .content {
            padding: 20px;
            color: #555;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
          }
          .activation-key {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px dashed #007BFF;
            text-align: center;
            font-size: 18px;
            letter-spacing: 1px;
            word-break: break-all;
          }
          .footer {
            background-color: #faf8f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        ${
          isPurchase
            ? mailContent.purchase.html(plan!, key!)
            : mailContent.subscription.html
        }
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Successfully sent email to ${email}, isPurchase? ${isPurchase}`
    );
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendEmail;
