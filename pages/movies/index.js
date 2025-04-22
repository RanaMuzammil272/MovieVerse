import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
    },
    revalidate: 10,
  };
}

export default function Movies({ movies, genres }) {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter(movie => movie.genreId === selectedGenre);

  const navigateToGenres = () => {
    router.push('/genres'); 
  };
  const navigateToHelp = () => {
    router.push('/help'); 
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        🎬 Movie Gallery
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          className={`px-4 py-2 rounded-full font-medium shadow-sm transition 
          ${selectedGenre === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setSelectedGenre('all')}
        >
          All Genres
        </button>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition 
            ${selectedGenre === genre.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMovies.map(movie => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="block p-5 bg-white shadow-md hover:shadow-xl rounded-2xl transition border border-gray-100">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-1">🎞️ Release Year: {movie.releaseYear}</p>
            <p className="text-sm text-gray-700">⭐ Rating: {movie.rating}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-4 mb-6">
  <button
    onClick={navigateToGenres}
    className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
  >
    Browse Genres
  </button>

  <button
    onClick={navigateToHelp}
    className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg transition"
  >
    Go to Help Center
  </button>
</div>

    </div>
  );
}
