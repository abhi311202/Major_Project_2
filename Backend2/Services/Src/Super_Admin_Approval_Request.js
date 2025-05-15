

export const Super_Admin_Approval_Request_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Super Admin Approval Request</title>
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
      background-color: #2c3e50;
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
    .button {
      display: inline-block;
      margin-top: 25px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #217dbb;
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
    <div class="header">Super Admin Approval Request</div>
    <div class="content">
      <p>Dear Super Admin,</p>
      <p>Admin <span class="admin-name">{adminName}</span> has requested to be granted Super Admin privileges on the Legal AI platform.</p>
      <p>Please review the request and take the appropriate action.</p>
      <a href="#" class="button">Review Request</a>
      <p class="note">Note: This is an auto-generated email. Please do not reply to this message.</p>
    </div>
    <div class="footer">
      &copy; 2025 Legal AI. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
