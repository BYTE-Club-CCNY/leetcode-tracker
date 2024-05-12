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

  // TODO: when submit is successful, store that in DB 
  checkSubmissionStatus().then(async success => {
    if (success) {
      let questionName = getQuestionName();
      console.log("qwuestion name", questionName);
      chrome.storage.local.get(['submissions'], (result) => {
        let submissions = result.submissions || [];
        submissions.push({
          question: questionName,
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
        });
        chrome.storage.local.set({ 'submissions': submissions });
      });

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

// Function to get the question name
const getQuestionName = () => {
  const questionName = document.querySelector('[data-cy="question-title"]').textContent;
  return questionName
};