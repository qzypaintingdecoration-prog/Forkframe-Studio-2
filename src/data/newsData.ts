export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  sourceUrl: string;
  publishedDate: string;
  category: 'Hospitality Tech' | 'Delivery & Margins' | 'Regulation & FSA' | 'Dining Trends';
  readingTime: string;
  imageKey?: string;
  keyTakeaway: string;
}

export const INDUSTRY_NEWS_DATA: NewsArticle[] = [
  {
    id: 'uk-hospitality-tech-surge',
    title: 'Independent UK Restaurants Accelerate Shift Toward Direct Online Ordering to Combat Marketplace Commissions',
    summary: 'A significant trend across UK dining operators shows rising adoption of proprietary web storefronts and QR digital menus as businesses seek to preserve margins amid high third-party aggregator commissions and cost-of-living pressures.',
    publisher: 'UK Hospitality Review & Sector Report',
    sourceUrl: 'https://www.ukhospitality.org.uk',
    publishedDate: '18 October 2026',
    category: 'Delivery & Margins',
    readingTime: '4 min read',
    imageKey: 'hospitality-technology',
    keyTakeaway: 'Operators saving an estimated 15%–28% in gross revenue by shifting repeat local customers from aggregator apps to direct ordering.',
  },
  {
    id: 'fsa-digital-allergen-compliance',
    title: 'Food Standards Agency Reinforces Digital Allergen Transparency Guidance for Takeaway Platforms',
    summary: 'The Food Standards Agency (FSA) has issued updated recommendations encouraging dining and takeaway venues to deploy clear, standardized digital allergen filtering on mobile and desktop menus to protect customers with severe food hypersensitivities.',
    publisher: 'Food Standards Agency (FSA) Industry Guidance',
    sourceUrl: 'https://www.food.gov.uk',
    publishedDate: '12 October 2026',
    category: 'Regulation & FSA',
    readingTime: '3 min read',
    imageKey: 'digital-menu-design',
    keyTakeaway: 'Digital QR menus that offer instant allergen filtering reduce front-of-house order errors and comply with Natasha’s Law requirements.',
  },
  {
    id: 'british-dining-mobile-pwa',
    title: 'Progressive Web Apps (PWAs) Surpass Native Mobile Apps in Casual Dining Guest Loyalty',
    summary: 'Consumer research indicates UK diners overwhelmingly prefer zero-download web app loyalty programs over downloading dedicated native smartphone apps for individual restaurants and local bakeries.',
    publisher: 'British Hospitality & Retail Tech Monitor',
    sourceUrl: 'https://www.bighospitality.co.uk',
    publishedDate: '04 October 2026',
    category: 'Hospitality Tech',
    readingTime: '5 min read',
    imageKey: 'mobile-digital-experience',
    keyTakeaway: 'Frictionless browser-based loyalty stamps achieve 3.4× higher retention compared to native apps requiring an App Store download.',
  },
  {
    id: 'autumn-winter-roast-trends',
    title: 'The Great British Roast Reimagined: Sunday Dining Spend Reaches Record Midweek Levels',
    summary: 'Gastropubs and modern eateries across London, Manchester, and Edinburgh report guests booking weekend roast tables up to four weeks in advance, driven by enticing high-production social media food creative and transparent online reservations.',
    publisher: 'UK Food & Beverage Insights Quarterly',
    sourceUrl: 'https://www.restaurantonline.co.uk',
    publishedDate: '28 September 2026',
    category: 'Dining Trends',
    readingTime: '4 min read',
    imageKey: 'gourmet-food-campaign',
    keyTakeaway: 'Visual promotions that showcase prime British provenance and artisanal sauces yield a 22% uplift in weekend covers.',
  },
];
