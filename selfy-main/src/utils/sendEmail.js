// const SibApiV3Sdk = require("sib-api-v3-sdk");

// const client = SibApiV3Sdk.ApiClient.instance;

// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// async function sendVerificationEmail(to, subject, text) {

//   console.log("FROM =>", process.env.EMAIL_FROM);

//   const emailData = {
//     sender: {
//       name: "Selfy Snap",
//       email: process.env.EMAIL_FROM,
//     },
//     to: [
//       {
//         email: to,
//       },
//     ],
//     subject: subject,
//     textContent: text,
//   };

//   return await apiInstance.sendTransacEmail(emailData);
// }

// module.exports = { sendVerificationEmail };














// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function sendVerificationEmail(to, subject, text) {
//   try {
//     const msg = {
//       to,
//       from: process.env.EMAIL_USER, // verified sender
//       subject,
//       text,
//     };

//     await sgMail.send(msg);

//     console.log("✅ Email sent");
//   } catch (error) {
//     console.error("❌ Email error:", error.response?.body || error.message);
//     throw error;
//   }
// }

// module.exports = { sendVerificationEmail };












// const nodemailer = require("nodemailer");

// // Brevo SMTP Transport
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 2525,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.BREVO_SMTP_KEY,
//   },
// });

// // Send Email Function
// async function sendVerificationEmail(to, subject, text) {
//   try {
//     const mailOptions = {
//       from: `"SelfySnap" <${process.env.EMAIL_FROM}>`,
//       to: to,
//       subject: subject,
//       text: text,

//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>SelfySnap Verification</h2>
//           <p>${text}</p>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log("✅ Email sent successfully");
//     console.log("Message ID:", info.messageId);

//     return info;

//   } catch (error) {
//     console.error("❌ Email sending failed:");
//     console.error(error.message);

//     throw error;
//   }
// }

// module.exports = { sendVerificationEmail };

















// const axios = require('axios');

// async function sendVerificationEmail(to, subject, verificationCode) {
//   try {
//     const apiKey = process.env.BREVO_API_KEY;
//     const fromEmail = process.env.EMAIL_FROM;

//     if (!apiKey || !fromEmail) {
//       throw new Error("Missing BREVO_API_KEY or EMAIL_FROM in environment variables");
//     }

//     const emailData = {
//       sender: { name: "SelfySnap", email: fromEmail },
//       to: [{ email: to }],
//       subject: subject,
//       textContent: `Your Verification Code\n\nPlease use the verification code below to complete your action.\n\nVERIFICATION CODE: ${verificationCode}\n\nThis code expires in 10 minutes for security.`,
//       htmlContent: `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
//   <title>SelfySnap Verification Code</title>
//   <style>
//     /* Responsive styles for email clients that support <style> */
//     @media only screen and (max-width: 600px) {
//       .container { width: 100% !important; }
//       .inner-padding { padding: 24px 16px !important; }
//       .code-box { padding: 16px !important; }
//       .code-number { font-size: 44px !important; letter-spacing: 6px !important; padding: 12px 20px !important; }
//       .header h1 { font-size: 28px !important; }
//       .header p { font-size: 14px !important; }
//       .main-title { font-size: 24px !important; }
//       .desc-text { font-size: 14px !important; }
//     }
//     @media only screen and (max-width: 480px) {
//       .code-number { font-size: 36px !important; letter-spacing: 4px !important; padding: 10px 16px !important; }
//     }
//   </style>
// </head>
// <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f7fc;">
//   <center style="width:100%;table-layout:fixed;">
//     <div class="container" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 35px -10px rgba(0,0,0,0.1);">
      
//       <!-- Header -->
//       <div style="background:linear-gradient(135deg,#5B86E5,#36D1DC);padding:32px 24px;text-align:center;">
//         <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;letter-spacing:-0.5px;">SelfySnap</h1>
//         <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:16px;">Welcome To Selfysnap</p>
//       </div>
      
