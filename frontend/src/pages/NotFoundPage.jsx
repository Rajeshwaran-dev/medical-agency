import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-blue-700">404</h1>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-white" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
