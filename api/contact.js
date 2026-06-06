const ALLOWED_ORIGINS = [
  'https://www.expresshrsolutions.com',
  'https://expresshrsolutions.com',
  'https://express-hr-solutions-pi.vercel.app',
];

const MAX_LEN = { name: 200, company: 200, phone: 30, message: 2000 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Block requests from unknown origins
  const origin = req.headers.origin || '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, company, phone, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Length limits
  for (const [k, max] of Object.entries(MAX_LEN)) {
    const val = { name, company, phone, message }[k];
    if (val && String(val).length > max) {
      return res.status(400).json({ error: `${k} is too long` });
    }
  }

  // Phone format — digits, spaces, +, -, (), dots only
  if (!/^[+\d\s\-().]{5,30}$/.test(String(phone))) {
    return res.status(400).json({ error: 'Invalid phone number' });
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
      console.error('Resend error:', err?.statusCode, err?.name);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err?.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
