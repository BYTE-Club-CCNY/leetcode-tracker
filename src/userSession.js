export const retrieveUserSession = async () => {
    await chrome.storage.session.get(["user"]).then(result => {
        console.log("User's session is this" + result);
    })
}

export const storeUserSession = async (userSession) => {
    await chrome.storage.session.set({ "user":userSession }).then(() => {
        console.log("User session stored successfully");
      });
}