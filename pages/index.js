import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/movies');
  };

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1740&q=80')",
        }}
      ></div>


      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6">🎬 Welcome to MovieVerse</h1>
        <p className="mb-8 text-lg text-gray-300 max-w-md">Explore top-rated movies, genres, and directors from all over the world.</p>

        <button
          onClick={handleEnter}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg transition transform hover:scale-105"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
