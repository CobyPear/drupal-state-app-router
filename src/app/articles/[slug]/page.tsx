const getData = async (slug: string) => {
  console.log(slug)
  return await fetch(`http://localhost:3000/api/articles/${slug}`);
};

export default async function Page({ params }: { params: { slug: string } }) {
  // console.log(await getData(params.slug));
  return (
    <>
      <h2>{params.slug}</h2>
    </>
  );
}
