import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/directors/${id}` : null, fetcher);

  if (error) return <div className="text-center mt-20 text-red-600">Failed to load director.</div>;
  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">🎬 {data.name}</h1>
      <p className="text-gray-700 text-lg mb-6">{data.bio}</p>

      <h2 className="text-2xl font-semibold mb-4">Directed Movies:</h2>
      <ul className="list-disc list-inside mb-6">
        {data.movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        ⬅️ Back
      </button>
    </div>
  );
}
