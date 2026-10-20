/**
 * Final MBBS student answer collection receiver.
 * Deploy this project as a Web App that executes as the folder owner.
 *
 * IMPORTANT: "Anyone" access makes this endpoint public. Do not use this basic
 * endpoint for sensitive personal data; add authenticated access / abuse
 * protection before using it with real student identifiers.
 */
const ANSWER_FOLDER_ID = '18G9T22XZ7kno1c3ytl0AnAkfxe3hYsSO';

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
    if (!raw || raw.length > 500000) {
      return jsonResponse({ ok: false, error: 'Missing or oversized submission' });
    }
    const submission = JSON.parse(raw);
    if (!submission || typeof submission !== 'object' ||
        !submission.submissionId || !submission.topic || !submission.mode ||
        !Array.isArray(submission.responses)) {
      return jsonResponse({ ok: false, error: 'Invalid submission format' });
    }

    const folder = DriveApp.getFolderById(ANSWER_FOLDER_ID);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeId = String(submission.studentId || 'student')
      .replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) || 'student';
    const filename = timestamp + '_' + safeId + '_' +
      String(submission.topicKey || 'quiz').replace(/[^a-zA-Z0-9_-]/g, '_') +
      '_' + String(submission.mode).replace(/[^a-zA-Z0-9_-]/g, '_') +
      '_' + String(submission.submissionId).replace(/[^a-zA-Z0-9_-]/g, '_') +
      '.json';

    folder.createFile(filename, JSON.stringify(submission, null, 2), MimeType.PLAIN_TEXT);
    return jsonResponse({ ok: true, submissionId: submission.submissionId, filename: filename });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message || err) });
  }
}

function doGet() {
  return jsonResponse({
    ok: true,
    service: 'Final MBBS answer collection receiver',
    folderId: ANSWER_FOLDER_ID
  });
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
