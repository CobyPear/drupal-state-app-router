
const getData = async () => {
  return await fetch("http://localhost:3000/api/articles");
};

export default async function Page() {
  // console.log(await getData());
  return (
    <>
      <h2>Articles</h2>
      {JSON.stringify(await getData(), null, 2)}
    </>
  );
}
