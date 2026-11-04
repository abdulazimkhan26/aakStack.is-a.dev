import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = 'aakstackdev@gmail.com';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const str = v => (typeof v === 'string' ? v : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const body = req.body || {};
  const name = str(body.name), email = str(body.email), mobile = str(body.mobile).trim();
  const subject = str(body.subject), message = str(body.message);
  const valid =
    name.trim().length >= 2 &&
    (mobile === '' || /^\+?[\d\s()-]{8,16}$/.test(mobile)) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) &&
    subject.trim().length >= 3 &&
    message.trim().length >= 10 &&
    message.length <= 5000;
  if (!valid) return res.status(400).json({ success: false, message: 'Invalid input' });

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: TO,
    replyTo: email.trim(),
    subject: `Portfolio: ${subject.trim()}`,
    html: `
      <h3>Name: ${esc(name)}</h3>
      <p><b>Email: </b> ${esc(email)}</p>
      ${mobile ? `<p><b>WhatsApp: </b> ${esc(mobile)}</p>` : ''}
      <p><b>Subject: </b> ${esc(subject)}</p>
      <p>Message: ${esc(message).replace(/\n/g, '<br>')}</p>`,
  });

  if (error) return res.status(500).json({ success: false, message: 'Send failed' });
  return res.status(200).json({ success: true });
}
