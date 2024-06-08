// Function to send reminder email
const sendReminderEmail = (email) => {
    // Use any email service API to send an email
    // For demonstration, we'll log the email to the console
    console.log(`Sending reminder email to ${email}`);
    // Example email sending function (replace with actual email sending code)
    /*
    fetch('https://api.emailservice.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        to: email,
        subject: 'LeetCode Reminder',
        text: 'It has been more than two weeks since your last LeetCode submission. Please solve a problem to stay on track.'
      })
    });
    */
  };
  
  // Function to check if any submissions were made in the last two weeks
  const checkSubmissions = () => {
    chrome.storage.local.get(['submissions'], (result) => {
      const submissions = result.submissions || [];
      const now = new Date();
      const twoWeeksAgo = new Date(now);
      twoWeeksAgo.setDate(now.getDate() - 14);
  
      const recentSubmissions = submissions.filter(submission => {
        const submissionDate = new Date(submission.timestamp);
        return submissionDate >= twoWeeksAgo;
      });
  
      if (recentSubmissions.length === 0) {
        // No submissions in the last two weeks, send reminder email
        const userEmail = 'user@example.com'; // Replace with actual user email
        sendReminderEmail(userEmail);
      }
    });
  };
  
  // Set an interval to check submissions every 24 hours
  setInterval(checkSubmissions, 24 * 60 * 60 * 1000);
  
  // Initial check when script is loaded
  checkSubmissions();
  