import { store } from "@/lib/store";
import { setSurrogateKeyHeader2 } from "@pantheon-systems/cms-kit/lib/setSurrogateKeyHeader2.cjs";
import { NextRequest, NextResponse } from "next/server";

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
  if (node.endsWith("/articles")) {
    try {
      const result = await store.getObject({
        objectName: "node--article",
        params: "include=field_media_image",
        refresh: true
      });
      if (result && result.headers) {
        console.log(
          "headers from getObject: ",
          result.headers?.get("surrogate-key")
        );

        const response = new NextResponse(JSON.stringify(result.data));

        setSurrogateKeyHeader2(result.headers?.get("Surrogate-Key"), response);

        console.log(
          "response headers after set: ",
          response?.headers.get("Surrogate-Key")
        );

        response.headers.set("cache-control", "public, s-maxage=600");

        return NextResponse.rewrite(
          new URL("/articles", request.url),
          response
        );
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
        refresh: true
      })) as { data: any; headers: Headers };

      if (result && result.headers) {
        console.log(
          "headers from getObject: ",
          result.headers?.get("surrogate-key")
        );

        const response = new NextResponse(JSON.stringify(result.data));

        setSurrogateKeyHeader2(result.headers?.get("Surrogate-Key"), response);

        response.headers.set("cache-control", "public, s-maxage=600");

        console.log(
          "response headers after set: ",
          response?.headers.get("Surrogate-Key")
        );

        return NextResponse.rewrite(
          new URL(`/articles/${slug}`, request.url),
          response
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}
