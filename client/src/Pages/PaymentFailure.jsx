import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function PaymentFailure() {
  return (
    <HomeLayout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-[450px] rounded-xl bg-white p-8 shadow-xl text-center">

          <div className="mb-5 text-6xl">❌</div>

          <h1 className="text-3xl font-bold text-red-600">
            Payment Failed
          </h1>

          <p className="mt-4 text-gray-600">
            Your payment could not be completed. Please try again.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/courses"
              className="rounded-lg bg-[#0a1f44] px-5 py-3 font-semibold text-white hover:bg-[#112d5c]"
            >
              Back To Courses
            </Link>

            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default PaymentFailure;