// This file simulates what a backend database/API would return.
// UI components never import this directly — they go through
// src/api/marketplaceApi.js, which is what makes swapping in a real
// backend later a one-file change instead of a rewrite.

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Noise ColorFit Pro 5 Smartwatch',
    image: 'https://picsum.photos/seed/watch1/400/400',
    basePrice: 3499,
    description:
      'AMOLED display, Bluetooth calling, 10-day battery life. Track your fitness and stay connected.',
    variants: [
      { id: 'v1', label: 'Jet Black', extraPrice: 0 },
      { id: 'v2', label: 'Rose Gold', extraPrice: 200 },
    ],
    emiPlanIds: ['e1', 'e2', 'e3'],
  },
  {
    id: 'p2',
    name: 'boAt Airdopes 141 TWS Earbuds',
    image: 'https://picsum.photos/seed/earbuds1/400/400',
    basePrice: 1299,
    description:
      '42H playback, ENx tech for clear calls, IPX4 water resistance.',
    variants: [
      { id: 'v1', label: 'Bold Black', extraPrice: 0 },
      { id: 'v2', label: 'Furious Red', extraPrice: 0 },
    ],
    emiPlanIds: ['e1', 'e2'],
  },
  {
    id: 'p3',
    name: 'Mi Power Bank 3i 20000mAh',
    image: 'https://picsum.photos/seed/powerbank1/400/400',
    basePrice: 1799,
    description: 'Dual-way fast charging, triple output ports.',
    variants: [{ id: 'v1', label: 'Black', extraPrice: 0 }],
    emiPlanIds: ['e1'],
  },
];

// EMI plans are kept independent of products so multiple products can
// reference the same plan (this is how a real lending/EMI backend would work).
export const EMI_PLANS = {
  e1: { id: 'e1', tenureMonths: 3, interestRate: 0, label: 'No-cost EMI' },
  e2: { id: 'e2', tenureMonths: 6, interestRate: 12, label: 'Standard EMI' },
  e3: { id: 'e3', tenureMonths: 12, interestRate: 14, label: 'Standard EMI' },
};

// Simulates network latency + occasional failure, so your loading/error
// states actually get exercised instead of always succeeding instantly.
export function simulateNetwork(data, { failRate = 0.05, delayMs = 900 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Network request failed. Please try again.'));
      } else {
        resolve(data);
      }
    }, delayMs);
  });
}
