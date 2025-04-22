export default function HelpHome() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-800">Welcome to the Help Center</h1>
        <p className="text-lg text-gray-700 mt-4">How can we assist you today?</p>
        <ul className="list-disc pl-6 mt-6">
          <li><a href="/help/faqs" className="text-blue-600 hover:underline">FAQs</a></li>
          <li><a href="/help/contact" className="text-blue-600 hover:underline">Contact Us</a></li>
          <li><a href="/help/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
        </ul>
      </div>
    );
  }
  