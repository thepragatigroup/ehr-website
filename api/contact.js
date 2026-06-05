export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, company, phone, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic sanitisation — strip HTML tags before embedding in email
  const clean = (str) => String(str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Express HR Solutions Website <onboarding@resend.dev>',
        to: ['rahul.das@thepragatigroup.com'],
        subject: `New enquiry from ${clean(name)}${company ? ' — ' + clean(company) : ''}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h2 style="color:#1a1a2e">New Enquiry — Express HR Solutions</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${clean(name)}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${clean(company) || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${clean(phone)}</td></tr>
              <tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0">${clean(message) || '—'}</td></tr>
            </table>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
