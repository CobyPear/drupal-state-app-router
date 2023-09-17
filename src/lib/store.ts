// import { DrupalState } from "@pantheon-systems/drupal-kit";
import { DrupalState } from "@gdwc/drupal-state";

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  console.log("Using custom fetch...");

  const headers = new Headers(init?.headers);
  console.log("new headers", headers);
  headers?.set("Fastly-Debug", "1");
  const settings = { ...init };
  settings.headers = headers;
  console.log("headers in custom fetch!!", headers);
  return fetch(input, settings);
};

export const store = new DrupalState({
  apiBase: process.env.BACKEND_URL as string,
  fetchAdapter: customFetch,
  apiPrefix: "jsonapi",
  defaultLocale: "en",
  debug: true,
  exposeHeaders: true,
});
