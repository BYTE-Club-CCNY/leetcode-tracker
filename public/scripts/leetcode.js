const listener = () => {
  console.log('submit button clicked');
  const successTag = document.getElementsByClassName('success__3Ai7');
  // sleep 10 seconds
  setTimeout(() => {
    if (successTag.length > 0) {
      console.log(successTag);
      console.log("submitted successfully");
    } else {
      console.log("failed to submit successfully");
    }
  }, 10000);
}

// Use MutationObserver to determine when the submit button elements are loaded
const observer = new MutationObserver(function (_mutations, observer) {
  const v1SubmitBtn = document.querySelector('[data-cy="submit-code-btn"]');
  const v2SubmitBtn = document.querySelector('[data-e2e-locator="console-submit-button"]');
  const textareaList = document.getElementsByTagName('textarea');
  const textarea = textareaList.length === 4 ? textareaList[2] : (textareaList.length === 2 ? textareaList[0] : textareaList[1]);

  if (v1SubmitBtn) {
    observer.disconnect();
    v1SubmitBtn.addEventListener('click', () => listener());
    return;
  }

  if (v2SubmitBtn && textarea) {
    observer.disconnect();
    v2SubmitBtn.addEventListener('click', () => {
      listener();
      checkSubmissionStatus();
    });
    return;
  }
});

// Function to check submission status every second for 10 seconds
const checkSubmissionStatus = () => {
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    const successTag = document.getElementsByClassName('success__3Ai7');
    if (successTag.length > 0) {
      console.log("Submitted successfully");
      clearInterval(interval);
    } else if (attempts >= 10) {
      console.log("Failed to submit successfully after 10 attempts");
      clearInterval(interval);
    }
  }, 1000);
};