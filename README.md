Trying to figure some things out with the new app router an setting headers. This is a work in progress and is not up to my usual coding standards 😜

## What is this

A quick proof of concept to put the suggestion of "moving the logic for setting headers dynamically based on the route" to the test.

Uses a modified version of `@gdwc/drupal_state` which exposes the headers on `getObject` and `getObjectByPath`. I'll add a link to that code when it's public.

Right now I am passing all of the headers from Drupal on to the browser so the page can be purged from the CDN and the browser will know, allowing content edits in Drupal to show up immediately thanks to SSR and the cache invalidation on the CDN.

## Why?

See:

- https://github.com/vercel/next.js/issues/50914
- https://github.com/vercel/next.js/discussions/54871#discussion-5581212
- https://github.com/vercel/next.js/discussions/52491
- https://github.com/vercel/next.js/discussions/51460

And there are probably a few more related issues/discussions I am missing.

My favorite on the subject so far: https://pilcrow.vercel.app/blog/nextjs-why?s

## Does it work?

I am able to get the Surrogate-Keys passed to the browser but as I expected it's only for the first request and subsequent responses are from the cache which doesn't have the headers. I thought dynamic routes opted out of the cache by default but I'm not understanding that jargon yet. I can probably do something else to opt out of the cache and get the header on every refresh as I expect.
