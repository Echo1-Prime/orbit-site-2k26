const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.render('index', { page: 'home' });
});

app.get('/ai-readiness', (req, res) => {
  res.render('ai-readiness', { page: 'ai-readiness' });
});

app.get('/products', (req, res) => {
  res.render('products', { page: 'products' });
});

app.get('/about', (req, res) => {
  res.render('about', { page: 'about' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { page: 'contact' });
});

// ─── Contact form POST → n8n webhook ─────────────────────────────────────────

app.post('/contact', async (req, res) => {
  const { name, email, company, message } = req.body;
  const N8N_WEBHOOK = process.env.N8N_CONTACT_WEBHOOK;

  if (!N8N_WEBHOOK) {
    console.warn('N8N_CONTACT_WEBHOOK not set — form submission not forwarded');
    return res.render('contact', { page: 'contact', success: true });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message, source: 'orbit-site-2k26' }),
    });
  } catch (err) {
    console.error('n8n webhook error:', err.message);
  }

  res.render('contact', { page: 'contact', success: true });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).render('index', { page: 'home' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Orbit site running on http://localhost:${PORT}`);
});

module.exports = app;
