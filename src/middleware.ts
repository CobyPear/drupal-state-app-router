import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { setSurrogateKeyHeader } from "@pantheon-systems/drupal-kit";
// import { ServerResponse } from "http";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const node = request.nextUrl.pathname;
  console.log("middleware path: ", node);
  if (node.endsWith("/articles")) {
    try {
      const result = await store.getObject({
        objectName: "node--article",
        params: "include=field_media_image",
      });
      console.log("result.headers?", result?.headers);
      if (result) {
        const headers = result?.headers;
        // const articles = result;
        console.log("headers", headers);
        console.log(headers?.get("Surrogate-Key"));
        const h = headers
          ? setSurrogateKeyHeader(headers.get("Surrogate-Key"), headers)
          : null;
        console.log("setSurrogateKeyHeaders;", h);

        return new NextResponse(JSON.stringify(result.data), {
          headers: result.headers,
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const [, slug] = request.nextUrl.pathname.split("/articles/");
      console.log("in GET /articles/[slug]", slug);
      const result = (await store.getObjectByPath({
        objectName: "node--article",
        params: "include=field_media_image",
        path: `/articles/${slug}`,
      })) as { data: any; headers: Headers };
      // console.log("result..", result);
      console.log("result.headers?", result?.headers);

      if (result.data) {
        // const headers = result?.headers;
        // if (headers) {
        //   console.log("headers", headers);
        //   console.log(headers?.get("Surrogate-Key"));
        //   const h = setSurrogateKeyHeader(
        //     headers.get("Surrogate-Key"),
        //     result as unknown as ServerResponse
        //   );
        //   console.log("setSurrogateKeyHeaders;", h);
        // }
        // console.log(articles)
        return new NextResponse(JSON.stringify(result.data), {
          headers: result.headers,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
