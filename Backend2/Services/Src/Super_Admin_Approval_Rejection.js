export const Super_Admin_Approval_Rejection_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Super Admin Request Status</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f2f4f8;
      color: #333;
    }
    .container {
      max-width: 650px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.1);
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #dc3545;
      color: #ffffff;
      padding: 25px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      line-height: 1.7;
    }
    .content p {
      margin-bottom: 15px;
      font-size: 16px;
    }
    .admin-name {
      font-weight: bold;
      color: #2c3e50;
      font-size: 18px;
    }
    .highlight {
      background-color: #f8d7da;
      border-left: 5px solid #dc3545;
      padding: 12px 20px;
      margin: 20px 0;
      font-size: 16px;
      font-weight: bold;
      color: #721c24;
      border-radius: 4px;
    }
    .note {
      margin-top: 30px;
      font-size: 13px;
      color: #888;
      font-style: italic;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      color: #888;
      font-size: 12px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Super Admin Request Status</div>
    <div class="content">
      <p>Dear <span class="admin-name">{name}</span>,</p>
      <p>We appreciate your interest in joining the Super Admin team on the Legal AI platform.</p>
      <div class="highlight">
        After careful consideration, your request to become a Super Admin has not been approved at this time.
      </div>
      <p>This decision does not reflect your value or contributions to the platform. You are encouraged to continue participating as an Admin and reapply in the future as opportunities arise.</p>
      <p>If you have any questions or would like further feedback, feel free to reach out to our support team.</p>
      <p class="note">Note: This is an auto-generated email. Please do not reply to this message.</p>
    </div>
    <div class="footer">
      &copy; 2025 Legal AI. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
