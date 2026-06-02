import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendInviteEmail(
  email: string,
  workspaceName: string,
  inviteUrl: string
) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: `You're invited to join ${workspaceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>You're invited to join ${workspaceName}</h2>
          <p>You have been invited to collaborate on a workspace. Click the button below to accept the invitation:</p>
          <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">Accept Invitation</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${inviteUrl}</p>
          <p style="color: #666; font-size: 14px; margin-top: 32px;">This invitation will expire in 7 days.</p>
        </div>
      `,
    });

    console.log("[email] Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("[email] Error sending email:", error);
    throw error;
  }
}
