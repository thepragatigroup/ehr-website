export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: (process.env.GITHUB_CLIENT_ID || '').trim(),
      client_secret: (process.env.GITHUB_CLIENT_SECRET || '').trim(),
      code,
    }),
  });

  const { access_token, error } = await r.json();
  if (error || !access_token) return res.status(400).send(error || 'OAuth failed');

  const token = access_token.trim();
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({ token: ${JSON.stringify(token)}, provider: 'github' }),
          e.origin
        );
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`);
}
