# I-PET Fabrics & Styles — Shop Site

A React + TypeScript site for a fabric & tailoring business: browse fabrics
and ready-to-wear clothes, add to cart, and check out via WhatsApp. Includes
a password-protected admin dashboard to manage products, prices, and photos.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Firebase (Firestore for product data, Auth for the admin login)
- Cloudinary (product image uploads — free tier, no card required)
- react-router-dom

**Why not Firebase Storage for images?** As of 2026, Cloud Storage for
Firebase requires the paid Blaze plan (a linked billing card), even though
usage itself would stay free for a small shop site. To avoid forcing that on
you, images are uploaded to Cloudinary instead, which has a genuinely free
tier with no card needed. Firestore (the database) and Firebase Auth (your
admin login) are unaffected by this and stay on Firebase's free Spark plan.

## 1. Set up Firebase (free tier is enough)

1. Go to https://console.firebase.google.com and create a new project.
2. In the project, click **Build > Firestore Database > Create database**.
   Start in **production mode** (we'll add rules below).
3. Click **Build > Authentication > Get started**, enable the
   **Email/Password** sign-in method.
4. Still in Authentication, go to the **Users** tab and manually add one
   user — this is your admin login (e.g. your email + a strong password).
5. Go to **Project settings > General**, scroll to "Your apps", click the
   web icon (`</>`) to register a web app, and copy the config values shown.

## 2. Set up Cloudinary (free, no card required)

1. Go to https://cloudinary.com and create a free account.
2. On your Dashboard, copy your **Cloud name**.
3. Go to **Settings (gear icon) > Upload**, scroll to **Upload presets**,
   click **Add upload preset**.
4. Set **Signing Mode** to **Unsigned**, give it a name (e.g. `tailor_shop`),
   and save.
5. You'll use the cloud name and preset name in `.env` below.

## 3. Configure the project

```bash
cp .env.example .env
```

Paste your Firebase config values and Cloudinary cloud name + upload preset
into `.env`.

Then set your WhatsApp number in `src/lib/whatsapp.ts`:

```ts
export const WHATSAPP_NUMBER = '2348000000000'; // your number, country code, no + or spaces
```

## 4. Firestore security rules

By default, production mode blocks all reads/writes. Since anyone should be
able to *view* products but only your logged-in admin account should be able
to *edit* them, use these rules (Firestore Database > Rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Image uploads go straight to Cloudinary from the browser using the unsigned
upload preset, so there's no separate rule to set up there — anyone with
your cloud name and preset name could technically upload files to your
Cloudinary account, but they can't read, edit, or delete your product data,
and Cloudinary's free tier has generous limits, so this is a fine trade-off
for a small shop site.

## 5. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. The admin dashboard is at `/admin/login`
(there's also a small "Admin" link in the footer).

## 6. Deploy

Any static host works since this is a Vite SPA (Vercel, Netlify, Firebase
Hosting). Remember to add the same environment variables from your `.env`
file to your host's environment variable settings — don't commit `.env`
itself (it's already in `.gitignore`).

**Important for SPA routing**: since this uses client-side routing
(`react-router-dom`), your host needs to redirect all paths to `index.html`.
- **Vercel**: works out of the box.
- **Netlify**: add a `public/_redirects` file containing `/* /index.html 200`.
- **Firebase Hosting**: set `"rewrites": [{ "source": "**", "destination": "/index.html" }]` in `firebase.json`.

## Project structure

```
src/
  admin/          Admin login, dashboard, product form, route guard
  components/     Navbar, Hero, product cards/grid, cart drawer, footer, etc.
  context/        Cart state (persisted to localStorage)
  firebase/       Firebase init, auth helpers, product CRUD + image upload
  lib/            Currency formatting, WhatsApp link builder
  pages/          Home page (assembles all public sections)
  types/          Product & cart TypeScript types
```

## Notes

- Cart persists in the browser's localStorage, so it survives page refreshes
  but is per-device (not synced across devices).
- Checkout doesn't process payment — it builds a WhatsApp message listing
  the order and total, and opens a chat to your number so you can confirm
  and arrange payment manually.
- To add more admin accounts later, just add more users in Firebase
  Authentication — no code changes needed.
