# Gatlinburg Adventure Cabins: to-do

Last updated: 2026-11-23

## Later (agreed, not started)
- [ ] **Smoky Mountain Guide in the weblaucher admin**, so Kendra can write and edit posts herself.
  Copy Vacay's setup (`vacaytothesmokies/lib/cms.ts`, `lib/blog-cms.ts`): add this site to the admin
  panel, set `ADMIN_PANEL_API_URL` / `ADMIN_PANEL_API_KEY`, fetch posts from the admin and keep
  `data/guide.ts` as the fallback when the admin is unreachable.

## Waiting on Kendra
- [ ] **Arrival booklet** (not attached to her message). Fills every `[PLACEHOLDER]` in `data/arrival.ts`,
  plus a photo of each turn in `public/images/arrival/`.
- [ ] **Cabin descriptions**, one per cabin (all studios share the same text for now).
- [ ] **Akia `hotel_name`**: confirm "Creekwalk Inn and Cabins" is right for this site (`components/layout/AkiaChat.tsx`).
- [ ] **Specials**: which packages and add-ons are still offered, prices, seasonal offers (`data/specials.ts`).
- [ ] **Guide posts**: review the four drafts in `data/guide.ts`; re-check park details against nps.gov.
- [ ] **Guest reviews**: real reviews with permission (Google, Airbnb, VRBO etc.) for `data/reviews.ts`.
  The /reviews page and footer link appear once there is at least one review.
- [ ] **Drive times** in `data/site.ts` (`nearby`).
- [ ] **Social links** (Facebook, Instagram), if any, for the contact page and footer.

## Before launch
- [ ] **Resend for the contact form**: add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`
  (a domain verified in Resend) to the host. Without the key, the form runs in demo mode and sends nothing.
- [ ] Redeploy kendra.weblaucher.com for Kendra's review.
- [ ] Kendra to change the website link in WebRez from creekwalkinn.com to agatlinburgcabin.com.
- [ ] Send Kendra the arrival guide link (`/arrival-wf7k2m`) once it's filled in, for her WebRez confirmation email.
- [ ] Final pass: every page at 375 / 768 / 1024 / 1440, Lighthouse, booking links through to WebRez.
- [ ] Point agatlinburgcabin.com at the new site; check the old-URL redirects in `next.config.ts`.
