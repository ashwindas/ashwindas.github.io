import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-base-100">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="mb-8">Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
} 