//       <!-- Main content -->
//       <div class="inner-padding" style="padding:40px 28px;">
//         <h2 class="main-title" style="margin:0 0 12px;color:#1a2a3a;font-size:28px;font-weight:600;text-align:center;">Your Verification Code</h2>
//         <p class="desc-text" style="margin:0 0 24px;color:#5b6f82;font-size:16px;line-height:1.5;text-align:center;">Please use the verification code below to complete your action.</p>
        
//         <!-- BIG VERIFICATION CODE BOX (responsive) -->
//         <div class="code-box" style="background:#f0f4fe;border-radius:20px;padding:24px 20px;margin:28px 0;text-align:center;border:1px solid #d9e3ff;">
//           <div style="font-size:14px;font-weight:600;color:#5B86E5;letter-spacing:1.5px;margin-bottom:16px;">VERIFICATION CODE</div>
//           <div class="code-number" style="font-size:68px;font-weight:800;font-family:'Courier New',monospace;color:#1e3c72;background:white;display:inline-block;padding:16px 32px;border-radius:18px;letter-spacing:10px;box-shadow:0 6px 14px rgba(0,0,0,0.05);">
//             ${verificationCode}
//           </div>
//           <p style="margin:24px 0 0;font-size:13px;color:#7f8c8d;">This code expires in 10 minutes for security.</p>
//         </div>
        
//         <p style="margin:20px 0 0;color:#7f8c8d;font-size:14px;text-align:center;">If you didn't request this code, please ignore this email.</p>
//       </div>
      
//       <!-- Footer -->
//       <div style="background:#f9fbfd;border-top:1px solid #e6edf4;padding:24px;text-align:center;">
//         <p style="margin:0;color:#8e9eae;font-size:12px;">&copy; 2026 SelfySnap. All rights reserved.</p>
//       </div>
//     </div>
//   </center>
// </body>
// </html>`
//     };

//     const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
//       headers: {
//         'api-key': apiKey,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log("✅ Email sent successfully via Brevo API");
//     console.log("Message ID:", response.data.messageId);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Email sending failed:");
//     if (error.response) {
//       console.error("Brevo API Error:", error.response.data);
//     } else {
//       console.error(error.message);
//     }
//     throw error;
//   }
// }

// module.exports = { sendVerificationEmail };







const axios = require("axios");

