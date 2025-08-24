document.getElementById('save').addEventListener('click', () => {
  const key = document.getElementById('apiKey').value;
  chrome.storage.sync.set({openaiApiKey: key});
});

chrome.storage.sync.get(['openaiApiKey'], ({openaiApiKey}) => {
  if (openaiApiKey) {
    document.getElementById('apiKey').value = openaiApiKey;
  }
});