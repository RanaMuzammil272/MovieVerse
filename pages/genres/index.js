import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch('/api/genres');
      const data = await res.json();
      setGenres(data);
      setLoading(false);
    }

    fetchGenres();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading genres...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🎭 Browse by Genre</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {genres.map(genre => (
          <Link key={genre.id} href={`/genres/${genre.id}`}>
            <div className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-700">{genre.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
