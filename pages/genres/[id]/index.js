import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Generate static paths for all genres
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.genres.map(genre => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false, // Set to 'blocking' if you want fallback behavior
  };
}

// Provide props for each genre page at build time
export async function getStaticProps({ params }) {
  const { id } = params;
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find(genre => genre.id === id);
  const movies = data.movies.filter(movie => movie.genreId === id);

  if (!genre) {
    return { notFound: true };
  }

  return {
    props: {
      genre,
      movies,
    },
  };
}

export default function GenrePage({ genre, movies }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🎭 {genre.name} Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map(movie => (
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
