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
  console.log("1")
  // TODO: when submit is successful, store that in DB 
  checkSubmissionStatus().then(async success => {
    if (success) {
      let problemName = getProblemName();
      console.log("question name: ", problemName);
      chrome.runtime.sendMessage({
        message: 'saveSubmission',
        payload: {
          problem_name: problemName,
          problem_difficulty: 'easy',
          successful: true,
        },
      }, (response) => {
        console.log(response.message);
      });
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

// Function to get the question name
const getProblemName = () => {
  const problemName = document.querySelector('[data-cy="question-title"]').textContent;
  return problemName
};