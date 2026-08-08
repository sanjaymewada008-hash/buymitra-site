# BUYMITRA website

A polished, responsive BUYMITRA product showcase with a lightweight Node.js API and admin catalog workspace. The existing storefront styling and layout are preserved.

## Run locally

Run the API-backed version from this folder:

```text
npm start
```

Then open `http://localhost:3000`. The admin catalog is at `http://localhost:3000/admin.html`.

Opening `index.html` directly still shows the storefront fallback catalog, but admin changes and order creation require the Node server.

## Included

- Responsive premium navy/orange/cream BUYMITRA visual system
- Product range with search and category filters
- Working add-to-bag, quantities, removal and total
- Responsive mobile navigation
- Newsletter form validation and success state
- Marketplace links for Amazon, Flipkart and Meesho
- Accessible labels, focus states and reduced clutter
- Local API-backed products, categories, stock and order creation
- Real food photography loaded lazily for the catalog, with image fallback
- Powder-form product range including mango, pineapple, beetroot, moringa, spinach, ginger and lemon powders
- Admin product list with search, status filtering, add, edit, duplicate and delete
- Automatic discount and stock-status values from the API
- Owner/customer login using email or mobile identifier and session cookies

## Brand asset

The project now includes `buymitra-logo.svg` for the full square BUYMITRA lockup and `buymitra-header-logo.svg` for the compact navigation lockup. Both preserve the supplied navy/orange shopping-cart B, BUYMITRA wordmark and “SHOP SMART, LIVE BETTER” identity. Replace these SVGs with the original exported artwork whenever the production asset file is available.

## Current data layer

`server.js` provides the first incremental backend layer and persists development data in `data/db.json`. It supports product listing/search/pagination, category listing, product create/update/delete, dashboard metrics, and order creation with stock decrement. This is a local development foundation, not yet production authentication/payment/image storage.

## Product photography

The catalog now uses real Unsplash food photographs through the `image` field on each product. Product cards lazy-load those images and fall back to the product emoji if a remote image is unavailable. For production, replace the remote URLs with licensed BUYMITRA product/packaging images in the same `image` field so the brand packaging is represented accurately.

See [PROJECT_AUDIT.md](PROJECT_AUDIT.md) for the complete existing-project audit and staged production roadmap.

## Publish online with Render

The project includes [render.yaml](render.yaml) for a simple Node deployment. Push the `buymitra-site` folder to a GitHub repository, create a new Render Web Service from that repository, and use the included configuration. Set `BUYMITRA_OWNER_USERNAME` and `BUYMITRA_OWNER_PASSWORD` as secret environment variables in Render; do not use the development owner password online. Render will run `npm install`, start the app with `npm start`, and provide a public HTTPS URL.

The current JSON datastore is suitable for a demo but is not durable production storage on free hosting. Before accepting real orders, move products, users and orders to a managed PostgreSQL/Supabase database and add real payment, image storage and HTTPS authentication configuration.

## Login

The local owner account is available for development at `owner@buymitra.local` with password `ChangeMe@123`. Set `BUYMITRA_OWNER_USERNAME` and `BUYMITRA_OWNER_PASSWORD` environment variables before sharing or deploying the app. Customer accounts can be created from the Login page with a valid email/mobile identifier and password.

This local version intentionally does not pretend to provide real Gmail OAuth or SMS OTP. Those require Google OAuth and an SMS provider account/API keys; they should be connected in the production authentication stage.
