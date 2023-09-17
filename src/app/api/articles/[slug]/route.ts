import { NextRequest, NextResponse } from "next/server";
// import { store } from "@/lib/store";
// import { setSurrogateKeyHeader } from "@pantheon-systems/drupal-kit";
// import { ServerResponse } from "http";

export async function GET(request: NextRequest) {
  return NextResponse.json(await request.json());
}

// export async function GET(
//   request: NextRequest,
//   context: { params: { slug: string } }
// ) {
//   try {
//     console.log(request.headers);
//     console.log("in GET /articles/[slug]", context.params.slug);
//     const result = await store.getObjectByPath<any>({
//       objectName: "node--article",
//       params: "include=field_media_image",
//       res: new Response(),
//       path: `/articles/${context.params.slug}`,
//     });
//     // console.log("result..", result);
//     console.log("result.headers?", result?.headers);

//     if (result) {
//       const headers = result?.headers;
//       if (headers) {
//         console.log("headers", headers);
//         console.log(headers?.get("Surrogate-Key"));
//         const h = setSurrogateKeyHeader(
//           headers.get("Surrogate-Key"),
//           result as unknown as ServerResponse
//         );
//         console.log("setSurrogateKeyHeaders;", h);
//       }
//       const json = await result.json();
//       console.log(json);
//       // console.log(articles)
//       return new Response(JSON.stringify(result.body), {
//         headers: result.headers,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
