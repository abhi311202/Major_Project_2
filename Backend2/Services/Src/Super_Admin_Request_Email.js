export const Super_Admin_Request_Email = `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Admin Registration Request Notification</title>
  <style>
    /* Reset for email */
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    /* Responsive */
    @media screen and (max-width: 600px) {
      .container {
        width: 95% !important;
        padding: 16px !important;
      }
      .content {
        padding: 20px !important;
      }
      .admin-detail-label {
        width: 120px !important;
      }
      .btn-review {
        width: 100% !important;
      }
    }
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      color: #374151;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container {
      max-width: 600px;
      margin: 48px auto 48px auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      padding: 32px 40px;
    }
    .header {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px solid #10b981;
      position: relative;
    }
    .header h1 {
      font-size: 30px;
      font-weight: 900;
      color: #065f46;
      margin: 0;
      letter-spacing: -0.02em;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }
    /* Material icon style */
    .header h1 svg {
      width: 32px;
      height: 32px;
      fill: #10b981;
      flex-shrink: 0;
    }
    p.intro {
      margin-top: 24px;
      font-size: 18px;
      color: #4b5563;
      text-align: center;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
      font-weight: 500;
      letter-spacing: 0.01em;
    }
    .admin-card {
      margin-top: 32px;
      background: #ecfdf5;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
      border: 1px solid #d1fae5;
      padding: 24px 32px;
      font-size: 17px;
      color: #065f46;
    }
    .admin-card table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 14px;
    }
    .admin-detail-label {
      font-weight: 700;
      color: #065f46;
      width: 150px;
      padding-right: 24px;
      white-space: nowrap;
      vertical-align: middle;
    }
    .admin-detail-value {
      word-wrap: break-word;
      color: #065f46;
      vertical-align: middle;
      font-weight: 500;
    }
    a.email-link {
      color: #059669;
      text-decoration: none;
      font-weight: 600;
    }
    a.email-link:hover,
    a.email-link:focus {
      text-decoration: underline;
    }
    .action-button {
      display: block;
      width: 240px;
      margin: 40px auto 0 auto;
      text-align: center;
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      color: white !important;
      font-weight: 700;
      font-size: 18px;
      text-decoration: none;
      padding: 14px 0;
      border-radius: 32px;
      box-shadow: 0 8px 16px rgba(16, 185, 129, 0.4);
      transition: background 0.3s ease, box-shadow 0.3s ease;
      user-select: none;
      cursor: pointer;
    }
    .action-button:hover,
    .action-button:focus {
      background: linear-gradient(135deg, #047857 0%, #065f46 100%);
      box-shadow: 0 12px 24px rgba(6, 95, 70, 0.6);
      outline: none;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin-top: 48px;
      letter-spacing: 0.02em;
      font-weight: 500;
      user-select: none;
    }
  </style>
</head>
<body>
  <center>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: transparent; padding: 0; margin: 0;">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" style="max-width: 600px; width: 100%;">
            <tr>
              <td>
                <header class="header" role="banner">
                  <h1>
                    <!-- Material Design Icon: person_add -->
                    New Super Admin Request
                  </h1>
                  <p class="intro">A {{name}} has requested for Super Admin Upgradation. Please review the details below and take the necessary action in LegalAI Application.</p>
                </header>
                <section class="admin-card" aria-label="Admin registration details">
                  <table role="presentation" aria-describedby="admin-details-desc">
                    <tbody>
                      <tr>
                        <td class="admin-detail-label">Username:</td>
                        <td class="admin-detail-value">{{username}}</td>
                      </tr>
                      <tr>
                        <td class="admin-detail-label">Name:</td>
                        <td class="admin-detail-value">{{name}}</td>
                      </tr>
                      <tr>
                        <td class="admin-detail-label">Email:</td>
                        <td class="admin-detail-value">
                          <a href="mailto:{{email}}" class="email-link">{{email}}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="admin-detail-label">Profession:</td>
                        <td class="admin-detail-value">{{profession}}</td>
                      </tr>
                      <tr>
                        <td class="admin-detail-label">Organization:</td>
                        <td class="admin-detail-value">{{organization}}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                
                <p style="text-align: center; font-size: 16px; color: #4b5563; margin-top: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
                  If you did not expect this request, please disregard this email or contact support.
                </p>
                <p style="text-align: center; color: #4b5563; font-weight: 600; margin-top: 0; margin-bottom: 0;">
                  Thank you,<br />
                  LegalAI Administration Team
                </p>
              </td>
            </tr>
          </table>
          <div class="footer" role="contentinfo" aria-label="copyright notice">
            &copy; 2024 Your Company. All rights reserved.
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>

`;
