Trying to figure some things out with the new app router an setting headers. This is a work in progress and is kinda messy, please bear with me 🐻

## What is this

A quick proof of concept to put the suggestion of "moving the logic for setting headers dynamically based on the route" to the test.

Uses a modified version of `@gdwc/drupal_state` which exposes the headers on `getObject` and `getObjectByPath`. WIP branch is here: https://git.drupalcode.org/project/drupal_state/-/tree/feat/expose-headers

Given the effort in the Drupal JavaScript API Client, I'm not sure this will be added upstream to DrupalState, but this should be easier with the new API Client soon enough!

I am also using a modified version of `@pantheon-systems/cms-kit`. Some of these changes may be proposed to the upstream version. The changes are to `setSurrogateKeyHeader` and only changes the `res` param to be type of `Response` to work with the `NextResponse` type.

For ease of reproducibility, I am including those packages as tarballs in the repo.

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

Yes, there is some duplicate code and there is probably a better way (I thought I could fetch data in middleware and pass that data to the next request? Apparently not.)

1. The data is fetched in middleware based on the page (`/articles` or `/articles/[article slug]`)
2. Middleware rewrites the response to the requested [Page](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
3. The Page is a server component that fetches the data using the same fetch in middleware


In order for content updates to show instantly like they did with `getServerSideProps`, `refresh: true` must be set on the `getObject` call in the Page component meaning the server is hit twice and the built in DrupalState store is not utilized.
