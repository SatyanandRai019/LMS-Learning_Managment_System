import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getRazorpayKey,
  createOrder,
  verifyPayment,
} from "../Redux/Slices/paymentSlice";

function CourseDescription() {
  const { role } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);
  const { key, order } = useSelector((state) => state.payment);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/courses/${id}`,
          { withCredentials: true },
        );
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const handleEnroll = async () => {
        if (role === "ADMIN") {
          toast.error("Admin cannot purchase a course");
          return;
        }

        // existing payment code
      };
      const keyResponse = await dispatch(getRazorpayKey()).unwrap();

      const orderResponse = await dispatch(createOrder(id)).unwrap();

      const options = {
        key: keyResponse.key,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "LMS Learning Platform",
        description: course.title,
        image: course.thumbnail.secure_url,
        order_id: orderResponse.order.id,

        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
        },

        theme: {
          color: "#2563eb",
        },

        handler: async function (response) {
          await dispatch(
            verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: id,
            }),
          ).unwrap();

          navigate("/payment/success");
        },

        modal: {
          ondismiss: function () {
            navigate("/payment/failure");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      navigate("/payment/failure");
    }
  };

  // ---------- Loading state ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#0a1f44] border-t-[#d4af37] rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium tracking-wide">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  // ---------- Error state ----------
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-red-100 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-slate-900 font-bold text-xl mb-2">
            Something went wrong
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#0a1f44] hover:bg-[#112d5c] text-white font-semibold py-2.5 rounded-xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ---------- Not found ----------
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-medium text-lg mb-2">
            Course not found
          </p>
          <p className="text-slate-400 text-sm">
            The course you are looking for might have been removed.
          </p>
        </div>
      </div>
    );
  }

  const lectureCount = course.numberOfLectures ?? course.lectures?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-[#d4af37]/30">
      {/* ===== Hero Section ===== */}
      <div className="bg-[#0a1f44] relative overflow-hidden border-b border-slate-800/50">
        {/* Dynamic mesh glow effects */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#d4af37] opacity-[0.07] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-500 opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24 relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* Left Side Info */}
          <div className="space-y-6 order-2 lg:order-1">
            <span className="inline-flex items-center gap-1.5 text-[#d4af37] text-xs font-bold tracking-wider uppercase border border-[#d4af37]/30 bg-[#d4af37]/5 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
              {course.category}
            </span>

            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-2xl">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal opacity-90">
              {course.description}
            </p>

            {/* Quick Stats Matrix */}
            <div className="inline-flex items-center gap-8 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md w-full sm:w-auto justify-around sm:justify-start">
              {/* Lectures Counter */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-white/5 rounded-xl text-[#d4af37] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-lg font-bold leading-none mb-0.5">
                    {lectureCount}
                  </p>
                  <p className="text-slate-400 text-xxs uppercase tracking-wider font-semibold">
                    Lectures
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10 flex-shrink-0"></div>

              {/* Instructor Box (Contains the overflow layout guards) */}
              <div className="flex items-center gap-3 min-w-0 max-w-[180px] sm:max-w-[240px]">
                <div className="p-2 bg-white/5 rounded-xl text-[#d4af37] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 w-full">
                  <p
                    className="text-white text-base sm:text-lg font-bold leading-tight mb-0.5 truncate break-all"
                    title={course.createdBy}
                  >
                    {course.createdBy}
                  </p>
                  <p className="text-slate-400 text-xxs uppercase tracking-wider font-semibold">
                    Instructor
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              {role !== "ADMIN" ? (
                <button onClick={handleEnroll} className="btn btn-primary">
                  Enroll Now
                </button>
              ) : (
                <button disabled className="btn btn-disabled">
                  Admin Cannot Purchase
                </button>
              )}
            </div>
          </div>

          {/* Right Side Card Preview */}
          <div className="relative order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 transition-all duration-300">
              {course.thumbnail?.secure_url ? (
                <img
                  key={course._id}
                  src={course.thumbnail.secure_url}
                  alt={course.title}
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover"
                />
              ) : (
                <div className="w-full h-56 sm:h-72 lg:h-80 bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
                  No image available
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 items-start">
        {/* Main Content Pane */}
        <div className="space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm shadow-slate-100/50">
            <h2 className="text-[#0a1f44] text-xl font-bold mb-5 flex items-center gap-2.5">
              <span className="w-1 h-6 bg-[#0a1f44] rounded-full"></span>
              About this course
            </h2>
            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Curriculum Section */}
          {course.lectures && course.lectures.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm shadow-slate-100/50">
              <h2 className="text-[#0a1f44] text-xl font-bold mb-5 flex items-center gap-2.5">
                <span className="w-1 h-6 bg-[#0a1f44] rounded-full"></span>
                Course Curriculum
              </h2>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                {course.lectures.map((lecture, index) => (
                  <div
                    key={lecture._id || index}
                    className="bg-white transition-colors duration-150 hover:bg-slate-50/70"
                  >
                    <button
                      onClick={() =>
                        setActiveLecture(activeLecture === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-700 text-sm sm:text-base"
                    >
                      <span className="flex items-center gap-3 truncate pr-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {index + 1}
                        </span>
                        <span className="truncate">{lecture.title}</span>
                      </span>
                      <svg
                        className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${activeLecture === index ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeLecture === index && lecture.description && (
                      <div className="px-13 pb-4 pr-6 text-xs sm:text-sm text-slate-500 border-t border-slate-50 pt-2 bg-slate-50/40">
                        {lecture.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Metadata Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6 lg:sticky lg:top-8">
          <h2 className="text-[#0a1f44] text-lg font-bold flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#d4af37]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a.75.75 0 00-.708.522L3.511 12.5H1.75a.75.75 0 000 1.5h2.417a.75.75 0 00.708-.522L6.154 8.75h4.155l.896 3.136a.75.75 0 00.708.522h2.417a.75.75 0 000-1.5h-1.75l-2.048-7.163a.75.75 0 00-.708-.522H6.267zm2.34 3.795L7.411 11h2.395L8.607 7.25z"
                clipRule="evenodd"
              />
            </svg>
            Course Metadata
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 text-sm font-medium">
                Category
              </span>
              <span className="text-slate-800 font-semibold text-sm bg-slate-50 px-2.5 py-1 rounded-lg">
                {course.category}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 text-sm font-medium">
                Total Lectures
              </span>
              <span className="text-slate-800 font-semibold text-sm">
                {lectureCount} lessons
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 text-sm font-medium">
                Instructor
              </span>
              <span
                className="text-slate-800 font-semibold text-sm truncate max-w-[160px]"
                title={course.createdBy}
              >
                {course.createdBy}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400 text-sm font-medium">Access</span>
              <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1">
                Full Lifetime Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
