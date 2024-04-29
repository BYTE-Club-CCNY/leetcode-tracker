// Use MutationObserver to determine when the submit button elements are loaded
const observer = new MutationObserver(function (_mutations, observer) {
  const v1SubmitBtn = document.querySelector('[data-cy="submit-code-btn"]');
  const v2SubmitBtn = document.querySelector('[data-e2e-locator="console-submit-button"]');

  if (v1SubmitBtn) {
    observer.disconnect();
    v1SubmitBtn.addEventListener('click', () => listener());
    return;
  }

  if (v2SubmitBtn) {
    observer.disconnect();
    v2SubmitBtn.addEventListener('click', () => listener());
    return;
  }
});

// Function to check submission status every second for 10 seconds
const listener = () => {
  console.log('submit button clicked');

  // TODO: when submit is successful, store that in DB 
  checkSubmissionStatus().then(success => {
    if (success) {
      console.log('submission successful');
    } else {
      console.log('submission failed');
    }
  });
}

// Function to check submission status every second for 10 seconds
const checkSubmissionStatus = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const successTagV1 = document.getElementsByClassName('success__3Ai7');
      const successTagV2 = document.querySelector('[data-e2e-locator="submission-result"]');
      if (successTagV1.length > 0 || successTagV2) {
        clearInterval(interval);
        resolve(true);
      } else if (attempts >= 10) {
        clearInterval(interval);
        resolve(false);
      }
    }, 1000);
  });
};

setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}, 2000);