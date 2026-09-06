# 1Fi Marketplace — SDE Intern Assignment

A React Native (Expo) implementation of the "1Fi Marketplace" section added to
the Shop page, as per the assignment spec.

## Setup

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone, or press `a` to launch
an Android emulator if you have Android Studio set up.

## What's implemented

- **Shop page** with three tabs: Top Brands, Nearby Stores (both blank
  placeholders per spec), and 1Fi Marketplace (fully implemented).
- **Product listing**: grid of products with image, name, price.
- **Product detail screen**: full product info, variant selection, EMI plan
  selection, and a CTA to proceed.
- **Mock data layer**: product/EMI data is never hardcoded into UI
  components. It flows through `src/api/marketplaceApi.js`, which is the
  single place that would be swapped for a real backend integration.
- **Loading & error states**: every async operation (product fetch, EMI
  plan fetch) has explicit loading, error (with retry), and empty states,
  handled via a shared `useAsync` hook.

## Architecture

```
App.js                          — navigation root
src/
  theme/colors.js               — design tokens (colors, spacing, type)
  data/mockData.js              — mock "database" + simulated network delay
  api/marketplaceApi.js         — data access layer (swap for real API here)
  hooks/useAsync.js             — reusable loading/error/data state hook
  components/
    ProductCard.js              — reusable listing card
    EmiPlanCard.js               — reusable EMI plan selector
    StateView.js                — shared loading/error/empty UI
  screens/
    ShopScreen.js                — tab container
    MarketplaceListScreen.js    — product grid
    ProductDetailScreen.js      — product + EMI + CTA
```

## Design decisions

- **Why React Native/Expo**: fast to iterate on and preview directly on a
  device without native build tooling, while still producing a real,
  runnable mobile app.
- **Why a separate API layer**: decouples UI from data source. Swapping
  mock data for a real backend means changing only `marketplaceApi.js`.
- **EMI calculation**: computed client-side with a simple flat-interest
  formula for demo purposes. In production this would come from the
  backend to ensure consistency and avoid exposing business logic
  client-side.
- **State management**: kept intentionally simple (React hooks + a shared
  `useAsync` hook) since the app's scope doesn't yet need global state
  (Redux/Zustand). This is called out as a explicit trade-off, not an
  oversight.

## Known limitations / next steps

- Colors/spacing in `theme/colors.js` are placeholders — should be updated
  to match the real 1Fi brand palette exactly.
- No persistent cart/checkout flow — CTA currently shows a confirmation
  alert, since checkout was out of scope per the assignment brief.
- Images are placeholder URLs (picsum.photos) standing in for a real
  product image CDN.
