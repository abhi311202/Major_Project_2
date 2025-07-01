export const Super_Admin_Request_Reject_Email = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Registration Status</title>
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
      background-color: #f44336;
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
    }
    
    .intro-text {
      font-size: 16px;
      margin-bottom: 24px;
      color: #555;
    }
    
    /* Rejection details */
    .rejection-box {
      background-color: #ffebee;
      border-left: 4px solid #f44336;
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 0 4px 4px 0;
    }
    
    .rejection-details {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    
    .rejection-details th {
      text-align: left;
      padding: 8px 0;
      font-weight: 600;
      color: #374151;
      width: 30%;
    }
    
    .rejection-details td {
      padding: 8px 0;
      color: #4b5563;
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
      
      .rejection-details th, 
      .rejection-details td {
        display: block;
        width: 100%;
      }
      
      .rejection-details th {
        padding-bottom: 0;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Super Admin Request Status</h1>
    </div>
    
    <div class="content">
      <p class="intro-text">
        Thank you for your interest in becoming an Super Administrator. We appreciate the time you served as an Admin.
      </p>
      
      <div class="rejection-box">
        <p><strong>Application Status:</strong> <span style="color: #f44336;">Not Approved</span></p>
        
        <table class="rejection-details">
          <tr>
            <th>Name:</th>
            <td>{{name}}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{email}}</td>
          </tr>
          <tr>
            <th>Date Applied:</th>
            <td>{{application_date}}</td>
          </tr>
        </table>
        
     
      </div>
      
      <p>
        While we're unable to approve your request at this time, we encourage you to 
        continue engaging with our platform and consider applying again in the future.
      </p>
      
      <p>
        We wish you the best of luck in your future endeavors and appreciate your 
        understanding of our decision.
      </p>
      
      <p>
        If you have any questions about this decision, please don't hesitate to 
        contact us at <a href="mailto:{{support_email}}">support@legalai.ac.in</a>.
      </p>
    </div>
    
    <div class="footer">
      <p>This is an automated notification. Please do not reply to this email.</p>
      <p>&copy; {{currentYear}} Your Organization. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
