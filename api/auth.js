export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: (process.env.GITHUB_CLIENT_ID || '').trim(),
    scope: 'repo,user',
  });
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
