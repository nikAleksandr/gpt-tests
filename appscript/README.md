# GPT Gmail Assistant (Google Apps Script)

This repository contains a sample [Google Apps Script](https://developers.google.com/apps-script/) that uses OpenAI's GPT models to prioritize unread emails and draft replies directly in Gmail.

## Setup

1. Create a new Apps Script project at [script.google.com](https://script.google.com/).
2. Copy the contents of the `appscript/` directory into your project (`Code.gs` and `appsscript.json`).
3. In the Apps Script editor, open **Project Settings** and add a script property named `OPENAI_API_KEY` with your OpenAI key (or run `setOpenAIKey()` after editing the placeholder).
4. Run `classifyAndDraft` once and grant the required Gmail permissions.

## Usage

Running `classifyAndDraft` will:

- Retrieve up to five unread emails.
- Ask GPT to label each email as high, medium, or low priority.
- Generate a suggested reply and save it as a Gmail draft.
- Apply a `Priority/<level>` label and mark the thread as read.

Adjust the search query, prompts, or label handling to suit your workflow.