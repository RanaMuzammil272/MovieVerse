import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const genreId = params.id;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres/${genreId}`);

    if (!res.ok) return { notFound: true };

    const { genre, movies } = await res.json();

    return {
      props: {
        genre,
        movies,
      },
    };
  } catch (err) {
    console.error('Error fetching genre:', err);
    return { notFound: true };
  }
}

export default function GenrePage({ genre, movies }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🎭 {genre.name} Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-700">{movie.title}</h2>
              <p className="text-sm text-gray-600">Release Year: {movie.releaseYear}</p>
              <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
