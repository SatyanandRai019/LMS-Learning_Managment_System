import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;