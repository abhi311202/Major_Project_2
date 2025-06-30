export const Super_Admin_Request_Accept_Email = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Registration Approved</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f7fa;
    }
    
    /* Container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    /* Header */
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 24px;
      text-align: center;
    }
    
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    
    /* Content */
    .content {
      padding: 24px;
      text-align: center; /* Added to center all content */
    }
    
    .intro-text {
      font-size: 16px;
      margin-bottom: 24px;
      color: #555;
      text-align: left; /* Reset text alignment for paragraphs */
    }
    
    /* Approval details */
    .approval-box {
      background-color: #f8f9fa;
      border-left: 4px solid #4CAF50;
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 0 4px 4px 0;
      text-align: left; /* Reset text alignment for approval box */
    }
    
    .approval-details {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    
    .approval-details th {
      text-align: left;
      padding: 8px 0;
      font-weight: 600;
      color: #374151;
      width: 30%;
    }
    
    .approval-details td {
      padding: 8px 0;
      color: #4b5563;
    }
    
    .approval-details a {
      color: #3f51b5;
      text-decoration: none;
    }
    
    /* Action button */
    .action-button {
      display: inline-block;
      background-color: #4CAF50;
      color: white !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: 500;
      margin: 16px auto; /* Changed to center the button */
      text-align: center;
    }
    
    /* Footer */
    .footer {
      padding: 16px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      background-color: #f9fafc;
    }
    
    /* Responsive */
    @media screen and (max-width: 600px) {
      .email-container {
        border-radius: 0;
      }
      
      .approval-details th, 
      .approval-details td {
        display: block;
        width: 100%;
      }
      
      .approval-details th {
        padding-bottom: 0;
      }
    }

    /* Added wrapper for left-aligned content */
    .left-align {
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Super Admin Request Approved</h1>
    </div>
    
    <div class="content">
      <div class="left-align"> <!-- Wrapper for left-aligned content -->
        <p class="intro-text">
          Congratulations {{admin_name}} ! Your request for being a Super Admin has been approved. You now have access to the Super Admin dashboard.
        </p>
        
        <div class="approval-box">
          <p><strong>Approved by Super Admin:</strong></p>
          <table class="approval-details">
            <tr>
              <th>Name:</th>
              <td>{{superadmin_name}}</td>
            </tr>
            <tr>
              <th>Username:</th>
              <td>{{superadmin_username}}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td><a href="mailto:{{superadmin_email}}">{{superadmin_email}}</a></td>
            </tr>
          </table>
        </div>
        
        <p>You can now log in to the Super Admin dashboard using your admin credentials. Note that you will no longer be able to access the standard admin dashboard with these credentials.

</p>
      </div>
      
      <a href="{{loginLink}}" class="action-button">Super Admin Login</a>
      
      <div class="left-align"> <!-- Wrapper for left-aligned content -->
        <p style="margin-top: 24px;">
          If you have any questions, please contact the super admin at 
          <a href="mailto:{{superadmin_email}}">{{superadmin_email}}</a>.
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated notification. Please do not reply to this email.</p>
      <p>&copy; {{currentYear}} Legal AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
