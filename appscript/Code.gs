/**
 * Classify unread emails and draft replies using OpenAI's GPT.
 *
 * Before running, store your OpenAI API key in Script Properties:
 *   1. In the Apps Script editor, open Project Settings.
 *   2. Under "Script properties" add `OPENAI_API_KEY` with your key.
 * Alternatively, run `setOpenAIKey()` once after replacing the placeholder.
 */

function classifyAndDraft() {
  const key = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!key) {
    throw new Error('Missing OPENAI_API_KEY in Script Properties');
  }
  const threads = GmailApp.search('is:unread', 5);
  threads.forEach(thread => {
    const message = thread.getMessages()[0];
    const body = message.getPlainBody();

    const priorityPrompt = `Classify the priority of this email as high, medium, or low:\n\n${body}`;
    const priority = callOpenAI(key, priorityPrompt);

    const replyPrompt = `Draft a professional reply to this email:\n\n${body}`;
    const draft = callOpenAI(key, replyPrompt);

    GmailApp.createDraft(message.getFrom(), 'Re: ' + message.getSubject(), draft);
    const labelName = 'Priority/' + priority;
    const label = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
    thread.addLabel(label);
    thread.markRead();
  });
}

function callOpenAI(key, prompt) {
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: prompt}],
    temperature: 0.7
  };
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: {Authorization: 'Bearer ' + key}
  });
  const data = JSON.parse(response.getContentText());
  return data.choices[0].message.content.trim();
}

function setOpenAIKey() {
  PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', 'REPLACE_WITH_KEY');
}