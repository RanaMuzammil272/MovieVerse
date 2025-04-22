import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres,
    },
  };
}

export default function GenresPage({ genres }) {
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
