import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(
  email: string,
  workspaceName: string,
  inviteUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
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

    if (error) {
      console.error("[email] Failed to send email:", error);
      throw error;
    }

    console.log("[email] Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("[email] Error sending email:", error);
    throw error;
  }
}
