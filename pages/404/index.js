import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-lg text-gray-500 mb-6">It might have been moved, or the URL could be incorrect.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">

            Go Home
   
        </Link>
      </div>
    </div>
  );
}
