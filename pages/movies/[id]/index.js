export async function getServerSideProps({ params }) {
  const movieRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${params.id}`);
  if (!movieRes.ok) return { notFound: true };

  const movie = await movieRes.json();

  const [directorRes, genreRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/directors/${movie.directorId}`),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`),
  ]);

  const directorData = await directorRes.json();
  const genresData = await genreRes.json();
  const genre = genresData.find(g => g.id === movie.genreId);

  return {
    props: {
      movie,
      director: directorData,
      genre: genre || null,
    },
  };
}

import Link from 'next/link';

export default function MovieDetail({ movie, director, genre }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-800">{movie.title}</h1>

      <p className="text-gray-700 text-lg mb-4">{movie.description}</p>

      <div className="mb-4">
        <span className="font-semibold">🎬 Genre:</span> {genre?.name || 'Unknown'}
      </div>

      <div className="mb-4">
        <span className="font-semibold">📅 Release Year:</span> {movie.releaseYear}
      </div>

      <div className="mb-4">
        <span className="font-semibold">⭐ Rating:</span> {movie.rating}
      </div>

      <div className="mb-6">
        <span className="font-semibold">🎥 Director:</span>{' '}
        <Link href={`/directors/${director.id}`} className="text-blue-600 hover:underline">
          {director.name}
        </Link>
      </div>

      <Link href="/movies" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        ⬅️ Back to Movies
      </Link>
    </div>
  );
}
