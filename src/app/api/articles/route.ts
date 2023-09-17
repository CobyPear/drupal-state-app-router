import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { setSurrogateKeyHeader } from "@pantheon-systems/drupal-kit";
import { ServerResponse } from "http";

export async function GET(request: NextRequest) {
  // try {
  //   console.log("request", request);
  //   const result = await store.getObject<Response>({
  //     objectName: "node--article",
  //     params: "include=field_media_image",
  //   });
  //   console.log('result.headers?',result?.headers);
  //   if (result) {
  //     const headers = result?.headers;
  //     // const articles = result;
  //     console.log("headers", headers);
  //     console.log(headers?.get("Surrogate-Key"));
  //     const h = setSurrogateKeyHeader(
  //       headers.get("Surrogate-Key"),
  //       result as unknown as ServerResponse
  //     );
  //     console.log("setSurrogateKeyHeaders;", h);
  //     const json = await result.json();
  //     console.log(json);
  //     // console.log(articles)
  //     return result;
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  // return NextResponse.json();
}
