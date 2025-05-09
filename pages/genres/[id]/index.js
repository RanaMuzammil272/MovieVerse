import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, 'genres'));
  const genres = snapshot.docs.map(doc => ({ id: doc.id }));

  const paths = genres.map(genre => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want fallback support
  };
}

export async function getStaticProps({ params }) {
  const genreId = params.id;

  const genreSnapshot = await getDocs(collection(db, 'genres'));
  const genre = genreSnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .find(g => g.id === genreId);

  if (!genre) {
    return { notFound: true };
  }

  const moviesQuery = query(collection(db, 'movies'), where('genreId', '==', genreId));
  const moviesSnapshot = await getDocs(moviesQuery);
  const movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      genre,
      movies,
    },
    revalidate: 10,
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
