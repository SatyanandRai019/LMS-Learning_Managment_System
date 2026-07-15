import { Link } from "react-router-dom";

import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import { carouselData } from "../Constants/CarouselData";

function AboutUs() {
  return (
    <HomeLayout>
      <section className="min-h-[90vh] bg-[#f8fafc] px-6 py-16 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          {/* Left Section */}
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b8932e]">
              Our Mission
            </span>

            <h1 className="mb-6 mt-4 text-4xl font-black leading-tight text-[#0a1f44] lg:text-5xl">
              Affordable &
              <span className="text-[#d4af37]"> Quality Education</span>
            </h1>

            <p className="mb-5 text-lg leading-8 text-slate-600">
              Our mission is to provide affordable, high-quality education to
              students from every background.
            </p>

            <p className="mb-8 text-lg leading-8 text-slate-600">
              Learn from industry experts, complete practical projects, and
              build skills that prepare you for your dream career.
            </p>

            <Link
              to="/courses"
              className="inline-block rounded-xl bg-[#0a1f44] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#112d5c]"
            >
              Explore Courses
            </Link>
          </div>

          {/* Right Section */}
          <div className="carousel w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl">
            {carouselData.map((slide, index) => (
              <CarouselSlide
                key={index}
                image={slide.image}
                title={slide.title}
                description={slide.description}
                slideNumber={index + 1}
                totalSlides={carouselData.length}
              />
            ))}
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}

export default AboutUs;