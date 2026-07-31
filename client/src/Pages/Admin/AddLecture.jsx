import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function AddLecture() {
  const { id } = useParams();

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    lecture: null,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setLectureData({
      ...lectureData,
      [name]: value,
    });
  }

  function handleFileChange(e) {
    setLectureData({
      ...lectureData,
      lecture: e.target.files[0],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", lectureData.title);
    formData.append("description", lectureData.description);
    formData.append("lecture", lectureData.lecture);

    try {
      const res = await axiosInstance.post(
        `/courses/${id}`,
        formData
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add lecture"
      );
    }
  }

  return (
    <div className="max-w-xl">

      <h1 className="mb-6 text-3xl font-bold">
        Add Lecture
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
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

        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Lecture
        </button>

      </form>

    </div>
  );
}

export default AddLecture;