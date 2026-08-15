import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPlayCircle } from "react-icons/fa";
import { addLecture, getCourseDetails } from "../../Redux/Slices/CourseSlice";

function AddLecture() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetails, loading } = useSelector((state) => state.course);

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    lecture: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setLectureData({
      ...lectureData,
      [name]: value,
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setLectureData({
      ...lectureData,
      lecture: file,
    });

    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!lectureData.title || !lectureData.description) {
      toast.error("Title and description are required");
      return;
    }

    if (!lectureData.lecture) {
      toast.error("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", lectureData.title);
    formData.append("description", lectureData.description);
    formData.append("lecture", lectureData.lecture);

    const response = await dispatch(addLecture({ id, formData }));

    if (addLecture.fulfilled.match(response)) {
      setLectureData({ title: "", description: "", lecture: null });
      setPreviewUrl("");
      e.target.reset();
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link
          to="/admin/courses"
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <FaArrowLeft size={14} />
          Back to Manage Courses
        </Link>

        <h1 className="text-3xl font-bold">Add Lecture</h1>

        {courseDetails?.title && (
          <p className="mt-1 text-gray-500">
            Course: <span className="font-medium">{courseDetails.title}</span>
          </p>
        )}
      </div>

      {/* Add Lecture Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Lecture Title"
          className="input input-bordered w-full"
          value={lectureData.title}
          onChange={handleInputChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={lectureData.description}
          onChange={handleInputChange}
        />

        <input
          type="file"
          accept="video/*"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />

        {previewUrl && (
          <video src={previewUrl} controls className="w-full rounded-lg" />
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Add Lecture"}
        </button>
      </form>

      {/* Existing Lectures */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Existing Lectures ({courseDetails?.lectures?.length || 0})
        </h2>

        {courseDetails?.lectures?.length ? (
          <div className="space-y-3">
            {courseDetails.lectures.map((lecture, index) => (
              <div
                key={lecture._id || index}
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <FaPlayCircle className="shrink-0 text-2xl text-[#0a1f44]" />

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {index + 1}. {lecture.title}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {lecture.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No lectures added yet — add the first one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default AddLecture;
