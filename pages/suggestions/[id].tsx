export default function Detail({ data }) {
  console.log(data);
  return <h1>details</h1>;
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/suggestions");
  const data = await res.json();

  const paths = data.map((suggestion) => ({
    params: { id: suggestion.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:4000/suggestions/${params.id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
