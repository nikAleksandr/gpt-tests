function withEmail(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {type: 'getEmail'}, response => {
      callback(response?.body || '');
    });
  });
}

document.getElementById('classify').addEventListener('click', () => {
  withEmail(body => {
    chrome.runtime.sendMessage({type: 'classify', body}, res => {
      document.getElementById('result').textContent = res.priority || res.error;
    });
  });
});

document.getElementById('draft').addEventListener('click', () => {
  withEmail(body => {
    chrome.runtime.sendMessage({type: 'draft', body}, res => {
      document.getElementById('result').textContent = res.draft || res.error;
    });
  });
});
