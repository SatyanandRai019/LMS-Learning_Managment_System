import { Link } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";

function NotFound() {
  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] flex-col items-center justify-center px-6">
        <h1 className="text-9xl font-extrabold tracking-widest">
          404
        </h1>

        <div className="mt-4 rounded-lg bg-error px-6 py-2 text-lg font-semibold text-white">
          Page Not Found
        </div>

        <p className="mt-6 max-w-xl text-center text-lg text-base-content/70">
          Sorry, the page you are looking for doesn't exist or may have been
          moved.
        </p>

        <Link to="/" className="btn btn-primary mt-8">
          Go Back Home
        </Link>
      </div>
    </HomeLayout>
  );
}

export default NotFound;