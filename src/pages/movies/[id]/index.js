import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Home({ movie }) {
  return (
    <main>
      <p>Movie</p>
      <div>
        <p>{movie.title}</p>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path.original}`}
          alt="..."
          width={400}
          height={400}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  let movie = {};
  try {
    const result = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movie/${context.params.id}`,
      { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }
    );
    movie = result.data;
    console.log("Movie:", movie);
  } catch (error) {
    console.error(error.message);
  }
  return { props: { movie } };
}
