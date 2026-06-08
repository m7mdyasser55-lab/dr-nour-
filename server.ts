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

  // API Route: Check Resend Key Status
  app.get("/api/resend-status", (req, res) => {
    const isConfigured = !!process.env.RESEND_API_KEY;
    res.json({
      success: true,
      configured: isConfigured,
      message: isConfigured 
        ? "Resend API is fully configured and ready to dispatch emails." 
        : "RESEND_API_KEY environment variable is not defined."
    });
  });

  // API Route: Test Resend configuration
  app.get("/api/test-resend", async (req, res) => {
    const resend = getResend();
    if (!resend) {
      return res.status(400).json({ 
        success: false, 
        message: "RESEND_API_KEY is not set in environment variables." 
      });
    }

    const targetEmail = (req.query.email as string) || "nour.mohamashaly@gmail.com";

    try {
      const { data, error } = await resend.emails.send({
        from: "Resend Test <onboarding@resend.dev>",
        to: targetEmail,
        subject: "Resend Configuration Test",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
            <h2 style="color: #dc2626;">Resend Active Integration Success!</h2>
            <p>Hello! If you are reading this, your <strong>RESEND_API_KEY</strong> environment secret is configured correctly and functioning.</p>
            <p>This confirmation is part of the diagnostic validation test for Dr. Nour Mashaly Clinic website.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 11px; color: #999;">Diagnostics Dispatched At: ${new Date().toISOString()}</p>
          </div>
        `,
      });

      if (error) {
        return res.status(500).json({ success: false, error });
      }

      res.status(200).json({ success: true, message: `Test email sent successfully to ${targetEmail}`, data });
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

      // 1. Send to Clinic Contacts
      const clinicRecipients = ["nour.mohamashaly@gmail.com", "m7mdyasser55@gmail.com"];
      for (const dest of clinicRecipients) {
        try {
          await resend.emails.send({
            from: "Clinic Notification <onboarding@resend.dev>",
            to: dest,
            subject: subject,
            html: clinicHtml,
          });
          console.log(`Successfully sent clinic notification copy to ${dest}`);
        } catch (clinicErr) {
          console.warn(`Resend failed to notify clinic destination ${dest} directly:`, clinicErr);
        }
      }

      // 2. Send to Patient if email exists and is valid
      if (email && email.includes('@')) {
        try {
          await resend.emails.send({
            from: "Dr. Nour Mashaly Clinic <onboarding@resend.dev>",
            to: email,
            subject: patientSubject,
            html: patientHtml,
          });
        } catch (patientEmailErr: any) {
          console.warn("Failed to send email to patient (could be Resend sandbox restriction):", patientEmailErr);
          // If the email is not one of our known clinic addresses, send a sandbox fallback copy to both clinic address candidates
          if (!clinicRecipients.includes(email)) {
            for (const dest of clinicRecipients) {
              try {
                await resend.emails.send({
                  from: "Dr. Nour Mashaly Clinic <onboarding@resend.dev>",
                  to: dest,
                  subject: `[Sandbox Mirror] ${patientSubject}`,
                  html: `<div style="background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px;">
                    <strong>Note:</strong> This is a mirrored copy of the appointment confirmation email prepared for <strong>${email}</strong>. In the Resend free/sandbox tier, emails can only be delivered to verified sandbox account owners.
                  </div>` + patientHtml,
                });
              } catch (fallbackErr) {
                console.error(`Failed to send sandbox copy to ${dest}:`, fallbackErr);
              }
            }
          }
        }
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
