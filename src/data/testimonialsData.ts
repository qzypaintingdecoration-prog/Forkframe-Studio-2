export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  venue: string;
  location: string;
  metric: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    quote: 'Forkframe built our direct web ordering platform in less than three weeks. We have shifted 40% of our Friday takeaway volume away from third-party delivery apps, saving over £1,400 every single month in commission fees.',
    author: 'Callum Henderson',
    role: 'Founder & Head Chef',
    venue: 'The Smoked Oak Smokehouse',
    location: 'Bristol, UK',
    metric: '£1,400+ Monthly Commission Saved',
  },
  {
    id: '2',
    quote: 'The digital QR menus transformed our table turnover on busy Saturday evenings. Guests love the clean allergen filters, and our average spend per table jumped by 18% because the dessert and craft beer highlights look irresistible.',
    author: 'Elena Rossi',
    role: 'General Manager',
    venue: 'Osteria Della Luna',
    location: 'Manchester, UK',
    metric: '+18% Higher Spend Per Cover',
  },
  {
    id: '3',
    quote: 'Having the free food cost calculator and menu engineering tools readily available helped us re-cost our winter menu with surgical precision. Their design aesthetic is in a completely different league to generic web agencies.',
    author: 'Tariq Al-Mansoor',
    role: 'Operations Director',
    venue: 'Levant Street Kitchen',
    location: 'Shoreditch, London',
    metric: 'Sub-Second Page Load Speeds',
  },
];
