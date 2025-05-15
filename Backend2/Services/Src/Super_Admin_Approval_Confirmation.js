export const Super_Admin_Approval_Confirmation_Email_Template = `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Approval Confirmation</title>
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
      background-color: #28a745;
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
      background-color: #e9f7ef;
      border-left: 5px solid #28a745;
      padding: 12px 20px;
      margin: 20px 0;
      font-size: 16px;
      font-weight: bold;
      color: #155724;
      border-radius: 4px;
    }
    .button {
      display: inline-block;
      margin-top: 25px;
      background-color: #28a745;
      color: #fff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #218838;
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
    <div class="header">Super Admin Approval Accepted</div>
    <div class="content">
      <p>Dear <span class="admin-name">{name}</span>,</p>
      <p>Congratulations! Your request to become a Super Admin on the Legal AI platform has been approved.</p>
      <div class="highlight">
        You are now officially a Super Admin. Welcome to the Legal AI leadership community!
      </div>
      <p>You can now access all Super Admin features and manage the platform with full privileges.</p>
      <a href="#" class="button">Go to Dashboard</a>
      <p class="note">Note: This is an auto-generated email. Please do not reply to this message.</p>
    </div>
    <div class="footer">
      &copy; 2025 Legal AI. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
