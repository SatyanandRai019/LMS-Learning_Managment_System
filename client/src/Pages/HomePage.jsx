import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <section className="hero min-h-[calc(100vh-80px)] bg-[#f8fafc] px-6 lg:px-16">
        <div className="hero-content flex-col-reverse gap-14 lg:flex-row-reverse">
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-6 -right-6 h-full w-full rounded-2xl bg-[#d4af37]/10"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
              alt="Students Learning"
              className="relative w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b8932e]">
              Learn Without Limits
            </span>

            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-[#0a1f44] lg:text-6xl">
              Find the Best
              <br />
              <span className="text-[#d4af37]">Online Courses</span>
            </h1>

            <p className="py-8 text-lg leading-8 text-slate-500">
              Learn from industry experts with high-quality courses,
              hands-on projects, and lifetime access. Upgrade your skills
              and build your dream career from anywhere in the world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="rounded-xl bg-[#0a1f44] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#112d5c]"
              >
                Explore Courses
              </Link>

              <Link
                to="/signup"
                className="rounded-xl border-2 border-[#0a1f44] px-8 py-4 font-semibold text-[#0a1f44] transition-all duration-200 hover:bg-[#0a1f44] hover:text-white"
              >
                Get Started
              </Link>
            </div>

            <div className="mt-12 flex divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-[#0a1f44]">20K+</p>
                <p className="text-sm text-slate-400">Students</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-[#0a1f44]">150+</p>
                <p className="text-sm text-slate-400">Courses</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-[#0a1f44]">50+</p>
                <p className="text-sm text-slate-400">Instructors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default HomePage;