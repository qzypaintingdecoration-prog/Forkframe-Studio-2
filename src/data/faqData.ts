export interface FAQItem {
  question: string;
  answer: string;
  category: 'Services' | 'Ordering & POS' | 'Pricing & Process' | 'Tools';
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Services',
    question: 'How is Forkframe Studio different from a generic digital agency or DIY website builder?',
    answer: 'Generic agencies use bloated templates and lack understanding of food hospitality margins, kitchen ticket flow, or UK Food Standards Agency allergen legislation. We build bespoke, sub-second high-performance platforms specifically engineered for restaurants, takeaways, and food operators, incorporating direct commission-free ordering, print-ready artwork, and real-time business calculators.',
  },
  {
    category: 'Ordering & POS',
    question: 'How does direct online ordering work without third-party marketplace commissions?',
    answer: 'We deploy an integrated direct checkout directly on your custom web domain. Customer payments process directly into your Stripe or merchant account with standard payment processing fees (typically ~1.4% + 20p), eliminating the 25%–35% commission cuts taken by delivery apps. Orders can be automatically printed on thermal kitchen ticket printers or sent to your kitchen pass screen.',
  },
  {
    category: 'Pricing & Process',
    question: 'What is the typical timeline and cost for a bespoke restaurant website build?',
    answer: 'Most bespoke restaurant and takeaway websites launch within 2 to 4 weeks. Pricing is transparent and scoped based on your specific requirements (such as table booking systems, QR digital menus, or direct ordering integration). We offer both fixed-price project proposals and monthly ongoing management retainers.',
  },
  {
    category: 'Ordering & POS',
    question: 'Can you assist with allergen labelling and UK Natasha’s Law compliance on our digital menus?',
    answer: 'Yes. All digital menus engineered by Forkframe Studio feature built-in UK FSA 14-allergen tagging, vegan/vegetarian toggles, and optional calorie disclosures compliant with UK food labelling legislation.',
  },
  {
    category: 'Tools',
    question: 'Are the commercial calculators and Social Studio on this website free to use?',
    answer: 'Yes. Our Food Cost Calculator, Menu Pricing Matrix, Promotion Planner, and Social Studio are completely free tools provided by Forkframe Studio to support independent UK food business operators in protecting their gross margins.',
  },
  {
    category: 'Services',
    question: 'How do we get started or request an official quotation?',
    answer: 'Click "Request a Quote" anywhere on this site or email us directly at studioforkframe@gmail.com with your venue details and menu objectives. We review your requirements and provide a detailed, itemised proposal within 24 hours.',
  },
];
