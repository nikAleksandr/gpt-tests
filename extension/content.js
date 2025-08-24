function getEmailBody() {
  const gmailBody = document.querySelector('.ii.gt');
  if (gmailBody) {
    return gmailBody.innerText;
  }
  return document.body.innerText;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'getEmail') {
    sendResponse({body: getEmailBody()});
  }
});