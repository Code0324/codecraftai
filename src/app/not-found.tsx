import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ background: '#0a0b0f' }}>
      <div className="text-center">
        <h1 className="text-9xl font-black text-white mb-4 heading-font">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 heading-font">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] text-white font-semibold hover:shadow-lg transition-shadow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
