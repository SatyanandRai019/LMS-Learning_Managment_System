import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import CourseCard from "../Components/CourseCard";
import { getAllCourses } from "../Redux/Slices/CourseSlice";

function Courses() {
  const dispatch = useDispatch();

  const { courseData, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <HomeLayout>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0a1f44] border-t-[#d4af37]"></div>
          <p className="text-sm font-medium text-slate-500">
            Loading courses...
          </p>
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-lg font-semibold text-red-500">{error}</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="px-6 py-10">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b8932e]">
            Explore
          </span>
          <h1 className="mt-4 text-4xl font-black text-[#0a1f44]">
            All Courses
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {courseData.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Courses;