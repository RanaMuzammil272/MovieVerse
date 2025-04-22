import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map(movie => ({
    params: { id: movie.id }
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find(m => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find(d => d.id === movie.directorId);
  const genre = data.genres.find(g => g.id === movie.genreId);

  return {
    props: {
      movie,
      director,
      genre,
    },
    revalidate: 10,
  };
}

export default function MovieDetail({ movie, director, genre }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-800">{movie.title}</h1>

      <p className="text-gray-700 text-lg mb-4">{movie.description}</p>

      <div className="mb-4">
        <span className="font-semibold">🎬 Genre:</span> {genre?.name}
      </div>

      <div className="mb-4">
        <span className="font-semibold">📅 Release Year:</span> {movie.releaseYear}
      </div>

      <div className="mb-4">
        <span className="font-semibold">⭐ Rating:</span> {movie.rating}
      </div>

      <div className="mb-6">
        <span className="font-semibold">🎥 Director:</span>{' '}
        <Link href={`/movies/${movie.id}/director`} className="text-blue-600 hover:underline">
          {director?.name}
        </Link>
      </div>

      <Link href="/movies" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        ⬅️ Back to Movies
      </Link>
    </div>
  );
}
