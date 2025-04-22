import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query; 
  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-800">Welcome to the Help Center</h1>
        <p className="text-lg text-gray-700 mt-4">How can we assist you today?</p>
        <ul className="list-disc pl-6 mt-6">
          <li><a href="/help/faqs" className="text-blue-600 hover:underline">FAQs</a></li>
          <li><a href="/help/contact" className="text-blue-600 hover:underline">Contact Us</a></li>
          <li><a href="/help/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
        </ul>
        <div className="mt-6">
          <button
            onClick={() => router.push('/movies')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
          >
            Go Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Handle different sections dynamically
  const section = slug[0]; // The first part of the slug will be the section name

  switch (section) {
    case 'faqs':
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-800">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-700 mt-4">Here are some common questions and answers.</p>
          <ul className="list-disc pl-6 mt-6">
            <li><strong>Q: How do I use this site?</strong></li>
            <li>A: Simply navigate through the menu or use the search bar to find content.</li>
            {/* Add more FAQs as needed */}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
            >
              Go Back to Movies
            </button>
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-800">Contact Us</h1>
          <p className="text-lg text-gray-700 mt-4">Get in touch with us via email or phone.</p>
          <ul className="list-disc pl-6 mt-6">
            <li>Email: <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a></li>
            <li>Phone: (123) 456-7890</li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
            >
              Go Back to Movies
            </button>
          </div>
        </div>
      );
    case 'privacy':
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-800">Privacy Policy</h1>
          <p className="text-lg text-gray-700 mt-4">Your privacy is important to us. Please review our privacy policy.</p>
          {/* Add privacy policy content here */}
          <div className="mt-6">
            <button
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
            >
              Go Back to Movies
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-red-600">404 Not Found</h1>
          <p className="text-lg text-gray-700 mt-4">The help section you are looking for does not exist.</p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-lg transition"
            >
              Go Back to Movies
            </button>
          </div>
        </div>
      );
  }
}
