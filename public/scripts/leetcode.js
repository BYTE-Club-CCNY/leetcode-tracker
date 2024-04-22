
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
  // const v2SubmitBtn = document.querySelector('[data-e2e-locator="console-submit-button"]');
  if (v1SubmitBtn) {
    observer.disconnect();

    v1SubmitBtn.addEventListener('click', () => listener());
    return;
  }

  // if(v2SubmitBtn && textarea) {
  //   observer.disconnect();

  //   const leetCode = new LeetCodeV2();
  //   v2SubmitBtn.addEventListener('click', () => loader(leetCode));
  //   textarea.addEventListener('keydown', e => submitByShortcuts(e, leetCode));
  //   leetCode.addManualSubmitButton();
  // }
});
setTimeout(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}, 2000);