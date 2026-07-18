import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { createCourse } from "../Redux/Slices/CourseSlice";

function CreateCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setCourseData({
        ...courseData,
        thumbnail: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewCourse(e) {
    e.preventDefault();

    if (
      !courseData.title.trim() ||
      !courseData.description.trim() ||
      !courseData.category.trim() ||
      !courseData.createdBy.trim() ||
      !courseData.thumbnail
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("createdBy", courseData.createdBy);
    formData.append("thumbnail", courseData.thumbnail);

    const response = await dispatch(createCourse(formData));

    if (response?.payload?.success) {
      navigate("/courses");
    }

    setCourseData({
      title: "",
      description: "",
      category: "",
      createdBy: "",
      thumbnail: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10">
        <form
          onSubmit={createNewCourse}
          className="w-full max-w-md space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0a1f44]">Create a Course</h1>
            <p className="mt-1 text-sm text-slate-400">
              Fill in the details to publish a new course
            </p>
          </div>

          <label
            htmlFor="image_upload"
            className="mx-auto flex w-fit cursor-pointer justify-center"
          >
            {previewImage ? (
              <img
                className="h-24 w-24 rounded-xl border-4 border-[#d4af37]/30 object-cover"
                src={previewImage}
                alt="Course Thumbnail Preview"
              />
            ) : (
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                <BsPersonCircle className="text-3xl" />
                <span className="mt-1 text-xs">Thumbnail</span>
              </div>
            )}
          </label>

          <input
            onChange={getImage}
            type="file"
            id="image_upload"
            name="image_upload"
            className="hidden"
            accept=".jpg,.jpeg,.png,.svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium text-slate-600">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={courseData.title}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium text-slate-600">
              Course Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter the description"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={courseData.description}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm font-medium text-slate-600">
              Course Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter the category"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={courseData.category}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="createdBy" className="text-sm font-medium text-slate-600">
              Instructor Name
            </label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              placeholder="Enter the instructor's name"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0a1f44] focus:ring-2 focus:ring-[#0a1f44]/10"
              value={courseData.createdBy}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#0a1f44] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#112d5c]"
          >
            Create Course
          </button>

          <p className="text-center text-sm">
            <Link to="/courses" className="font-semibold text-[#d4af37] hover:underline">
              Back to Courses
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;