import useSWR from 'swr';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function AllDirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className="text-center mt-20 text-red-600">Failed to load directors.</div>;
  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">🎬 All Directors</h1>
      <ul className="list-disc list-inside text-lg space-y-2">
        {data.map(director => (
          <li key={director.id}>
            <Link href={`/directors/${director.id}`} className="text-blue-600 hover:underline">
              {director.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
