import { store } from "@/lib/store";
import { headers } from "next/headers";
import Link from "next/link";

const getData = async () => {
  try {
    const result = await store.getObject({
      objectName: "node--article",
      params: "include=field_media_image",
    });
    if (result?.data)
      return result.data as {
        title: string;
        path: { alias: string };
      }[];
  } catch (error) {
    console.error(error);
  }
};

export default async function Page() {
  const data = await getData();
  return (
    <div>
      surrogate-key headers: {headers().get("surrogate-key")}
      <br />
      <br />
      <h2>Articles</h2>
      <br />
      <br />
      {data &&
        data.length > 0 &&
        data?.map((d, i) => (
          <Link key={i} href={d.path.alias}>
            {d.title}
          </Link>
        ))}
        <br />
        <br />
      <details>
        <summary>all articles JSON</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
