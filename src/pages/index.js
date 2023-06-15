import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <main>
      <p>{data.results?.length} movies</p>
      <div>
        {data.results.map((movie) => {
          return (
            <article key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <p>{movie.title}</p>
              </Link>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path.original}`}
                alt="..."
                width={400}
                height={400}
                className="w-40"
              />
            </article>
          );
        })}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  let data = {};
  try {
    const result = await axios.get(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/top_rated",
      { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }
    );
    data = result.data;
    console.log(data);
    console.log(data[0].poster_path);
  } catch (error) {
    console.error(error.message);
    console.error(error);
  }
  return { props: { data } };
}
