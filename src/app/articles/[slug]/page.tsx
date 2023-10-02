import { store } from "@/lib/store";
import { headers } from "next/headers";
import Link from "next/link";

const getData = async (slug: string) => {
  try {
    const result = (await store.getObjectByPath({
      objectName: "node--article",
      params: "include=field_media_image",
      path: `/articles/${slug}`,
      refresh: true,
    })) as { data: any; headers: Headers };
    if (result?.data) return result.data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  return (
    <div>
      surrogate-key headers: {headers().get("surrogate-key")}
      <br />
      <br />
      <Link href="/articles">Back to all articles</Link>
      <br />
      <details>
        <summary>{params.slug} JSON</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
