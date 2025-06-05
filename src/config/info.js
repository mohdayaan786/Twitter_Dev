// rootRoute.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const routes = [
    { method: 'POST', path: 'api/v1/tweets',          note: 'Create a tweet (auth, optional image upload)' },
    { method: 'POST', path: 'api/v1/tweets/retweet',  note: 'Retweet an existing tweet (auth)' },
    { method: 'GET',  path: 'api/v1/tweet',           note: 'Get tweet by ID' },
    { method: 'POST', path: 'api/v1/likes/toggle',    note: 'Toggle like/unlike on a tweet (auth)' },
    { method: 'POST', path: 'api/v1/comments',        note: 'Create a comment (auth)' },
    { method: 'POST', path: 'api/v1/signup',          note: 'Register a new user account' },
    { method: 'POST', path: 'api/v1/signin',          note: 'Log in and receive JWT' },
    { method: 'GET',  path: 'api/v1/tweets/image',    note: 'Fetch an uploaded tweet image by filename' },
  ];

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>API Reference</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; background:#f9fafb; }
      h1  { margin-top: 0; }
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: .6rem .8rem; border: 1px solid #e5e7eb; text-align: left; }
      th { background: #f3f4f6; font-weight: 600; }
      tr:nth-child(even) { background: #fafafa; }
      code { background:#f3f3f3; padding:2px 4px; border-radius:4px; font-size:90%; }
      @media (prefers-color-scheme: dark) {
        body   { background:#0d1117; color:#d0d7de; }
        th, td { border-color:#30363d; }
        th     { background:#161b22; }
        tr:nth-child(even) { background:#161b22; }
        code   { background:#30363d; }
      }
    </style>
  </head>
  <body>
    <h1>Welcome to my Twitter API</h1>
    <p>This service exposes the following endpoints:</p>
    <table>
      <thead>
        <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${routes.map(r => `
          <tr>
            <td><code>${r.method}</code></td>
            <td><code>${r.path}</code></td>
            <td>${r.note}</td>
          </tr>`).join('')}
      </tbody>
    </table>
    <h3>Open Postman and Explore these API's to see their functioning.</h3>
  </body>
  </html>`;

  res.type('html').send(html);
});

module.exports = router;