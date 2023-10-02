// import { DrupalState } from "@pantheon-systems/drupal-kit";
import { DrupalState } from "@gdwc/drupal-state";

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const { signal } = new AbortController();

  console.log("Using custom fetch...");

  const headers = new Headers(init?.headers);
  headers?.set("Pantheon-SKey", "1");

  // console.log("new headers", headers);

  const settings = { ...init };
  settings.headers = headers;
  // opt out of the request memoization
  // and caching
  settings.cache = "no-cache";
  settings.signal = signal;
  return fetch(input, settings);
};

export const store = new DrupalState({
  apiBase: process.env.BACKEND_URL as string,
  fetchAdapter: customFetch,
  apiPrefix: "jsonapi",
  // defaultLocale: "en",
  debug: true,
  exposeHeaders: true,
  noStore: false,
});
