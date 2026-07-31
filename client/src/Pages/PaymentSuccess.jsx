import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function PaymentSuccess() {
  return (
    <HomeLayout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-[450px] rounded-xl bg-white p-8 shadow-xl text-center">

          <div className="mb-5 text-6xl">✅</div>

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="mt-4 text-gray-600">
            Congratulations! You have successfully enrolled in the course.
          </p>

          <Link
            to="/courses"
            className="mt-8 inline-block rounded-lg bg-[#0a1f44] px-6 py-3 font-semibold text-white hover:bg-[#112d5c]"
          >
            Go To Courses
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default PaymentSuccess;