async function sendVerificationEmail(to, subject, verificationLink, otp = null) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.EMAIL_FROM;

    if (!apiKey || !fromEmail) {
      throw new Error(
        "Missing BREVO_API_KEY or EMAIL_FROM in environment variables"
      );
    }

    /* 🔥 Extract OTP from link if not provided */
    const finalOtp =
      otp || verificationLink?.split("/").pop() || "";

    const emailData = {
      sender: { name: "SelfySnap 💙", email: fromEmail },
      to: [{ email: to }],
      subject: subject || "Welcome to SelfySnap - Verify Your Email",

      textContent: `
Welcome to SelfySnap! 

Thank you for joining our seller community.

Please verify your email by clicking the link below:
${verificationLink}

Your verification code is: ${finalOtp}

This link expires in 24 hours for security.

If you didn't create this account, please ignore this email.

Team SelfySnap
      `.trim(),

      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>Welcome to SelfySnap</title>
  
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  
  <style type="text/css">
    /* Reset */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* Mobile Responsive */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .mobile-padding {
        padding: 24px 20px !important;
      }
      .header-padding {
        padding: 32px 20px !important;
      }
      .header-logo {
        font-size: 30px !important;
      }
      .header-tagline {
        font-size: 13px !important;
      }
      .main-title {
        font-size: 24px !important;
        line-height: 1.3 !important;
      }
      .main-text {
        font-size: 14px !important;
        line-height: 1.6 !important;
      }
      .otp-number {
        font-size: 42px !important;
        letter-spacing: 6px !important;
        padding: 14px 24px !important;
      }
      .otp-label {
        font-size: 11px !important;
      }
      .cta-button {
        font-size: 15px !important;
        padding: 16px 28px !important;
      }
      .footer-text {
        font-size: 11px !important;
      }
      .step-text {
        font-size: 13px !important;
      }
      .divider-or {
        font-size: 12px !important;
      }
    }

    @media screen and (max-width: 400px) {
      .otp-number {
        font-size: 34px !important;
        letter-spacing: 4px !important;
        padding: 12px 18px !important;
      }
      .main-title {
        font-size: 22px !important;
      }
      .cta-button {
        font-size: 14px !important;
        padding: 14px 20px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eef2ff;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer Wrapper -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#eef2ff;padding:20px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">

        <!-- Main Container -->
        <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(79,70,229,0.25);">

          <!-- ══════════════ HEADER ══════════════ -->
          <tr>
            <td align="center" class="header-padding" style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%);padding:40px 32px;text-align:center;">

              <!-- Cute Logo Circle -->
              <div style="display:inline-block;width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;line-height:70px;margin-bottom:14px;">
                <span style="font-size:36px;line-height:70px;"></span>
              </div>

              <!-- Brand Name -->
              <h1 class="header-logo" style="margin:0;color:#ffffff;font-size:36px;font-weight:800;letter-spacing:-1px;text-shadow:0 2px 6px rgba(0,0,0,0.15);">
                SelfySnap
              </h1>

              <!-- Tagline -->
              <p class="header-tagline" style="margin:10px 0 0;color:rgba(255,255,255,0.95);font-size:15px;font-weight:500;">
                 Welcome to our seller family ✨
              </p>
            </td>
          </tr>

          <!-- ══════════════ MAIN CONTENT ══════════════ -->
          <tr>
            <td class="mobile-padding" style="padding:40px 36px 16px;">

              <!-- Greeting -->
              <h2 class="main-title" style="margin:0 0 14px;color:#1e293b;font-size:28px;font-weight:700;text-align:center;line-height:1.3;">
                Hey there! 
              </h2>

              <p class="main-text" style="margin:0 0 28px;color:#64748b;font-size:16px;line-height:1.7;text-align:center;">
                Thanks for signing up as a <strong style="color:#6366f1;">seller</strong> on SelfySnap.
                Just one quick step to verify your email and get started!
              </p>

              <!-- ══════════════ OTP CODE BOX ══════════════ -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
                <tr>
                  <td align="center" style="background:linear-gradient(135deg,#eef2ff 0%,#fce7f3 100%);border-radius:24px;padding:28px 20px;border:2px dashed #c7d2fe;">

                    <!-- Label -->
                    <div class="otp-label" style="font-size:12px;font-weight:800;color:#6366f1;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">
                       Your Verification Code
                    </div>

                    <!-- OTP Box -->
                    <div class="otp-number" style="display:inline-block;font-size:56px;font-weight:800;font-family:'Courier New','Monaco',monospace;color:#1e293b;background:#ffffff;padding:18px 36px;border-radius:20px;letter-spacing:10px;box-shadow:0 8px 20px -4px rgba(99,102,241,0.25);">
                      ${finalOtp}
                    </div>

                    <!-- Expiry Note -->
                    <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;font-weight:500;">
                       Expires in <strong style="color:#f59e0b;">10 minutes</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ══════════════ OR DIVIDER ══════════════ -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:80px;border-bottom:2px dotted #cbd5e1;"></td>
                        <td class="divider-or" style="padding:0 16px;font-size:13px;color:#94a3b8;font-weight:700;letter-spacing:1px;">
                          OR
                        </td>
                        <td style="width:80px;border-bottom:2px dotted #cbd5e1;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ══════════════ CTA BUTTON ══════════════ -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 12px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${verificationLink}" style="height:56px;v-text-anchor:middle;width:280px;" arcsize="28%" stroke="f" fillcolor="#6366f1">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:'Segoe UI',sans-serif;font-size:16px;font-weight:bold;">Verify My Email →</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a href="${verificationLink}" class="cta-button" style="display:inline-block;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:18px 44px;border-radius:16px;letter-spacing:0.3px;box-shadow:0 10px 25px -5px rgba(99,102,241,0.5);text-align:center;">
                       Verify My Email
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p class="main-text" style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;text-align:center;">
                Button not working? Copy & paste this link in your browser:
              </p>

              <!-- Fallback Link -->
              <div style="background:#f8fafc;border-radius:12px;padding:14px 16px;margin:10px 0 0;border:1px solid #e2e8f0;word-break:break-all;">
                <a href="${verificationLink}" style="color:#6366f1;font-size:12px;text-decoration:none;font-weight:500;word-break:break-all;line-height:1.5;">
                  ${verificationLink}
                </a>
              </div>

            </td>
          </tr>

          <!-- ══════════════ WHAT'S NEXT ══════════════ -->
          <tr>
            <td class="mobile-padding" style="padding:8px 36px 40px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 100%);border-radius:20px;border:1px solid #bbf7d0;">
                <tr>
                  <td style="padding:24px 22px;">
                    <p style="margin:0 0 14px;font-size:15px;font-weight:800;color:#166534;">
                       What happens next?
                    </p>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:6px 0;">
                          <span class="step-text" style="font-size:14px;color:#15803d;line-height:1.6;">
                            <strong>1.</strong> &nbsp;Click the verify button above
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span class="step-text" style="font-size:14px;color:#15803d;line-height:1.6;">
                            <strong>2.</strong> &nbsp;Our team reviews your documents <em>(24-48 hrs)</em>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span class="step-text" style="font-size:14px;color:#15803d;line-height:1.6;">
                            <strong>3.</strong> &nbsp;Get approved & start selling! 🎉
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p class="main-text" style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.6;text-align:center;">
                Didn't create this account? You can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- ══════════════ FOOTER ══════════════ -->
          <tr>
            <td align="center" style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 24px;">

              <!-- Social Icons -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 6px;">
                    <div style="width:38px;height:38px;background:#6366f1;border-radius:50%;line-height:38px;text-align:center;">
                      <span style="color:#ffffff;font-size:16px;"></span>
                    </div>
                  </td>
                  <td style="padding:0 6px;">
                    <div style="width:38px;height:38px;background:#ec4899;border-radius:50%;line-height:38px;text-align:center;">
                      <span style="color:#ffffff;font-size:16px;"></span>
                    </div>
                  </td>
                  <td style="padding:0 6px;">
                    <div style="width:38px;height:38px;background:#8b5cf6;border-radius:50%;line-height:38px;text-align:center;">
                      <span style="color:#ffffff;font-size:16px;"></span>
                    </div>
                  </td>
                </tr>
              </table>

              <p class="footer-text" style="margin:18px 0 6px;color:#64748b;font-size:13px;font-weight:600;">
                Team SelfySnap 
              </p>
              <p class="footer-text" style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
                Need help? Email us at
                <a href="mailto:support@selfysnap.com" style="color:#6366f1;text-decoration:none;font-weight:600;">support@selfysnap.com</a>
              </p>
              <p class="footer-text" style="margin:14px 0 0;color:#cbd5e1;font-size:11px;">
                © ${new Date().getFullYear()} SelfySnap. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
        <!-- End Main Container -->

      </td>
    </tr>
  </table>

</body>
</html>`,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent successfully via Brevo");
    console.log("Message ID:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error("❌ Email sending failed:");
    if (error.response) {
      console.error("Brevo API Error:", error.response.data);
    } else {
      console.error(error.message);
    }
    throw error;
  }
}

module.exports = { sendVerificationEmail };