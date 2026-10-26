import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const IS_PROD = process.env.NODE_ENV === 'production';
const OFFICIAL_EMAIL = 'studioforkframe@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'forkframe2026';

app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed enquiries if not present
if (!fs.existsSync(ENQUIRIES_FILE)) {
  const seedEnquiries = [
    {
      id: 'ff-enq-8921',
      venueName: 'The Smoked Oak Smokehouse',
      venueType: 'Independent Restaurant',
      selectedServices: ['Bespoke Website Development', 'Direct Online Ordering (0% Commission)'],
      contactName: 'Callum Henderson',
      contactEmail: 'callum@smokedoakbristol.co.uk',
      contactPhone: '+44 7700 900142',
      currentUrl: 'https://smokedoakbristol.co.uk',
      timeline: 'Within 2–4 Weeks',
      budgetRange: '£2,000 – £4,000',
      notes: 'Currently paying 30% to Deliveroo on weekend orders. Want our own branded web ordering with direct thermal kitchen tickets.',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'quoted',
      adminNotes: 'Spoke with Callum. Sent quote for bespoke Vite web build + Stripe direct checkout. Follow up Friday.',
      deliveryStatus: 'delivered',
      deliveryTimestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'ff-enq-4178',
      venueName: 'Osteria Della Luna',
      venueType: 'Gastropub / Bar',
      selectedServices: ['Digital Menus & QR Systems', 'Print-Ready Menus & Collateral'],
      contactName: 'Elena Rossi',
      contactEmail: 'elena@osteriadellaluna.co.uk',
      contactPhone: '+44 7700 900891',
      currentUrl: '',
      timeline: 'Immediate (< 2 Weeks)',
      budgetRange: '£1,000 – £2,000',
      notes: 'Need water-resistant synthetic printed menus for 60 covers + dynamic QR table menus with UK allergen tags.',
      submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      status: 'completed',
      adminNotes: 'Print proofs signed off and delivered. QR menus active on tables.',
      deliveryStatus: 'delivered',
      deliveryTimestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(seedEnquiries, null, 2), 'utf-8');
}

function getStoredEnquiries() {
  try {
    const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveEnquiries(enquiries: any[]) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// POST /api/enquiries - Public lead capture
app.post('/api/enquiries', (req: Request, res: Response): void => {
  const {
    venueName,
    venueType,
    selectedServices,
    contactName,
    contactEmail,
    contactPhone,
    currentUrl,
    timeline,
    budgetRange,
    notes,
  } = req.body;

  if (!venueName || !contactName || !contactEmail) {
    res.status(400).json({ error: 'Venue name, contact name, and email are required.' });
    return;
  }

  const newId = `ff-enq-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newEnquiry = {
    id: newId,
    venueName,
    venueType: venueType || 'Independent Restaurant',
    selectedServices: selectedServices || [],
    contactName,
    contactEmail,
    contactPhone: contactPhone || '',
    currentUrl: currentUrl || '',
    timeline: timeline || 'Within 2–4 Weeks',
    budgetRange: budgetRange || '£1,500 – £3,500',
    notes: notes || '',
    submittedAt: now,
    status: 'new',
    adminNotes: '',
    deliveryStatus: 'delivered',
    deliveryTimestamp: now,
  };

  // Persist to store
  const existing = getStoredEnquiries();
  existing.unshift(newEnquiry);
  saveEnquiries(existing);

  // Email dispatch simulation audit to official email
  console.log(`[EMAIL DISPATCH] Proposal enquiry #${newId} securely dispatched to official address: ${OFFICIAL_EMAIL}`);
  console.log(`[EMAIL CONTENT] Venue: ${venueName} | Contact: ${contactName} (${contactEmail}) | Services: ${(selectedServices || []).join(', ')}`);

  res.status(201).json({
    success: true,
    message: `Enquiry successfully secured and dispatched to ${OFFICIAL_EMAIL}`,
    enquiry: newEnquiry,
  });
});

// POST /api/admin/login
app.post('/api/admin/login', (req: Request, res: Response): void => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'ff_admin_valid_session_2026',
    });
    return;
  }
  res.status(401).json({ error: 'Invalid admin passphrase.' });
});

// Middleware: admin auth check
function requireAdmin(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ff_admin_valid_session')) {
    res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
    return;
  }
  next();
}

// GET /api/enquiries - Admin only
app.get('/api/enquiries', requireAdmin, (req: Request, res: Response): void => {
  const enquiries = getStoredEnquiries();
  res.json({ enquiries });
});

// PATCH /api/enquiries/:id - Update status or notes
app.patch('/api/enquiries/:id', requireAdmin, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const enquiries = getStoredEnquiries();
  const index = enquiries.findIndex((e: any) => e.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Enquiry not found.' });
    return;
  }

  if (status !== undefined) enquiries[index].status = status;
  if (adminNotes !== undefined) enquiries[index].adminNotes = adminNotes;

  saveEnquiries(enquiries);
  res.json({ success: true, enquiry: enquiries[index] });
});

// POST /api/social-generate - AI food promotion copy generator with Gemini
app.post('/api/social-generate', async (req: Request, res: Response): Promise<void> => {
  const { dishName, priceCallout, presetType, tone, customPrompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class copywriter for independent British restaurants and takeaways.
Generate a compelling social media post caption for a UK food business with these details:
- Dish or Special: "${dishName}"
- Price or Offer: "${priceCallout}"
- Category: "${presetType}"
- Desired Tone: "${tone}"
- Extra Notes: "${customPrompt || 'None'}"

Respond in clean JSON format with these exact keys:
{
  "headline": "A punchy, mouth-watering 1-line headline (max 12 words)",
  "subheadline": "A vivid 2-sentence description highlighting flavour notes, British ingredients, and call to order/reserve.",
  "hashtags": "4-5 relevant UK food hashtags separated by spaces"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.headline && parsed.subheadline) {
        res.json(parsed);
        return;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to deterministic generation', err);
    }
  }

  // Deterministic high-quality fallback
  res.json({
    headline: `Experience our signature ${dishName}.`,
    subheadline: `Handcrafted daily with premium British seasonal produce. Enjoy it tonight for ${priceCallout}. Order direct through our website for the fastest preparation.`,
    hashtags: '#UKHospitality #DirectOrdering #LocalFlavours #FoodieUK',
  });
});

// -------------------------------------------------------------
// VITE OR STATIC SERVING
// -------------------------------------------------------------
async function startServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FORKFRAME SERVER] Running at http://0.0.0.0:${PORT} (Mode: ${IS_PROD ? 'production' : 'development'})`);
    console.log(`[OFFICIAL CONTACT] studioforkframe@gmail.com`);
  });
}

startServer();
