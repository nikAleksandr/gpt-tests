chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'classify' || msg.type === 'draft') {
    chrome.storage.sync.get(['openaiApiKey'], ({openaiApiKey}) => {
      if (!openaiApiKey) {
        sendResponse({error: 'Set API key in extension options.'});
        return;
      }

      const prompt = msg.type === 'classify'
        ? `Classify priority of this email: \n${msg.body}\nPriority (high/medium/low):`
        : `Draft a professional reply to the following email:\n${msg.body}`;

      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{role: 'user', content: prompt}],
          temperature: 0.5
        })
      })
        .then(r => r.json())
        .then(data => {
          const content = data.choices?.[0]?.message?.content?.trim() || '';
          if (msg.type === 'classify') {
            sendResponse({priority: content});
          } else {
            sendResponse({draft: content});
          }
        })
        .catch(err => sendResponse({error: err.message}));
    });
    return true; // indicates async response
  }
});