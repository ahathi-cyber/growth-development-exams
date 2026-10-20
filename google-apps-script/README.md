# Google Drive answer collection setup

This folder contains the Google Apps Script receiver used to save each submitted paper as a JSON file in the Drive folder you supplied.

## One-time setup

1. Open [Google Apps Script](https://script.google.com/) while signed in to the Google account that owns or can edit the destination folder.
2. Create a new project and replace the starter code in `Code.gs` with the complete contents of [Code.gs](./Code.gs).
3. Save the project, then choose **Deploy → New deployment → Web app**.
4. Set **Execute as** to your account. For the simple static-site integration to send without a Google sign-in prompt, the web app access must allow anyone to access it. This makes the endpoint public; see the security note below.
5. Click **Deploy**, authorize the requested Drive access, and copy the Web app URL ending in `/exec`.
6. In this repository, edit `google-drive-config.js` and set `window.GOOGLE_DRIVE_SUBMISSION_ENDPOINT` to that URL. Commit the change to deploy the site.
7. Test by submitting a small practice paper and confirm a new `.json` file appears in [the answer collection folder](https://drive.google.com/drive/folders/18G9T22XZ7kno1c3ytl0AnAkfxe3hYsSO).

## What is collected

Each completed paper is sent as one JSON file containing the student ID entered on the site, submission time, topic, paper type, overall score, and the individual student responses. T/F and SBA records include correct answers and marks; essays include the student's written responses and rubric detections. Browser-local history remains as a fallback.

## Security and delivery notes

- The site is static, so the endpoint URL is visible to visitors. A public Apps Script web app that executes as the owner can be abused by outsiders. This starter integration is suitable only if you accept that risk and monitor the folder; for a production student system, use authenticated student sign-in and a protected server-side endpoint.
- Avoid collecting unnecessary personal information. Student IDs and essay responses may be sensitive; restrict folder sharing to authorized staff.
- Browser cross-origin rules prevent the site from reading the Apps Script response reliably, so the page can report that the request was sent but cannot guarantee it was written. Always confirm the first test file in Drive.
- If the web app URL changes after redeployment, update `google-drive-config.js`.
