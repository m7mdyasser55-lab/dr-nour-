import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Lazy initialize Resend to avoid crashing if key is missing
  let resendInstance: Resend | null = null;
  const getResend = () => {
    if (!resendInstance) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.warn("RESEND_API_KEY is not set. Email notifications will be disabled.");
        return null;
      }
      resendInstance = new Resend(apiKey);
    }
    return resendInstance;
  };

  // API Route: Test Resend configuration
  app.get("/api/test-resend", async (req, res) => {
    const resend = getResend();
    if (!resend) {
      return res.status(400).json({ 
        success: false, 
        message: "RESEND_API_KEY is not set in environment variables." 
      });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "Resend Test <onboarding@resend.dev>",
        to: "m7mdyasser55@gmail.com",
        subject: "Resend Configuration Test",
        html: "<strong>If you are reading this, your Resend API secret is working correctly!</strong>",
      });

      if (error) {
        return res.status(500).json({ success: false, error });
      }

      res.status(200).json({ success: true, message: "Test email sent successfully to m7mdyasser55@gmail.com", data });
    } catch (err) {
      res.status(500).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  });

  // API Route: Send Email Notification
  app.post("/api/notify", async (req, res) => {
    const { type, name, email, service, date, time, message } = req.body;
    const resend = getResend();

    if (!resend) {
      return res.status(200).json({ 
        success: false, 
        message: "Email service not configured. Please set RESEND_API_KEY in secrets." 
      });
    }

    try {
      const subject = type === "booking" ? `New Appointment: ${name}` : `New Inquiry: ${name}`;
      const patientSubject = type === "booking" ? `Appointment Confirmed: Dr. Nour Mashaly Clinic` : `Inquiry Received: Dr. Nour Mashaly Clinic`;
      
      const clinicHtml = type === "booking" 
        ? `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: #dc2626;">New Appointment Booking Received</h2>
            <p>You have a new appointment request from your website.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <table style="width: 100%;">
              <tr><td style="font-weight: bold; padding: 5px 0;">Patient Name:</td><td>${name}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Email:</td><td>${email || 'Not provided'}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Service:</td><td>${service}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Date:</td><td>${date}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Time:</td><td>${time}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">This is an automated notification from Dr. Nour Mashaly Clinic Portal.</p>
          </div>
        `
        : `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: #dc2626;">New Inquiry Received</h2>
            <p>You have a new inquiry from your website.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <table style="width: 100%;">
              <tr><td style="font-weight: bold; padding: 5px 0;">Name:</td><td>${name}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Email:</td><td>${email}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0; vertical-align: top;">Message:</td><td>${message}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">This is an automated notification from Dr. Nour Mashaly Clinic Portal.</p>
          </div>
        `;

      const patientHtml = type === "booking"
        ? `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: #dc2626;">Appointment Confirmed</h2>
            <p>Dear ${name}, your booking has been successfully received.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <table style="width: 100%;">
              <tr><td style="font-weight: bold; padding: 5px 0;">Service:</td><td>${service}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Date:</td><td>${date}</td></tr>
              <tr><td style="font-weight: bold; padding: 5px 0;">Time:</td><td>${time}</td></tr>
            </table>
            <p style="margin-top: 20px;">We look forward to seeing you at our clinic.</p>
            <p style="font-size: 12px; color: #666;">Dr. Nour Mashaly Clinic<br/>Smart Village, Building B121</p>
          </div>
        `
        : `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: #dc2626;">Inquiry Received</h2>
            <p>Dear ${name}, thank you for contacting us. We have received your message and will get back to you shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Your Message:</strong></p>
            <p style="color: #444 italic;">"${message}"</p>
            <p style="margin-top: 20px;">Best regards,<br/>Dr. Nour Mashaly Team</p>
          </div>
        `;

      // 1. Send to Clinic
      await resend.emails.send({
        from: "Clinic Notification <onboarding@resend.dev>",
        to: "m7mdyasser55@gmail.com",
        subject: subject,
        html: clinicHtml,
      });

      // 2. Send to Patient if email exists and is valid
      if (email && email.includes('@')) {
        await resend.emails.send({
          from: "Dr. Nour Mashaly Clinic <onboarding@resend.dev>",
          to: email,
          subject: patientSubject,
          html: patientHtml,
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
