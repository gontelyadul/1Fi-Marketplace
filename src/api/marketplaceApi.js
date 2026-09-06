// This is the ONLY file that "knows" where data comes from.
// Screens and hooks call these functions and don't care whether the data
// is mocked or coming from a real REST/GraphQL backend.
// To go live: replace the bodies below with real `fetch()` calls, keep the
// function signatures identical, and nothing else in the app needs to change.

import { PRODUCTS, EMI_PLANS, simulateNetwork } from '../data/mockData';

export async function fetchProducts() {
  const data = await simulateNetwork(PRODUCTS);
  return data;
}

export async function fetchProductById(productId) {
  const data = await simulateNetwork(PRODUCTS);
  const product = data.find((p) => p.id === productId);
  if (!product) throw new Error('Product not found.');
  return product;
}

export async function fetchEmiPlansForProduct(productId) {
  const product = await fetchProductById(productId);
  const plans = product.emiPlanIds.map((id) => EMI_PLANS[id]);
  return simulateNetwork(plans, { failRate: 0.05, delayMs: 500 });
}

// Calculates the per-month EMI amount for a given price + plan.
// Simple flat-interest formula — good enough for a mock; note in your
// README that a real system would get this from the backend, not compute
// financial figures on-device.
export function calculateEmiAmount(principal, plan) {
  const totalInterest = (principal * plan.interestRate * (plan.tenureMonths / 12)) / 100;
  const totalPayable = principal + totalInterest;
  return Math.round(totalPayable / plan.tenureMonths);
}
