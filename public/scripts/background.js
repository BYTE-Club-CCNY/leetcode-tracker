
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'saveSubmission') {
    console.log('saving submission')
    chrome.storage.session.get('userSubmissions', (result) => {
      const userSubmissions = result.userSubmissions || [];
      console.log(userSubmissions)
      userSubmissions.push(request.payload);
      chrome.storage.session.set({ userSubmissions }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ message: 'Failed to save question' });
        } else {
          sendResponse({ message: 'Question saved successfully' });
        }
      });
    });
  }
  return true;
});